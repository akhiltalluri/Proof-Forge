import { ProofType } from "@/types/proof";

const PROOF_TYPE_LIST = `"direct", "contradiction", "contrapositive", "induction", "construction", "cases", "uniqueness"`;

// ── Stage 1: Classify + Polish (single call) ──────────────────────────

export const CLASSIFY_AND_POLISH_PROMPT = `You are a rigorous mathematics proof editor specializing in real analysis.

Your task has two parts:
A) Classify the proof technique used in the sketch.
B) Rewrite the sketch into clean, structured, formally written mathematical prose tailored to that proof type.

Valid proof types: ${PROOF_TYPE_LIST}.

Type-specific structure requirements:
- "direct": State what is to be shown, then derive it step by step from the hypotheses.
- "contradiction": Clearly state the assumption being negated, derive a contradiction, then conclude.
- "contrapositive": State the contrapositive, prove it directly, then conclude the original.
- "induction": Separate base case, inductive hypothesis, and inductive step with explicit labels.
- "construction": Explicitly construct the object, then verify it satisfies all required properties.
- "cases": Enumerate all cases, prove each exhaustively, confirm cases are exhaustive.
- "uniqueness": Assume two objects satisfying the property exist, show they must be equal.

You MUST respond with valid JSON matching this exact schema:
{
  "proofType": "one of: ${PROOF_TYPE_LIST}",
  "polishedProof": "Full rewritten proof using LaTeX math notation ($...$). Each sentence on its own line.",
  "steps": [
    {
      "number": 1,
      "statement": "The claim in this step, using LaTeX for math.",
      "justification": "Why this holds — theorem, definition, or prior step.",
      "hasWarning": false,
      "warning": null
    }
  ],
  "assumptions": ["Each assumption/hypothesis, using LaTeX."],
  "conclusion": "The final conclusion, using LaTeX."
}

Rules:
1. Identify all assumptions and the conclusion.
2. Break the proof into small, explicit logical steps.
3. Rewrite in formal mathematical English. Replace vague language with precise statements.
4. Use standard notation: $\\\\forall$, $\\\\exists$, $\\\\in$, $\\\\leq$, $\\\\implies$, etc.
5. If the text uses "clearly", "obviously", "it follows", "trivially", "by a well-known theorem", or similar hand-waving, set hasWarning to true with a warning explaining what justification is missing.
6. If a step jumps over intermediate reasoning, flag it.
7. Follow the type-specific structure requirements above.
8. Stay within real analysis.

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

Score the proof 0–100:
- 90–100: Airtight, no issues.
- 70–89: Structurally sound but has minor gaps.
- 50–69: Has major gaps that need addressing.
- 0–49: Fundamentally flawed.

A proof "passes" verification only if score >= 70 and there are zero critical vulnerabilities.

You MUST respond with valid JSON:
{
  "passed": true or false,
  "score": 0-100,
  "summary": "1-2 sentence overall assessment.",
  "vulnerabilities": [
    {
      "step": 1,
      "issue": "Description of the flaw.",
      "counterexample": "A specific counterexample, or null if none applies.",
      "severity": "critical" | "major" | "minor"
    }
  ]
}

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

You MUST respond with valid JSON:
{
  "suggestions": [
    {
      "id": "s1",
      "proofType": "one of the valid types",
      "label": "Short name, e.g. 'Direct proof via triangle inequality'",
      "description": "1-2 sentences explaining the approach and why it might work better.",
      "sketch": "2-4 sentence outline of the key steps, using LaTeX ($...$) for math."
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
