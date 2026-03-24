import {
  DemoFixtureId,
  ProofResult,
  ProofType,
  MathDomain,
  ProofStep,
  ProofSuggestion,
  Vulnerability,
} from "@/types/proof";
import { normalizeVerificationResult } from "@/lib/verification";
import { normalizeProofType } from "@/lib/proof-taxonomy";

export interface DemoFixture {
  id: DemoFixtureId;
  title: string;
  topic: string;
  difficulty: "Intro" | "Intermediate" | "Advanced";
  proofType: ProofType;
  mathDomain: MathDomain;
  pitfall: string;
  text: string;
}

const FIXTURES: Record<DemoFixtureId, { meta: DemoFixture; result: ProofResult }> = {
  direct: {
    meta: {
      id: "direct",
      title: "Bounded monotone sequence",
      topic: "Analysis",
      difficulty: "Intro",
      proofType: "direct",
      mathDomain: "analysis",
      pitfall: "Assuming convergence without invoking monotone boundedness",
      text:
        "Suppose (a_n) is increasing and bounded above. Let L = sup{a_n : n in N}. For epsilon > 0, L - epsilon is not an upper bound, so there exists N with a_N > L - epsilon. Since the sequence is increasing, L - epsilon < a_n <= L for all n >= N, so a_n -> L.",
    },
    result: {
      proofType: "direct",
      mathDomain: "analysis",
      polishedProof:
        "Let $L = \\sup\\{a_n : n \\in \\mathbb{N}\\}$. Since $(a_n)$ is bounded above, $L$ exists. Fix $\\varepsilon > 0$. Because $L - \\varepsilon$ is not an upper bound for the set of sequence values, there exists $N$ such that $a_N > L - \\varepsilon$. Since $(a_n)$ is increasing, for every $n \\geq N$ we have $L - \\varepsilon < a_N \\leq a_n \\leq L$. Therefore $|a_n - L| < \\varepsilon$ for all $n \\geq N$, so $a_n \\to L$.",
      steps: [
        {
          number: 1,
          statement: "Let $L = \\sup\\{a_n : n \\in \\mathbb{N}\\}$.",
          justification:
            "The set of sequence values is nonempty and bounded above, so its supremum exists.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement:
            "For any $\\varepsilon > 0$, the number $L - \\varepsilon$ is not an upper bound.",
          justification: "This follows from the defining property of the supremum.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement:
            "There exists $N$ such that $a_N > L - \\varepsilon$.",
          justification:
            "If no such index existed, then $L - \\varepsilon$ would be an upper bound.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 4,
          statement:
            "For all $n \\geq N$, $L - \\varepsilon < a_n \\leq L$.",
          justification:
            "The sequence is increasing and $L$ is an upper bound.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 5,
          statement: "Therefore $a_n \\to L$.",
          justification:
            "The inequality from the previous step implies $|a_n - L| < \\varepsilon$ eventually.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["$(a_n)$ is increasing.", "$(a_n)$ is bounded above."],
      conclusion: "The sequence $(a_n)$ converges.",
      verification: {
        passed: true,
        score: 94,
        summary:
          "The proof uses the supremum characterization cleanly and justifies the convergence estimate explicitly.",
        vulnerabilities: [],
      },
    },
  },
  contradiction: {
    meta: {
      id: "contradiction",
      title: "Irrationality of sqrt(2)",
      topic: "Number Theory",
      difficulty: "Intro",
      proofType: "contradiction",
      mathDomain: "number_theory",
      pitfall: "Using lowest terms without spelling out why evenness contradicts it",
      text:
        "Assume sqrt(2) = p/q in lowest terms. Then 2q^2 = p^2, so p is even. Write p = 2k. Then q^2 = 2k^2, so q is even too. That contradicts lowest terms.",
    },
    result: {
      proofType: "contradiction",
      mathDomain: "number_theory",
      polishedProof:
        "Assume for contradiction that $\\sqrt{2}$ is rational. Then there exist integers $p$ and $q$ with $q \\neq 0$ such that $\\sqrt{2} = p/q$ and $\\gcd(p,q)=1$. Squaring both sides gives $2q^2 = p^2$. Hence $p^2$ is even, so $p$ is even; write $p = 2k$. Substituting back yields $2q^2 = 4k^2$, so $q^2 = 2k^2$, and therefore $q$ is even. Thus both $p$ and $q$ are divisible by $2$, contradicting $\\gcd(p,q)=1$. Therefore $\\sqrt{2}$ is irrational.",
      steps: [
        {
          number: 1,
          statement:
            "Assume $\\sqrt{2} = p/q$ with integers $p,q$ in lowest terms.",
          justification:
            "This is the negation of irrationality expressed in reduced form.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement: "Squaring gives $2q^2 = p^2$.",
          justification: "Algebraic manipulation.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement: "$p$ is even.",
          justification: "If $p^2$ is even, then $p$ is even.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 4,
          statement: "$q$ is even.",
          justification:
            "Substituting $p = 2k$ shows $q^2$ is even, hence $q$ is even.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 5,
          statement: "This contradicts the assumption that $p/q$ is in lowest terms.",
          justification:
            "If both numerator and denominator are even, they share a common factor.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Assume $\\sqrt{2}$ is rational."],
      conclusion: "$\\sqrt{2}$ is irrational.",
      verification: {
        passed: true,
        score: 96,
        summary:
          "The contradiction structure is explicit and each parity step is justified.",
        vulnerabilities: [],
      },
    },
  },
  induction: {
    meta: {
      id: "induction",
      title: "Closed form for a geometric sum",
      topic: "Discrete Math",
      difficulty: "Intermediate",
      proofType: "induction",
      mathDomain: "discrete_math",
      pitfall: "Skipping the inductive hypothesis or algebra in the step",
      text:
        "Prove by induction that 1 + 2 + ... + n = n(n+1)/2. Base case n=1 is clear. Assume true for n=k. Then 1 + ... + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2.",
    },
    result: {
      proofType: "induction",
      mathDomain: "discrete_math",
      polishedProof:
        "We prove by induction on $n$ that $1 + 2 + \\cdots + n = n(n+1)/2$. For the base case $n=1$, the left-hand side is $1$ and the right-hand side is $1(2)/2 = 1$. Now assume the statement holds for some $k \\in \\mathbb{N}$, so $1 + 2 + \\cdots + k = k(k+1)/2$. Then\n$1 + 2 + \\cdots + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2$.\nThus the formula holds for $k+1$, and the result follows by induction.",
      steps: [
        {
          number: 1,
          statement: "Verify the statement for $n = 1$.",
          justification: "Direct computation shows both sides equal $1$.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement:
            "Assume $1 + 2 + \\cdots + k = k(k+1)/2$ for some $k \\in \\mathbb{N}$.",
          justification: "This is the inductive hypothesis.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement:
            "$1 + 2 + \\cdots + k + (k+1) = k(k+1)/2 + (k+1)$.",
          justification: "Substitute the inductive hypothesis into the $(k+1)$st sum.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 4,
          statement:
            "$k(k+1)/2 + (k+1) = (k+1)(k+2)/2$.",
          justification: "Factor out $(k+1)$ and simplify algebraically.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 5,
          statement: "Therefore the formula holds for all $n \\in \\mathbb{N}$.",
          justification: "The base case and inductive step establish the claim by induction.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Use mathematical induction on $n$."],
      conclusion: "$1 + 2 + \\cdots + n = n(n+1)/2$ for all $n \\in \\mathbb{N}$.",
      verification: {
        passed: true,
        score: 93,
        summary:
          "The induction base case and inductive step are both explicit and algebraically complete.",
        vulnerabilities: [],
      },
    },
  },
  epsilon_delta: {
    meta: {
      id: "epsilon_delta",
      title: "Limit of a linear function",
      topic: "Analysis",
      difficulty: "Intermediate",
      proofType: "epsilon_delta",
      mathDomain: "analysis",
      pitfall: "Choosing a delta that does not control the full expression",
      text:
        "Show lim_{x -> 3} (2x + 1) = 7. Given epsilon > 0, choose delta = epsilon/2. If |x-3| < delta then |(2x+1)-7| = 2|x-3| < 2 delta = epsilon.",
    },
    result: {
      proofType: "epsilon_delta",
      mathDomain: "analysis",
      polishedProof:
        "Let $\\varepsilon > 0$ be given. Choose $\\delta = \\varepsilon/2$. If $0 < |x-3| < \\delta$, then\n$|(2x+1)-7| = |2x-6| = 2|x-3| < 2\\delta = \\varepsilon$.\nTherefore, for every $\\varepsilon > 0$ there exists $\\delta > 0$ such that $0 < |x-3| < \\delta$ implies $|(2x+1)-7| < \\varepsilon$. Hence $\\lim_{x \\to 3}(2x+1)=7$.",
      steps: [
        {
          number: 1,
          statement: "Fix $\\varepsilon > 0$ and choose $\\delta = \\varepsilon/2$.",
          justification: "This choice will make the target expression smaller than $\\varepsilon$.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement: "If $0 < |x-3| < \\delta$, then $|(2x+1)-7| = 2|x-3|$.",
          justification: "Simplify the expression algebraically.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement: "$|(2x+1)-7| < \\varepsilon$.",
          justification: "Substitute the bound $|x-3| < \\delta$ and the choice of $\\delta$.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Let $\\varepsilon > 0$."],
      conclusion: "$\\lim_{x \\to 3}(2x+1)=7$.",
      verification: {
        passed: true,
        score: 92,
        summary:
          "The epsilon-delta proof is direct and the delta choice controls the expression exactly.",
        vulnerabilities: [],
      },
    },
  },
  algebraic: {
    meta: {
      id: "algebraic",
      title: "Distributivity over a sum",
      topic: "Algebra",
      difficulty: "Intro",
      proofType: "algebraic",
      mathDomain: "algebra",
      pitfall: "Skipping the ring axioms that justify each rewrite",
      text:
        "Show a(b+c) = ab + ac. Use the distributive law in a ring and rewrite step by step.",
    },
    result: {
      proofType: "algebraic",
      mathDomain: "algebra",
      polishedProof:
        "In any ring, multiplication distributes over addition. Therefore, for arbitrary elements $a$, $b$, and $c$, we have $a(b+c) = ab + ac$. This identity follows directly from the ring axioms and holds for all choices of the three elements.",
      steps: [
        {
          number: 1,
          statement: "Work in a ring and fix arbitrary elements $a$, $b$, and $c$.",
          justification: "The statement is universal, so we begin with arbitrary elements.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement: "$a(b+c) = ab + ac$.",
          justification: "This is precisely the distributive axiom of ring multiplication over addition.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Work in a ring."],
      conclusion: "$a(b+c)=ab+ac$ for all ring elements $a,b,c$.",
      verification: {
        passed: true,
        score: 90,
        summary:
          "The proof is short because the claim is exactly one of the ring axioms, and that is stated explicitly.",
        vulnerabilities: [],
      },
    },
  },
  combinatorial: {
    meta: {
      id: "combinatorial",
      title: "Handshake lemma",
      topic: "Combinatorics",
      difficulty: "Intermediate",
      proofType: "combinatorial",
      mathDomain: "combinatorics",
      pitfall: "Counting edges once instead of twice",
      text:
        "In any finite graph, the sum of the vertex degrees is twice the number of edges, because each edge contributes 1 to the degree count of each endpoint.",
    },
    result: {
      proofType: "combinatorial",
      mathDomain: "combinatorics",
      polishedProof:
        "Let $G$ be a finite graph with edge set $E$. Count the incidences between vertices and edges in two ways. On one hand, summing the degrees of all vertices counts exactly how many incidences each vertex has. On the other hand, every edge has exactly two endpoints, so each edge contributes $2$ to the total incidence count. Therefore $\\sum_{v \\in V(G)} \\deg(v) = 2|E|$.",
      steps: [
        {
          number: 1,
          statement: "Count vertex-edge incidences in the graph.",
          justification: "A double-counting argument compares the same set from two perspectives.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement: "The sum $\\sum_{v \\in V(G)} \\deg(v)$ counts all incidences.",
          justification: "Each vertex contributes its number of incident edges.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement: "Each edge contributes exactly $2$ incidences.",
          justification: "An edge has two endpoints in a finite graph.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 4,
          statement: "Therefore $\\sum_{v \\in V(G)} \\deg(v) = 2|E|$.",
          justification: "Both expressions count the same set of incidences.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Let $G$ be a finite graph."],
      conclusion: "The sum of the vertex degrees equals twice the number of edges.",
      verification: {
        passed: true,
        score: 94,
        summary:
          "The proof correctly frames the statement as a double-counting argument and identifies both counts.",
        vulnerabilities: [],
      },
    },
  },
  set_identity: {
    meta: {
      id: "set_identity",
      title: "Distributive law for sets",
      topic: "Set Theory",
      difficulty: "Intermediate",
      proofType: "set_identity",
      mathDomain: "set_theory",
      pitfall: "Only proving one set inclusion",
      text:
        "Prove A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) by showing both inclusions elementwise.",
    },
    result: {
      proofType: "set_identity",
      mathDomain: "set_theory",
      polishedProof:
        "We prove the identity by double inclusion. First, let $x \\in A \\cap (B \\cup C)$. Then $x \\in A$ and either $x \\in B$ or $x \\in C$. In the first case $x \\in A \\cap B$, and in the second case $x \\in A \\cap C$. Hence $x \\in (A \\cap B) \\cup (A \\cap C)$. Conversely, let $x \\in (A \\cap B) \\cup (A \\cap C)$. Then either $x \\in A \\cap B$ or $x \\in A \\cap C$. In either case, $x \\in A$ and $x \\in B \\cup C$, so $x \\in A \\cap (B \\cup C)$. Therefore the two sets are equal.",
      steps: [
        {
          number: 1,
          statement: "Show $A \\cap (B \\cup C) \\subseteq (A \\cap B) \\cup (A \\cap C)$.",
          justification: "Take an arbitrary element of the left-hand side and split into cases.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 2,
          statement: "Show $(A \\cap B) \\cup (A \\cap C) \\subseteq A \\cap (B \\cup C)$.",
          justification: "Take an arbitrary element of the right-hand side and verify membership in the left-hand side.",
          hasWarning: false,
          warning: null,
        },
        {
          number: 3,
          statement: "Conclude the sets are equal.",
          justification: "Two sets are equal when each is contained in the other.",
          hasWarning: false,
          warning: null,
        },
      ],
      assumptions: ["Let $A$, $B$, and $C$ be sets."],
      conclusion: "$A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$.",
      verification: {
        passed: true,
        score: 95,
        summary:
          "The proof shows both inclusions cleanly and uses standard element-chasing without omissions.",
        vulnerabilities: [],
      },
    },
  },
};

export const DEMO_FIXTURES: DemoFixture[] = Object.values(FIXTURES).map(
  (fixture) => fixture.meta
);

export function getDemoResult(id: DemoFixtureId): ProofResult {
  return FIXTURES[id].result;
}

function includesAny(text: string, needles: string[]): boolean {
  return needles.some((needle) => text.includes(needle));
}

function collapseWhitespace(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function extractClaim(proof: string): string {
  const compact = collapseWhitespace(proof);
  if (!compact) return "the stated claim";

  const [firstSentence] = compact.split(/(?<=[.!?])\s+/);
  const base = firstSentence || compact;
  return base.length > 180 ? `${base.slice(0, 177)}...` : base;
}

function inferMockProofType(proof: string, proofType?: string): ProofType {
  if (proofType) {
    return normalizeProofType(proofType);
  }

  const lower = proof.toLowerCase();

  if (
    includesAny(lower, [
      "induction",
      "base case",
      "inductive step",
      "inductive hypothesis",
    ])
  ) {
    return "induction";
  }

  if (
    includesAny(lower, [
      "contradiction",
      "assume not",
      "suppose not",
      "suppose the contrary",
      "for contradiction",
    ])
  ) {
    return "contradiction";
  }

  if (
    includesAny(lower, [
      "epsilon",
      "delta",
      "limit",
      "lim",
      "n >",
      "\\varepsilon",
      "\\delta",
    ])
  ) {
    return "epsilon_delta";
  }

  return "direct";
}

function inferMockMathDomain(proof: string): MathDomain {
  const lower = proof.toLowerCase();

  if (
    includesAny(lower, [
      "epsilon",
      "delta",
      "limit",
      "continuous",
      "conver",
      "\\varepsilon",
      "\\delta",
      "compact",
      "sup",
    ])
  ) {
    return "analysis";
  }

  if (
    includesAny(lower, [
      "prime",
      "integer",
      "divisible",
      "gcd",
      "mod",
      "even",
      "odd",
      "irrational",
    ])
  ) {
    return "number_theory";
  }

  if (
    includesAny(lower, [
      "subset",
      "union",
      "intersection",
      "set",
      "element",
      "\\cup",
      "\\cap",
      "\\subseteq",
    ])
  ) {
    return "set_theory";
  }

  if (
    includesAny(lower, [
      "graph",
      "vertex",
      "edge",
      "count",
      "choose",
      "pigeonhole",
      "bijection",
    ])
  ) {
    return "combinatorics";
  }

  if (
    includesAny(lower, [
      "matrix",
      "polynomial",
      "ring",
      "group",
      "field",
      "vector",
      "linear",
    ])
  ) {
    return "algebra";
  }

  if (
    includesAny(lower, [
      "triangle",
      "angle",
      "circle",
      "parallel",
      "perpendicular",
    ])
  ) {
    return "geometry";
  }

  if (includesAny(lower, ["induction", "base case", "recursive", "n+1"])) {
    return "discrete_math";
  }

  return "general";
}

function buildMockSteps(proofType: ProofType, claim: string): ProofStep[] {
  if (proofType === "induction") {
    return [
      {
        number: 1,
        statement: `State the proposition $P(n)$ corresponding to ${claim}.`,
        justification: "An induction proof should begin by naming the statement to prove for each $n$.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Verify the base case explicitly.",
        justification: "The argument needs an initial value where the claim is checked directly.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Assume $P(k)$ for an arbitrary $k$.",
        justification: "This is the inductive hypothesis.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: "Use the inductive hypothesis to prove $P(k+1)$.",
        justification: "The inductive step should show exactly how the next case follows.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 5,
        statement: `Conclude ${claim}.`,
        justification: "The base case and inductive step together establish the result by induction.",
        hasWarning: false,
        warning: null,
      },
    ];
  }

  if (proofType === "contradiction") {
    return [
      {
        number: 1,
        statement: `Assume the negation of ${claim}.`,
        justification: "A contradiction proof begins by negating the desired conclusion.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Translate that assumption into an algebraic or logical consequence.",
        justification: "The draft should make the temporary assumption concrete enough to manipulate.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Derive a contradiction with a stated hypothesis or known fact.",
        justification: "The core of the method is reaching an impossibility from the negated assumption.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: `Reject the negation and conclude ${claim}.`,
        justification: "Once the contradiction is explicit, the original statement follows.",
        hasWarning: false,
        warning: null,
      },
    ];
  }

  if (proofType === "epsilon_delta") {
    return [
      {
        number: 1,
        statement: "Let $\\varepsilon > 0$ be arbitrary.",
        justification: "An epsilon-delta proof starts by fixing the target tolerance.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 2,
        statement: "Choose a corresponding $\\delta$ or threshold $N$.",
        justification: "The draft should specify the controlling quantity before estimating.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 3,
        statement: "Estimate the target expression using the chosen bound.",
        justification: "This is where the proof connects the hypothesis to the desired inequality.",
        hasWarning: false,
        warning: null,
      },
      {
        number: 4,
        statement: `Conclude ${claim}.`,
        justification: "Once the estimate is below $\\varepsilon$, the limit statement is established.",
        hasWarning: false,
        warning: null,
      },
    ];
  }

  return [
    {
      number: 1,
      statement: "State the hypotheses from the draft precisely.",
      justification: "A direct proof should start from the assumptions being used.",
      hasWarning: false,
      warning: null,
    },
    {
      number: 2,
      statement: "Identify the key theorem, definition, or algebraic fact that drives the argument.",
      justification: "Naming the main tool makes the proof easier to verify and follow.",
      hasWarning: false,
      warning: null,
    },
    {
      number: 3,
      statement: "Derive the needed intermediate claim explicitly.",
      justification: "The middle inference is usually where rough drafts skip a justification.",
      hasWarning: false,
      warning: null,
    },
    {
      number: 4,
      statement: `Conclude ${claim}.`,
      justification: "The final step should tie the intermediate claim back to the desired result.",
      hasWarning: false,
      warning: null,
    },
  ];
}

function buildMockPolishedProof(
  proofType: ProofType,
  claim: string,
  proof: string
): string {
  const draftExcerpt = extractClaim(proof);

  const intro =
    "Mock demo result: this proof was processed by the local offline demo pipeline, so the rewrite and score below are illustrative heuristics rather than a live OpenAI analysis.";

  if (proofType === "induction") {
    return `${intro}\n\nA clearer induction-style presentation would begin by isolating the statement $P(n)$ and checking an explicit base case. The draft suggests the claim ${claim}, so the polished version should then assume $P(k)$, use that hypothesis carefully in the transition to $P(k+1)$, and close by citing induction. In short, the sketch already points in the right direction, but the base case, inductive hypothesis, and inductive step should be separated more cleanly.\n\nDraft signal used by the mock pipeline: ${draftExcerpt}`;
  }

  if (proofType === "contradiction") {
    return `${intro}\n\nA contradiction-style rewrite would start by assuming the negation of ${claim} and then tracing the consequences of that assumption until it conflicts with a hypothesis or standard fact. The draft already looks like it is aiming for that structure, but the contradiction should be named explicitly so the turning point of the proof is easy to see. A cleaned-up version would separate the temporary assumption, the derived consequence, and the final contradiction into distinct sentences.\n\nDraft signal used by the mock pipeline: ${draftExcerpt}`;
  }

  if (proofType === "epsilon_delta") {
    return `${intro}\n\nAn epsilon-delta style rewrite should fix $\\varepsilon > 0$, choose a matching $\\delta$ or threshold $N$, and then estimate the target quantity line by line until it falls below $\\varepsilon$. The draft appears to be working toward ${claim}, so the main improvement is to state the chosen control parameter explicitly before doing the estimate. That makes the proof read like a complete limit argument rather than a sketch.\n\nDraft signal used by the mock pipeline: ${draftExcerpt}`;
  }

  return `${intro}\n\nA cleaner direct-proof version would start from the stated hypotheses, name the key definition or theorem being used, and then make the main implication explicit before concluding ${claim}. The draft already contains the core idea, but it reads more like a sketch than a finished proof, so the local mock pipeline is emphasizing structure and justification rather than claiming to verify the mathematics itself.\n\nDraft signal used by the mock pipeline: ${draftExcerpt}`;
}

function buildMockVulnerabilities(
  proof: string,
  proofType: ProofType,
  steps: ProofStep[]
): Vulnerability[] {
  const lower = proof.toLowerCase();
  const vulnerabilities: Vulnerability[] = [];

  if (proofType === "induction") {
    if (!includesAny(lower, ["base case", "n=1", "n = 1", "n=0", "n = 0"])) {
      vulnerabilities.push({
        step: 2,
        issue: "The draft does not clearly identify or verify a base case.",
        counterexample: null,
        severity: "major",
        category: "missing_base_case",
      });
    }

    if (!includesAny(lower, ["inductive step", "assume true for", "assume p(k)", "hypothesis"])) {
      vulnerabilities.push({
        step: 4,
        issue: "The inductive hypothesis and the transition to the next case are not separated clearly.",
        counterexample: null,
        severity: "major",
        category: "unjustified_implication",
      });
    }
  } else if (proofType === "contradiction") {
    if (!includesAny(lower, ["assume", "suppose", "contradiction", "contrary"])) {
      vulnerabilities.push({
        step: 1,
        issue: "The temporary negated assumption is not stated explicitly enough for a contradiction proof.",
        counterexample: null,
        severity: "major",
        category: "other",
      });
    }

    if (!includesAny(lower, ["contradiction", "impossible", "cannot", "absurd"])) {
      vulnerabilities.push({
        step: Math.min(steps.length, 3),
        issue: "The draft suggests a contradiction approach, but the contradiction itself is never clearly named.",
        counterexample: null,
        severity: "major",
        category: "unjustified_implication",
      });
    }
  } else if (proofType === "epsilon_delta") {
    if (!includesAny(lower, ["delta", "\\delta", "n =", "n>", "choose n", "choose delta"])) {
      vulnerabilities.push({
        step: 2,
        issue: "The controlling choice of $\\delta$ or $N$ is missing or too vague.",
        counterexample: null,
        severity: "major",
        category: "quantifier_error",
      });
    }

    if (!includesAny(lower, ["epsilon", "\\varepsilon", "limit", "lim"])) {
      vulnerabilities.push({
        step: 3,
        issue: "The draft does not clearly connect the estimate back to the formal limit target.",
        counterexample: null,
        severity: "minor",
        category: "quantifier_error",
      });
    }
  } else {
    if (collapseWhitespace(proof).length < 120) {
      vulnerabilities.push({
        step: 3,
        issue: "The draft is concise enough that one key inference likely needs more justification.",
        counterexample: null,
        severity: "major",
        category: "unjustified_implication",
      });
    }

    if (!includesAny(lower, ["because", "since", "therefore", "thus", "hence"])) {
      vulnerabilities.push({
        step: 2,
        issue: "The main theorem or definition driving the argument is not signposted explicitly.",
        counterexample: null,
        severity: "minor",
        category: "other",
      });
    }
  }

  if (vulnerabilities.length === 0) {
    vulnerabilities.push({
      step: steps.length,
      issue: "The sketch is plausible, but one or two transitions should still be written with more explicit justification in a final draft.",
      counterexample: null,
      severity: "minor",
      category: "other",
    });
  }

  return vulnerabilities;
}

function buildMockSuggestions(
  proofType: ProofType,
  score: number,
  claim: string
): ProofSuggestion[] | undefined {
  if (score >= 84) {
    return undefined;
  }

  const projectedScore = Math.min(96, score + 12);

  if (proofType === "induction") {
    return [
      {
        id: "mock-induction-scaffold",
        proofType: "induction",
        label: "Spell out the induction scaffold",
        description: "Add an explicit base case, inductive hypothesis, and step to make the chain easier to verify.",
        sketch: `State $P(n)$ clearly, verify the base case, assume $P(k)$, prove $P(k+1)$, and then conclude ${claim}.`,
        projectedScore,
      },
    ];
  }

  if (proofType === "contradiction") {
    return [
      {
        id: "mock-contradiction-target",
        proofType: "contradiction",
        label: "Name the contradiction target up front",
        description: "Make the negated assumption and the eventual contradiction explicit earlier in the proof.",
        sketch: `Assume the negation of ${claim}, derive a consequence that conflicts with the hypotheses, and then reject the assumption.`,
        projectedScore,
      },
    ];
  }

  if (proofType === "epsilon_delta") {
    return [
      {
        id: "mock-epsilon-delta-choice",
        proofType: "epsilon_delta",
        label: "Choose the controlling bound first",
        description: "State the choice of $\\delta$ or $N$ before estimating so the proof reads like a complete limit argument.",
        sketch: `Fix $\\varepsilon > 0$, choose a matching $\\delta$ or $N$, estimate the target expression, and conclude ${claim}.`,
        projectedScore,
      },
    ];
  }

  return [
    {
      id: "mock-direct-structure",
      proofType: "direct",
      label: "Name the key theorem before the main inference",
      description: "Introduce the controlling theorem or definition explicitly, then walk through the implication in one straight line.",
      sketch: `State the hypotheses, cite the main fact being used, derive the needed intermediate claim, and conclude ${claim}.`,
      projectedScore,
    },
  ];
}

export function getMockDemoResult(
  proof: string,
  proofType?: string
): ProofResult {
  const normalizedProof = proof.trim();
  const inferredProofType = inferMockProofType(normalizedProof, proofType);
  const mathDomain = inferMockMathDomain(normalizedProof);
  const claim = extractClaim(normalizedProof);
  const steps = buildMockSteps(inferredProofType, claim);
  const vulnerabilities = buildMockVulnerabilities(
    normalizedProof,
    inferredProofType,
    steps
  );

  const rawScore = Math.max(
    58,
    90 -
      vulnerabilities.reduce((total, vulnerability) => {
        if (vulnerability.severity === "major") return total + 12;
        if (vulnerability.severity === "critical") return total + 30;
        return total + 5;
      }, 0)
  );

  const verification = normalizeVerificationResult({
    passed: rawScore >= 70,
    score: rawScore,
    summary:
      "Offline mock verification: this score comes from local heuristics in demo mode and is meant to illustrate the product flow, not replace real proof validation.",
    vulnerabilities,
  });

  return {
    proofType: inferredProofType,
    mathDomain,
    polishedProof: buildMockPolishedProof(
      inferredProofType,
      claim,
      normalizedProof
    ),
    steps,
    assumptions: [
      "This result was generated by the local offline demo pipeline.",
      "The original proof sketch provides the mathematical context.",
    ],
    conclusion: `Mock demo conclusion: the draft is being treated as an example of ${claim}.`,
    verification,
    suggestions: buildMockSuggestions(
      inferredProofType,
      verification.score,
      claim
    ),
  };
}
