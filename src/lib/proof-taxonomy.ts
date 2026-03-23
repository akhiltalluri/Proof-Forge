import { MathDomain, ProofType, WarningCategory } from "@/types/proof";

const PROOF_TYPES: ProofType[] = [
  "direct",
  "contradiction",
  "contrapositive",
  "induction",
  "construction",
  "cases",
  "uniqueness",
  "epsilon_delta",
  "algebraic",
  "combinatorial",
  "set_identity",
];

const DOMAINS: MathDomain[] = [
  "analysis",
  "algebra",
  "combinatorics",
  "discrete_math",
  "topology",
  "number_theory",
  "set_theory",
  "geometry",
  "general",
];

const WARNING_CATEGORIES: WarningCategory[] = [
  "unjustified_implication",
  "missing_base_case",
  "undefined_variable",
  "vague_existence",
  "skipped_algebra",
  "quantifier_error",
  "other",
];

export function normalizeProofType(value: string | undefined): ProofType {
  if (!value) return "direct";
  const cleaned = value.toLowerCase().replace(/[\s-]+/g, "_");
  return PROOF_TYPES.find((type) => type === cleaned) ?? "direct";
}

export function normalizeMathDomain(
  value: string | undefined
): MathDomain | undefined {
  if (!value) return undefined;
  const cleaned = value.toLowerCase().replace(/[\s-]+/g, "_");
  return DOMAINS.find((domain) => domain === cleaned) ?? "general";
}

export function normalizeWarningCategory(
  value: string | undefined
): WarningCategory | undefined {
  if (!value) return undefined;
  const cleaned = value.toLowerCase().replace(/[\s-]+/g, "_");
  return WARNING_CATEGORIES.find((category) => category === cleaned) ?? "other";
}
