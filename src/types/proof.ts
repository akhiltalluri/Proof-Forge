export type ProofType =
  | "direct"
  | "contradiction"
  | "contrapositive"
  | "induction"
  | "construction"
  | "cases"
  | "uniqueness"
  | "epsilon_delta"
  | "combinatorial"
  | "algebraic"
  | "set_identity";

export const PROOF_TYPE_LABELS: Record<ProofType, string> = {
  direct: "Direct proof",
  contradiction: "Proof by contradiction",
  contrapositive: "Proof by contrapositive",
  induction: "Proof by induction",
  construction: "Constructive proof",
  cases: "Proof by cases",
  uniqueness: "Uniqueness proof",
  epsilon_delta: "Epsilon–delta / limit argument",
  combinatorial: "Combinatorial proof",
  algebraic: "Algebraic proof",
  set_identity: "Set-theoretic proof",
};

/** Broad mathematical area for tagging and filtering. */
export type MathDomain =
  | "analysis"
  | "algebra"
  | "combinatorics"
  | "discrete_math"
  | "topology"
  | "number_theory"
  | "set_theory"
  | "general";

export const MATH_DOMAIN_LABELS: Record<MathDomain, string> = {
  analysis: "Analysis",
  algebra: "Algebra",
  combinatorics: "Combinatorics",
  discrete_math: "Discrete math",
  topology: "Topology",
  number_theory: "Number theory",
  set_theory: "Set theory",
  general: "General",
};

export interface ProofStep {
  number: number;
  statement: string;
  justification: string;
  hasWarning: boolean;
  warning: string | null;
}

/** Optional category for verification issues (heuristic labels). */
export type WarningCategory =
  | "unjustified_implication"
  | "missing_base_case"
  | "undefined_variable"
  | "vague_existence"
  | "skipped_algebra"
  | "quantifier_error"
  | "other";

export interface Vulnerability {
  step: number;
  issue: string;
  counterexample: string | null;
  severity: "critical" | "major" | "minor";
  /** Heuristic category when the model supplies it */
  category?: WarningCategory;
}

export interface VerificationResult {
  passed: boolean;
  score: number;
  summary: string;
  vulnerabilities: Vulnerability[];
}

export interface ProofSuggestion {
  id: string;
  proofType: ProofType;
  label: string;
  description: string;
  sketch: string;
}

export interface ProofResult {
  proofType: ProofType;
  /** Broad area of mathematics the argument belongs to */
  mathDomain?: MathDomain;
  polishedProof: string;
  steps: ProofStep[];
  assumptions: string[];
  conclusion: string;
  verification: VerificationResult;
  suggestions?: ProofSuggestion[];
}

export type PipelineStage =
  | "idle"
  | "classifying"
  | "polishing"
  | "verifying"
  | "suggesting"
  | "done";

export interface ApiResponse {
  success: boolean;
  data?: ProofResult;
  error?: string;
  /** True when response used canned demo data (no API credits) */
  demo?: boolean;
}

export type DemoFixtureId =
  | "direct"
  | "contradiction"
  | "induction"
  | "epsilon_delta"
  | "combinatorial"
  | "set_identity";
