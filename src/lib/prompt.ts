import { ProofType } from "@/types/proof";
import { VERIFICATION_RUBRIC_CONFIG } from "./verification";

const PROOF_TYPE_LIST = `"direct", "contradiction", "contrapositive", "induction", "construction", "cases", "uniqueness", "epsilon_delta", "algebraic", "combinatorial", "set_identity"`;
const DOMAIN_LIST = `"analysis", "algebra", "combinatorics", "discrete_math", "topology", "number_theory", "set_theory", "geometry", "general"`;
const WARNING_LIST = `"unjustified_implication", "missing_base_case", "undefined_variable", "vague_existence", "skipped_algebra", "quantifier_error", "other"`;
const VERIFICATION_DIMENSION_LIST = VERIFICATION_RUBRIC_CONFIG.map(
  (item) => `"${item.id}"`
).join(", ");
const VERIFICATION_DIMENSION_GUIDE = VERIFICATION_RUBRIC_CONFIG.map(
  (item) => `- "${item.id}" (${item.weight} points): ${item.label}. ${item.weightReason}`
).join("\n");

// ── Stage 1: Classify + Polish (single call) ──────────────────────────

export const CLASSIFY_AND_POLISH_PROMPT = `You are a rigorous mathematics proof editor for undergraduate mathematics.

Your task has two parts:
A) Classify the proof technique used in the sketch.
B) Rewrite the sketch into clean, structured, formally written mathematical prose tailored to that proof type.

Valid proof types: ${PROOF_TYPE_LIST}.
Valid broad math domains: ${DOMAIN_LIST}.

Type-specific structure requirements:
- "direct": State what is to be shown, then derive it step by step from the hypotheses.
- "contradiction": Clearly state the assumption being negated, derive a contradiction, then conclude.
- "contrapositive": State the contrapositive, prove it directly, then conclude the original.
- "induction": Separate base case, inductive hypothesis, and inductive step with explicit labels.
- "construction": Explicitly construct the object, then verify it satisfies all required properties.
- "cases": Enumerate all cases, prove each exhaustively, confirm cases are exhaustive.
- "uniqueness": Assume two objects satisfying the property exist, show they must be equal.
- "epsilon_delta": Make the quantifiers and the choice of $\\varepsilon$/$\\delta$ explicit.
- "algebraic": Emphasize the identities, substitutions, or factorization steps that drive the argument.
- "combinatorial": Make the counting strategy or bijection explicit.
- "set_identity": Use element-chasing or double inclusion explicitly.

You MUST respond with valid JSON matching this exact schema:
{
  "proofType": "one of: ${PROOF_TYPE_LIST}",
  "mathDomain": "one of: ${DOMAIN_LIST}",
  "polishedProof": "Full rewritten proof. Use \\n between logical steps for readability.",
  "steps": [
    {
      "number": 1,
      "statement": "The claim in this step.",
      "justification": "Why this holds — theorem, definition, or prior step.",
      "hasWarning": false,
      "warning": null,
      "warningCategory": "one of ${WARNING_LIST}, or null"
    }
  ],
  "assumptions": ["Each assumption/hypothesis."],
  "conclusion": "The final conclusion."
}

LaTeX formatting rules (CRITICAL — follow exactly):
- Wrap ONLY mathematical expressions in $...$ delimiters: variables ($x$, $n$, $\\varepsilon$), equations ($a_n \\to L$), inequalities ($|a_n - L| < \\varepsilon$), set notation ($x \\in \\mathbb{R}$), quantifiers ($\\forall$, $\\exists$).
- NEVER wrap plain English words or phrases in $...$. Wrong: $Assume$, $Therefore$, $bounded$. Right: Assume, Therefore, bounded.
- Use standard notation: $\\forall$, $\\exists$, $\\in$, $\\leq$, $\\implies$, $\\mathbb{R}$, $\\mathbb{N}$, etc.
- Every variable, number in a math context, operator, and formula must be inside $...$.
- Plain English connectives (assume, then, therefore, since, by, hence) stay outside $...$.
- NEVER use \\text{} for mathematical concepts. Use proper LaTeX commands instead:
  - $\\in$ NOT $\\text{ in }$
  - $\\mathbb{R}$ NOT $\\text{R}$
  - $\\to$ NOT $\\text{to}$
  - $\\subset$ NOT $\\text{ subset of }$
  - $c \\in (a, b)$ NOT $c \\text{ in } (a, b)$
- Since output is JSON, all backslashes in LaTeX must be double-escaped: write \\\\to not \\to, write \\\\in not \\in, write \\\\mathbb{R} not \\mathbb{R}.

General rules:
1. Identify all assumptions and the conclusion.
2. Break the proof into small, explicit logical steps.
3. Rewrite in formal mathematical English. Replace vague language with precise statements.
4. If the text uses "clearly", "obviously", "it follows", "trivially", "by a well-known theorem", or similar hand-waving, set hasWarning to true with a warning explaining what justification is missing.
5. If a step jumps over intermediate reasoning, flag it.
6. Follow the type-specific structure requirements above.
7. Infer the broad math domain from the proof sketch.
8. Use \\n (newline) between logical steps in the polishedProof string for readable formatting.

Return ONLY the JSON object. No markdown fences.`;

export function buildClassifyAndPolishPrompt(
  informalProof: string,
  forceType?: ProofType
): string {
  const typeHint = forceType
    ? `\n\nThe user has requested this be written as a ${forceType} proof. Use that proof type.`
    : "";

  return `Classify and rewrite the following informal proof sketch into a rigorous, structured proof. Identify the proof type, all steps, assumptions, and conclusion. Flag any steps that lack proper justification.${typeHint}

Informal proof:
"""
${informalProof}
"""`;
}

// ── Stage 2: Adversarial Verification ──────────────────────────────────

export const VERIFY_PROMPT = `You are a skeptical mathematics reviewer. Your job is to rigorously stress-test a polished proof and try to find flaws.

For each step in the proof, you must:
1. Check if the justification actually supports the claim.
2. Try to construct a counterexample that would break the step.
3. Check for hidden assumptions, circular reasoning, incorrect theorem applications, and quantifier errors.
4. Check boundary cases and edge cases.
5. Verify that the conclusion actually follows from the chain of reasoning.

Be adversarial. Do not rubber-stamp the proof. If there is ANY gap, ambiguity, or weakness, flag it.

Severity levels:
- "critical": The step is logically invalid or the proof breaks entirely (e.g., wrong theorem, counterexample exists).
- "major": A significant gap that undermines confidence (e.g., missing case, unjustified bound).
- "minor": A small imprecision that doesn't break the proof but should be fixed (e.g., missing quantifier, imprecise wording).

Use this fixed weighted rubric. The application will compute the final score from these category scores, so your category judgments must be honest and specific:
${VERIFICATION_DIMENSION_GUIDE}

Category scoring guidance:
- 95–100: Excellent in that category with no meaningful weakness.
- 85–94: Strong with only minor tightening needed.
- 70–84: Acceptable but with visible gaps or imprecision.
- 50–69: Significant weaknesses in that category.
- 25–49: Severe problems that seriously undermine confidence.
- 0–24: The category is fundamentally broken.

The application will mark a proof as passing only if the final weighted score is at least 70 and there are zero critical vulnerabilities.

LaTeX in output fields:
- Use $...$ ONLY around mathematical expressions (variables, formulas, equations). Do NOT wrap plain English in $...$.
- Use proper LaTeX commands: $\\in$ not $\\text{ in }$, $\\mathbb{R}$ not $\\text{R}$.
- Since output is JSON, double-escape all backslashes: \\\\in, \\\\mathbb{R}, \\\\forall, etc.

You MUST respond with valid JSON:
{
  "summary": "1-2 sentence overall assessment.",
  "rubric": [
    {
      "id": "one of ${VERIFICATION_DIMENSION_LIST}",
      "score": 0-100,
      "diagnosis": "1-2 sentences explaining why points were kept or docked in this category."
    }
  ],
  "vulnerabilities": [
    {
      "step": 1,
      "issue": "Description of the flaw. Use $...$ only for math expressions.",
      "counterexample": "A specific counterexample using $...$ for math, or null if none applies.",
      "severity": "critical" | "major" | "minor",
      "category": "one of ${WARNING_LIST}, or null"
    }
  ]
}

Return exactly one rubric entry for each category listed above.
If the proof is solid, vulnerabilities should be an empty array.
Return ONLY the JSON object. No markdown fences.`;

export function buildVerifyPrompt(
  polishedProof: string,
  steps: string
): string {
  return `Rigorously verify the following proof. Try to break it. Find counterexamples, logical gaps, and hidden assumptions.

Polished proof:
"""
${polishedProof}
"""

Proof steps:
${steps}`;
}

// ── Stage 3: Suggest Alternatives ──────────────────────────────────────

export const SUGGEST_PROMPT = `You are a mathematics tutor. A student's proof has been found to have flaws. Your job is to suggest 2–3 alternative proof strategies they could use instead.

For each suggestion:
- Pick a different proof technique (or the same technique done correctly).
- Give a brief, clear description of the approach.
- Provide a short sketch (2-4 sentences) of how the proof would go.
- Make the suggestions genuinely different from each other.

Valid proof types: ${PROOF_TYPE_LIST}.

LaTeX: Use $...$ ONLY around mathematical expressions. Do NOT wrap plain English in $...$.
Use proper LaTeX commands ($\\in$, $\\mathbb{R}$, $\\to$), never \\text{} for math.
Since output is JSON, double-escape all backslashes: \\\\in, \\\\to, \\\\forall, etc.

You MUST respond with valid JSON:
{
  "suggestions": [
    {
      "id": "s1",
      "proofType": "one of the valid types",
      "label": "Short name, e.g. 'Direct proof via triangle inequality'",
      "description": "1-2 sentences explaining the approach and why it might work better.",
      "sketch": "2-4 sentence outline of the key steps, using $...$ for math only."
    }
  ]
}

Return ONLY the JSON object. No markdown fences.`;

export function buildSuggestPrompt(
  originalProof: string,
  verificationSummary: string,
  vulnerabilities: string
): string {
  return `The following proof was found to have issues. Suggest 2–3 alternative proof strategies.

Original proof sketch:
"""
${originalProof}
"""

Verification summary: ${verificationSummary}

Issues found:
${vulnerabilities}`;
}
