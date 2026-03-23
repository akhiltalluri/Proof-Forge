export type ProofType =
  | "direct"
  | "contradiction"
  | "contrapositive"
  | "induction"
  | "construction"
  | "cases"
  | "uniqueness";

export const PROOF_TYPE_LABELS: Record<ProofType, string> = {
  direct: "Direct Proof",
  contradiction: "Proof by Contradiction",
  contrapositive: "Proof by Contrapositive",
  induction: "Proof by Induction",
  construction: "Proof by Construction",
  cases: "Proof by Cases",
  uniqueness: "Uniqueness Proof",
};

export interface ProofStep {
  number: number;
  statement: string;
  justification: string;
  hasWarning: boolean;
  warning: string | null;
}

export interface Vulnerability {
  step: number;
  issue: string;
  counterexample: string | null;
  severity: "critical" | "major" | "minor";
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
}
