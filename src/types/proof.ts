export interface ProofStep {
  number: number;
  statement: string;
  justification: string;
  hasWarning: boolean;
  warning: string | null;
}

export interface ProofResult {
  polishedProof: string;
  steps: ProofStep[];
  assumptions: string[];
  conclusion: string;
}

export interface ApiResponse {
  success: boolean;
  data?: ProofResult;
  error?: string;
}
