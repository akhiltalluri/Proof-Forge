import OpenAI from "openai";
import {
  ProofType,
  ProofStep,
  ProofResult,
  VerificationResult,
  ProofSuggestion,
} from "@/types/proof";
import {
  CLASSIFY_AND_POLISH_PROMPT,
  buildClassifyAndPolishPrompt,
  VERIFY_PROMPT,
  buildVerifyPrompt,
  SUGGEST_PROMPT,
  buildSuggestPrompt,
} from "./prompt";

function cleanJson(raw: string): string {
  return raw
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();
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
