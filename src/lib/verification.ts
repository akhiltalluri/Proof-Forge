import {
  VerificationDimensionId,
  VerificationResult,
  VerificationRubricItem,
  Vulnerability,
} from "@/types/proof";

interface VerificationRubricConfigItem {
  id: VerificationDimensionId;
  label: string;
  weight: number;
  weightReason: string;
}

export const VERIFICATION_RUBRIC_CONFIG: VerificationRubricConfigItem[] = [
  {
    id: "logical_validity",
    label: "Logical Validity",
    weight: 40,
    weightReason:
      "This carries the most weight because a proof fails outright if the main inference chain is invalid.",
  },
  {
    id: "justification",
    label: "Step Justification",
    weight: 25,
    weightReason:
      "Substantive claims need support from definitions, theorems, or earlier steps for the argument to be trustworthy.",
  },
  {
    id: "completeness",
    label: "Completeness and Cases",
    weight: 20,
    weightReason:
      "A proof can look plausible while still failing if it misses a case, hidden assumption, or edge condition.",
  },
  {
    id: "precision",
    label: "Precision and Notation",
    weight: 15,
    weightReason:
      "Quantifiers, notation, and variable discipline matter, but they are less central than the core logical structure.",
  },
];

const RELEVANT_CATEGORIES: Record<VerificationDimensionId, Set<string>> = {
  logical_validity: new Set(["unjustified_implication", "other"]),
  justification: new Set([
    "unjustified_implication",
    "skipped_algebra",
    "undefined_variable",
    "other",
  ]),
  completeness: new Set(["missing_base_case", "vague_existence", "other"]),
  precision: new Set(["quantifier_error", "undefined_variable", "other"]),
};

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function fallbackScoreFromVulnerabilities(vulnerabilities: Vulnerability[]): number {
  const penalty = vulnerabilities.reduce((total, vulnerability) => {
    if (vulnerability.severity === "critical") return total + 35;
    if (vulnerability.severity === "major") return total + 12;
    return total + 4;
  }, 0);

  return clampScore(92 - penalty);
}

function buildFallbackDiagnosis(
  id: VerificationDimensionId,
  vulnerabilities: Vulnerability[],
  summary: string
): string {
  const relevant = vulnerabilities.filter((vulnerability) => {
    if (!vulnerability.category) {
      return id === "logical_validity";
    }

    return RELEVANT_CATEGORIES[id].has(vulnerability.category);
  });

  if (relevant.length === 0) {
    return `No explicit deductions were flagged in this category. ${summary}`;
  }

  const highlights = relevant
    .slice(0, 2)
    .map(
      (vulnerability) =>
        `Step ${vulnerability.step}: ${vulnerability.issue}`
    )
    .join(" ");

  return highlights;
}

function normalizeRubricItem(
  config: VerificationRubricConfigItem,
  item:
    | Partial<Pick<VerificationRubricItem, "score" | "diagnosis">>
    | undefined,
  vulnerabilities: Vulnerability[],
  summary: string,
  fallbackScore: number
): VerificationRubricItem {
  return {
    id: config.id,
    label: config.label,
    weight: config.weight,
    weightReason: config.weightReason,
    score: clampScore(
      typeof item?.score === "number" ? item.score : fallbackScore
    ),
    diagnosis:
      item?.diagnosis?.trim() ||
      buildFallbackDiagnosis(config.id, vulnerabilities, summary),
  };
}

export function normalizeVerificationResult(
  verification: VerificationResult
): VerificationResult {
  const vulnerabilities = verification.vulnerabilities ?? [];
  const fallbackScore =
    typeof verification.score === "number"
      ? verification.score
      : fallbackScoreFromVulnerabilities(vulnerabilities);

  const rubricMap = new Map(
    (verification.rubric ?? []).map((item) => [item.id, item] as const)
  );

  const rubric = VERIFICATION_RUBRIC_CONFIG.map((config) =>
    normalizeRubricItem(
      config,
      rubricMap.get(config.id),
      vulnerabilities,
      verification.summary,
      fallbackScore
    )
  );

  let score = Math.round(
    rubric.reduce((total, item) => total + (item.score * item.weight) / 100, 0)
  );

  if (vulnerabilities.some((vulnerability) => vulnerability.severity === "critical")) {
    score = Math.min(score, 59);
  }

  const passed =
    score >= 70 &&
    !vulnerabilities.some((vulnerability) => vulnerability.severity === "critical");

  return {
    ...verification,
    passed,
    score,
    vulnerabilities,
    rubric,
  };
}
