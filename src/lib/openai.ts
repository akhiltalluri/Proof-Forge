import OpenAI from "openai";
import {
  ProofType,
  ProofStep,
  ProofResult,
  VerificationResult,
  ProofSuggestion,
  MathDomain,
} from "@/types/proof";
import {
  CLASSIFY_AND_POLISH_PROMPT,
  buildClassifyAndPolishPrompt,
  VERIFY_PROMPT,
  buildVerifyPrompt,
  SUGGEST_PROMPT,
  buildSuggestPrompt,
} from "./prompt";
import {
  normalizeMathDomain,
  normalizeProofType,
  normalizeWarningCategory,
} from "./proof-taxonomy";

function cleanJson(raw: string): string {
  let cleaned = raw
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  // Fix LaTeX commands that collide with JSON escape sequences.
  // When the model writes \text, \to, \forall, \beta, \rho etc. without
  // double-escaping, JSON.parse interprets \t as tab, \f as form feed, etc.
  // For \t, \b, \f, \r: broadly fix when followed by alpha chars — these
  // control characters should never appear in mathematical proof text.
  cleaned = cleaned.replace(/(?<!\\)\\([tbfr])(?=[a-zA-Z])/g, "\\\\$1");
  // For \n: only fix known LaTeX command suffixes to preserve real newlines.
  cleaned = cleaned.replace(
    /(?<!\\)\\n(?=(eq|ot|abla|eg|otin|u[^a-zA-Z]|i[^a-zA-Z]|subseteq|rightarrow))/g,
    "\\\\n"
  );

  return cleaned;
}

async function llm(
  client: OpenAI,
  system: string,
  user: string,
  temperature = 0.3
): Promise<string> {
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature,
    max_tokens: 4096,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  const content = res.choices[0]?.message?.content;
  if (!content) throw new Error("No response from OpenAI");
  return cleanJson(content);
}

interface ClassifyAndPolishResult {
  proofType: ProofType;
  mathDomain?: MathDomain;
  polishedProof: string;
  steps: ProofStep[];
  assumptions: string[];
  conclusion: string;
}

export async function classifyAndPolish(
  informalProof: string,
  apiKey: string,
  forceType?: ProofType
): Promise<ClassifyAndPolishResult> {
  const client = new OpenAI({ apiKey });
  const raw = await llm(
    client,
    CLASSIFY_AND_POLISH_PROMPT,
    buildClassifyAndPolishPrompt(informalProof, forceType)
  );
  const parsed = JSON.parse(raw) as ClassifyAndPolishResult;
  if (!parsed.polishedProof || !Array.isArray(parsed.steps)) {
    throw new Error("Invalid classify+polish response");
  }
  parsed.proofType = normalizeProofType(parsed.proofType);
  parsed.mathDomain = normalizeMathDomain(parsed.mathDomain);
  parsed.steps = parsed.steps.map((step, index) => ({
    ...step,
    number: step.number ?? index + 1,
    warningCategory: normalizeWarningCategory(step.warningCategory),
  }));
  return parsed;
}

export async function verifyProof(
  polishedProof: string,
  steps: ProofStep[],
  apiKey: string
): Promise<VerificationResult> {
  const client = new OpenAI({ apiKey });
  const stepsText = steps
    .map(
      (s) =>
        `Step ${s.number}: ${s.statement} [Justification: ${s.justification}]`
    )
    .join("\n");

  const raw = await llm(
    client,
    VERIFY_PROMPT,
    buildVerifyPrompt(polishedProof, stepsText),
    0.4
  );
  const parsed = JSON.parse(raw) as VerificationResult;
  if (typeof parsed.passed !== "boolean" || typeof parsed.score !== "number") {
    throw new Error("Invalid verification response");
  }
  parsed.vulnerabilities = (parsed.vulnerabilities || []).map((v) => ({
    ...v,
    category: normalizeWarningCategory(v.category),
  }));
  parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
  const hasCritical = parsed.vulnerabilities.some(
    (v) => v.severity === "critical"
  );
  parsed.passed = parsed.score >= 70 && !hasCritical;
  return parsed;
}

export async function suggestAlternatives(
  originalProof: string,
  verification: VerificationResult,
  apiKey: string
): Promise<ProofSuggestion[]> {
  const client = new OpenAI({ apiKey });
  const vulnText = verification.vulnerabilities
    .map(
      (v) =>
        `Step ${v.step} (${v.severity}): ${v.issue}${v.counterexample ? ` — Counterexample: ${v.counterexample}` : ""}`
    )
    .join("\n");

  const raw = await llm(
    client,
    SUGGEST_PROMPT,
    buildSuggestPrompt(originalProof, verification.summary, vulnText),
    0.6
  );
  const parsed = JSON.parse(raw) as { suggestions: ProofSuggestion[] };
  if (!Array.isArray(parsed.suggestions)) {
    throw new Error("Invalid suggestions response");
  }
  parsed.suggestions = parsed.suggestions.map((suggestion, index) => ({
    ...suggestion,
    id: suggestion.id || `s${index + 1}`,
    proofType: normalizeProofType(suggestion.proofType),
  }));
  return parsed.suggestions;
}

export async function forgeProof(
  informalProof: string,
  apiKey: string,
  forceType?: ProofType
): Promise<ProofResult> {
  const polished = await classifyAndPolish(informalProof, apiKey, forceType);
  const verification = await verifyProof(
    polished.polishedProof,
    polished.steps,
    apiKey
  );

  const result: ProofResult = {
    ...polished,
    verification,
  };

  if (!verification.passed) {
    result.suggestions = await suggestAlternatives(
      informalProof,
      verification,
      apiKey
    );
  }

  return result;
}
