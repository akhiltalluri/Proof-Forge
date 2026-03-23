import type { DemoFixtureId, ProofResult } from "@/types/proof";

/** Canned pipeline output for portfolio demos — no OpenAI calls. */
export const DEMO_FIXTURES: Record<DemoFixtureId, ProofResult> = {
  direct: {
    proofType: "direct",
    mathDomain: "algebra",
    polishedProof:
      "We show that for all integers $n$, if $n$ is even then $n^2$ is even.\n\nAssume $n$ is even. Then there exists an integer $k$ such that $n = 2k$.\n\nSquaring both sides gives $n^2 = (2k)^2 = 4k^2 = 2(2k^2)$.\n\nSince $2k^2$ is an integer, $n^2$ is divisible by $2$, hence $n^2$ is even.",
    steps: [
      {
        number: 1,
        statement: "Assume $n$ is an even integer.",
        justification: "Hypothesis of the claim we prove.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "There exists $k \\in \\mathbb{Z}$ with $n = 2k$.",
        justification: "Definition of even integer.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "$n^2 = 4k^2 = 2(2k^2)$.",
        justification: "Algebraic expansion.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Therefore $n^2$ is even.",
        justification: "$2k^2 \\in \\mathbb{Z}$, so $n^2$ is twice an integer.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["$n$ is an even integer."],
    conclusion: "For every even integer $n$, the square $n^2$ is even.",
    verification: {
      passed: true,
      score: 92,
      summary:
        "Clean direct argument from the definition of even. Each step follows logically.",
      vulnerabilities: [],
    },
  },

  contradiction: {
    proofType: "contradiction",
    mathDomain: "number_theory",
    polishedProof:
      "We prove $\\sqrt{2}$ is irrational.\n\nSuppose toward a contradiction that $\\sqrt{2} = p/q$ where $p,q \\in \\mathbb{Z}$, $q \\neq 0$, and $\\gcd(p,q)=1$.\n\nThen $2q^2 = p^2$, so $p^2$ is even, hence $p$ is even. Write $p = 2k$.\n\nSubstituting gives $2q^2 = 4k^2$, so $q^2 = 2k^2$ and $q$ is even.\n\nThus $2$ divides both $p$ and $q$, contradicting $\\gcd(p,q)=1$.\n\nTherefore $\\sqrt{2}$ is irrational.",
    steps: [
      {
        number: 1,
        statement: "Assume $\\sqrt{2} = p/q$ in lowest terms.",
        justification: "Proof by contradiction setup.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "$2q^2 = p^2$, so $p$ is even.",
        justification: "Square both sides; if $p^2$ is even then $p$ is even.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Write $p = 2k$; then $q^2 = 2k^2$, so $q$ is even.",
        justification: "Substitute and apply the same parity argument.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Contradiction with $\\gcd(p,q)=1$.",
        justification: "Both divisible by $2$.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["$\\sqrt{2}$ is rational (for contradiction)."],
    conclusion: "$\\sqrt{2}$ is irrational.",
    verification: {
      passed: true,
      score: 94,
      summary:
        "Standard contradiction; the parity steps are correctly chained.",
      vulnerabilities: [],
    },
  },

  induction: {
    proofType: "induction",
    mathDomain: "discrete_math",
    polishedProof:
      "Claim: $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$ for all $n \\in \\mathbb{N}$.\n\nBase case ($n=1$): $\\sum_{i=1}^{1} i = 1 = \\frac{1 \\cdot 2}{2}$.\n\nInductive hypothesis: assume $\\sum_{i=1}^{k} i = \\frac{k(k+1)}{2}$.\n\nInductive step: $\\sum_{i=1}^{k+1} i = \\frac{k(k+1)}{2} + (k+1) = (k+1)\\left(\\frac{k}{2}+1\\right) = \\frac{(k+1)(k+2)}{2}$.\n\nBy induction, the formula holds for all $n \\in \\mathbb{N}$.",
    steps: [
      {
        number: 1,
        statement: "Verify the base case $n=1$.",
        justification: "Direct calculation.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Assume the formula holds for $n=k$.",
        justification: "Inductive hypothesis.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Deduce the formula for $n=k+1$ by adding $(k+1)$ to both sides.",
        justification: "Algebra and factoring $(k+1)$.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Conclude for all $n$ by the principle of induction.",
        justification: "Standard induction template.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["Induction over $\\mathbb{N}$."],
    conclusion: "$\\sum_{i=1}^{n} i = n(n+1)/2$ for all $n \\geq 1$.",
    verification: {
      passed: true,
      score: 90,
      summary:
        "Base case, hypothesis, and step are explicit; algebra in the step checks out.",
      vulnerabilities: [],
    },
  },

  epsilon_delta: {
    proofType: "epsilon_delta",
    mathDomain: "analysis",
    polishedProof:
      "We show $\\lim_{x \\to 2} (3x+1) = 7$ using the $\\varepsilon$-$\\delta$ definition.\n\nLet $\\varepsilon > 0$. We want $|x-2| < \\delta$ to imply $|(3x+1)-7| < \\varepsilon$.\n\nNote $|(3x+1)-7| = 3|x-2|$. Choose $\\delta = \\varepsilon/3$.\n\nIf $|x-2| < \\delta$, then $|(3x+1)-7| = 3|x-2| < 3\\delta = \\varepsilon$.\n\nHence the limit is $7$.",
    steps: [
      {
        number: 1,
        statement: "Let $\\varepsilon > 0$ be given.",
        justification: "Start of $\\varepsilon$-$\\delta$ proof.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Bound $|(3x+1)-7|$ by $3|x-2|$.",
        justification: "Algebra.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Choose $\\delta = \\varepsilon/3$.",
        justification: "To make $3|x-2| < \\varepsilon$ when $|x-2| < \\delta$.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Verify the implication $|x-2| < \\delta \\Rightarrow |(3x+1)-7| < \\varepsilon$.",
        justification: "Substitute $\\delta$.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["The usual definition of limit at a point in $\\mathbb{R}$."],
    conclusion: "$\\lim_{x \\to 2} (3x+1) = 7$.",
    verification: {
      passed: true,
      score: 93,
      summary:
        "Correct choice of $\\delta$; the factor $3$ from the slope is handled properly.",
      vulnerabilities: [],
    },
  },

  combinatorial: {
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    polishedProof:
      "We count the number of subsets of an $n$-element set $S$.\n\nEach element of $S$ is either included in a subset or not — $2$ choices per element, independently.\n\nBy the multiplication principle, there are $2^n$ distinct subsets.\n\nTherefore $|\\mathcal{P}(S)| = 2^n$.",
    steps: [
      {
        number: 1,
        statement: "Fix a set $S$ with $|S| = n$.",
        justification: "Problem setup.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Each element has two possibilities for membership in a chosen subset.",
        justification: "Definition of subset.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Independent choices multiply: $2 \\times 2 \\times \\cdots \\times 2$ ($n$ times).",
        justification: "Multiplication principle in combinatorics.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Hence there are $2^n$ subsets.",
        justification: "Conclusion.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["$S$ is a finite set with $n$ elements."],
    conclusion: "A set of size $n$ has exactly $2^n$ subsets.",
    verification: {
      passed: true,
      score: 88,
      summary:
        "Standard counting argument; clearly states independence of choices.",
      vulnerabilities: [],
    },
  },

  set_identity: {
    proofType: "set_identity",
    mathDomain: "set_theory",
    polishedProof:
      "We prove $A \\setminus (B \\cap C) = (A \\setminus B) \\cup (A \\setminus C)$ by mutual inclusion.\n\n($\\subseteq$) Let $x \\in A \\setminus (B \\cap C)$. Then $x \\in A$ and $x \\notin B \\cap C$, so $x \\notin B$ or $x \\notin C$. If $x \\notin B$ then $x \\in A \\setminus B$; if $x \\notin C$ then $x \\in A \\setminus C$. Thus $x \\in (A \\setminus B) \\cup (A \\setminus C)$.\n\n($\\supseteq$) Let $x \\in (A \\setminus B) \\cup (A \\setminus C)$. Then $x \\in A$ and ($x \\notin B$ or $x \\notin C$), so $x \\notin B \\cap C$. Hence $x \\in A \\setminus (B \\cap C)$.\n\nBoth inclusions hold, so the sets are equal.",
    steps: [
      {
        number: 1,
        statement: "Prove $A \\setminus (B \\cap C) \\subseteq (A \\setminus B) \\cup (A \\setminus C)$.",
        justification: "Take $x$ in the left side and use logical cases on $B \\cap C$.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Prove the reverse inclusion.",
        justification: "If $x$ is in the union of differences, $x$ avoids at least one of $B$ or $C$.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Conclude equality of sets.",
        justification: "Mutual inclusion.",
        hasWarning: false,
        warning: null,
      },
    ],
    assumptions: ["$A$, $B$, $C$ are sets in a fixed universe."],
    conclusion: "$A \\setminus (B \\cap C) = (A \\setminus B) \\cup (A \\setminus C)$.",
    verification: {
      passed: true,
      score: 91,
      summary:
        "De Morgan–style set identity; both directions are logically sound.",
      vulnerabilities: [],
    },
  },
};

export const DEMO_FIXTURE_LIST: { id: DemoFixtureId; label: string; blurb: string }[] = [
  { id: "direct", label: "Direct (algebra)", blurb: "Even $\\Rightarrow$ square even" },
  { id: "contradiction", label: "Contradiction (number theory)", blurb: "$\\sqrt{2}$ irrational" },
  { id: "induction", label: "Induction (discrete)", blurb: "Sum $1+\\cdots+n$" },
  { id: "epsilon_delta", label: "Epsilon–delta (analysis)", blurb: "A linear limit" },
  { id: "combinatorial", label: "Combinatorial", blurb: "$2^n$ subsets" },
  { id: "set_identity", label: "Set theory", blurb: "Set difference identity" },
];

export function isDemoFixtureId(s: string): s is DemoFixtureId {
  return s in DEMO_FIXTURES;
}

export function getDemoResult(id: DemoFixtureId): ProofResult {
  return JSON.parse(JSON.stringify(DEMO_FIXTURES[id])) as ProofResult;
}
