import { MathDomain, ProofType } from "@/types/proof";

export interface ProofExample {
  id: string;
  title: string;
  topic: string;
  proofType: ProofType;
  mathDomain: MathDomain;
  difficulty: "Intro" | "Intermediate" | "Advanced";
  pitfall: string;
  text: string;
}

export const EXAMPLES: ProofExample[] = [
  {
    id: "analysis-harmonic",
    title: "Harmonic series diverges",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    pitfall: "Using the integral test without justifying the comparison",
    text:
      "I want to show that if you keep adding smaller and smaller positive numbers, the total can still blow up to infinity. Like 1 + 1/2 + 1/3 + 1/4 + ... never stops growing.",
  },
  {
    id: "number-theory-primes",
    title: "There is no largest prime",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intro",
    pitfall: "Forgetting to explain why a prime divisor of N is new",
    text:
      "How do I prove that there's no biggest prime number? Suppose $p_1, p_2, \\ldots, p_n$ are all the primes. Consider $N = p_1 p_2 \\cdots p_n + 1$. None of the $p_i$ divide $N$, so $N$ has a prime factor not on the list — contradiction.",
  },
  {
    id: "analysis-ivt",
    title: "Intermediate value style argument",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    pitfall: "Invoking continuity informally instead of using the theorem precisely",
    text:
      "If I have a continuous curve that starts below zero and ends above zero, it has to cross zero at some point, right? Can you make that rigorous?",
  },
  {
    id: "number-theory-sqrt2",
    title: "Irrationality of sqrt(2)",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intro",
    pitfall: "Skipping the contradiction with lowest terms",
    text:
      "Can you help me show that $\\sqrt{2}$ is irrational? Assume $\\sqrt{2} = p/q$ in lowest terms. Then $2q^2 = p^2$, so $p$ is even. Write $p = 2k$, then $q^2 = 2k^2$, so $q$ is even too — contradicting lowest terms.",
  },
  {
    id: "topology-cauchy",
    title: "Cauchy should converge?",
    topic: "Topology / Analysis",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intermediate",
    pitfall: "Confusing Cauchy with convergent outside complete spaces",
    text:
      "I think if a sequence keeps getting closer and closer together, it has to converge to something. Like the terms are bunching up so they must be heading somewhere. Can you prove that?",
  },
  {
    id: "analysis-evt",
    title: "Extreme value theorem sketch",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    pitfall: "Saying the supremum is attained without the compactness step",
    text:
      "If $f$ is continuous on $[a,b]$, can I always find where it reaches its maximum? Since $[a,b]$ is compact and $f$ is continuous, $f([a,b])$ is compact in $\\mathbb{R}$, hence closed and bounded. So $\\sup f([a,b])$ is attained.",
  },
  {
    id: "algebra-0.999",
    title: "Why 0.999... equals 1",
    topic: "Algebra",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    pitfall: "Relying on intuition instead of a legitimate algebraic manipulation",
    text:
      "I want to prove that 0.999... repeating is exactly equal to 1, not just close to it. People always argue about this — what's the actual proof?",
  },
  {
    id: "analysis-sequence-sum",
    title: "Limit of a sum",
    topic: "Analysis",
    proofType: "epsilon_delta",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    pitfall: "Choosing the same epsilon twice without splitting it",
    text:
      "If $a_n \\to A$ and $b_n \\to B$, does $a_n + b_n \\to A + B$? Pick $\\varepsilon > 0$. Choose $N_1$ so $|a_n - A| < \\varepsilon/2$ for $n \\geq N_1$ and $N_2$ so $|b_n - B| < \\varepsilon/2$ for $n \\geq N_2$. Then for $n \\geq \\max(N_1, N_2)$, $|(a_n+b_n)-(A+B)| < \\varepsilon$.",
  },
  {
    id: "analysis-bolzano-weierstrass",
    title: "Bounded sequence subsequence",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    pitfall: "Citing Bolzano-Weierstrass without identifying the bounded set clearly",
    text:
      "Is it true that every bounded sequence has a convergent subsequence? I remember hearing this in class but I don't remember why it's true.",
  },
  {
    id: "analysis-mvt",
    title: "Derivative zero implies constant",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    pitfall: "Using the Mean Value Theorem without specifying the interval",
    text:
      "I need to show that if $f'(x) = 0$ for all $x \\in (a,b)$, then $f$ is constant. By the Mean Value Theorem, for any $x, y \\in (a,b)$ there exists $c$ between them with $f(x) - f(y) = f'(c)(x-y) = 0$.",
  },
  {
    id: "discrete-induction",
    title: "Sum of first n integers",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    pitfall: "Forgetting to separate the base case from the inductive step",
    text:
      "Prove by induction that $1 + 2 + \\cdots + n = n(n+1)/2$. Base case $n=1$ is obvious. Assume true for $n=k$. Then add $k+1$ and simplify.",
  },
  {
    id: "algebra-divisibility",
    title: "Difference of squares divisibility",
    topic: "Algebra / Number Theory",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    pitfall: "Skipping the factorization step that makes divisibility transparent",
    text:
      "Show that if $a \\equiv b \\pmod n$, then $a^2 \\equiv b^2 \\pmod n$. Since $a-b$ is divisible by $n$, factor $a^2-b^2$ as $(a-b)(a+b)$.",
  },
  {
    id: "set-identity",
    title: "Distributive law for sets",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    pitfall: "Only proving one inclusion",
    text:
      "Prove $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$ by taking an element and doing both directions.",
  },
  {
    id: "combinatorics-handshake",
    title: "Handshake lemma",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intermediate",
    pitfall: "Counting each edge only once instead of at both endpoints",
    text:
      "In a finite graph, why does the sum of all vertex degrees equal twice the number of edges? I know each edge touches two vertices, but I want the clean proof.",
  },
];

export function getRandomExample(lastIndex?: number): {
  example: ProofExample;
  index: number;
} {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * EXAMPLES.length);
  } while (idx === lastIndex && EXAMPLES.length > 1);

  return { example: EXAMPLES[idx], index: idx };
}
