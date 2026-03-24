export type ProofType =
  | "direct"
  | "contradiction"
  | "contrapositive"
  | "induction"
  | "construction"
  | "cases"
  | "uniqueness"
  | "epsilon_delta"
  | "algebraic"
  | "combinatorial"
  | "set_identity";

export const PROOF_TYPE_LABELS: Record<ProofType, string> = {
  direct: "Direct Proof",
  contradiction: "Proof by Contradiction",
  contrapositive: "Proof by Contrapositive",
  induction: "Proof by Induction",
  construction: "Proof by Construction",
  cases: "Proof by Cases",
  uniqueness: "Uniqueness Proof",
  epsilon_delta: "Epsilon-Delta Argument",
  algebraic: "Algebraic Proof",
  combinatorial: "Combinatorial Proof",
  set_identity: "Set-Theoretic Proof",
};

export type MathDomain =
  | "analysis"
  | "algebra"
  | "combinatorics"
  | "discrete_math"
  | "topology"
  | "number_theory"
  | "set_theory"
  | "geometry"
  | "general";

export const MATH_DOMAIN_LABELS: Record<MathDomain, string> = {
  analysis: "Analysis",
  algebra: "Algebra",
  combinatorics: "Combinatorics",
  discrete_math: "Discrete Math",
  topology: "Topology",
  number_theory: "Number Theory",
  set_theory: "Set Theory",
  geometry: "Geometry",
  general: "General",
};

export type WarningCategory =
  | "unjustified_implication"
  | "missing_base_case"
  | "undefined_variable"
  | "vague_existence"
  | "skipped_algebra"
  | "quantifier_error"
  | "other";

export type VerificationDimensionId =
  | "logical_validity"
  | "justification"
  | "completeness"
  | "precision";

export interface ProofStep {
  number: number;
  statement: string;
  justification: string;
  hasWarning: boolean;
  warning: string | null;
  warningCategory?: WarningCategory;
}

export interface Vulnerability {
  step: number;
  issue: string;
  counterexample: string | null;
  severity: "critical" | "major" | "minor";
  category?: WarningCategory;
}

export interface VerificationResult {
  passed: boolean;
  score: number;
  summary: string;
  vulnerabilities: Vulnerability[];
  rubric?: VerificationRubricItem[];
}

export interface VerificationRubricItem {
  id: VerificationDimensionId;
  label: string;
  weight: number;
  weightReason: string;
  score: number;
  diagnosis: string;
}

export interface ProofSuggestion {
  id: string;
  proofType: ProofType;
  label: string;
  description: string;
  sketch: string;
  projectedScore?: number;
}

export interface ProofResult {
  proofType: ProofType;
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
  demo?: boolean;
  demoKind?: "fixture" | "mock";
}

export type DemoFixtureId =
  | "direct"
  | "contradiction"
  | "induction"
  | "epsilon_delta"
  | "algebraic"
  | "combinatorial"
  | "set_identity";
