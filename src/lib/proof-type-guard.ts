import type { MathDomain, ProofType } from "@/types/proof";

const PROOF_TYPES: ProofType[] = [
  "direct",
  "contradiction",
  "contrapositive",
  "induction",
  "construction",
  "cases",
  "uniqueness",
  "epsilon_delta",
  "combinatorial",
  "algebraic",
  "set_identity",
];

const MATH_DOMAINS: MathDomain[] = [
  "analysis",
  "algebra",
  "combinatorics",
  "discrete_math",
  "topology",
  "number_theory",
  "set_theory",
  "general",
];

export function normalizeProofType(t: string | undefined): ProofType {
  if (t && PROOF_TYPES.includes(t as ProofType)) return t as ProofType;
  return "direct";
}

export function normalizeMathDomain(t: string | undefined): MathDomain | undefined {
  if (t && MATH_DOMAINS.includes(t as MathDomain)) return t as MathDomain;
  return undefined;
}
