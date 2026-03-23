import type { MathDomain, ProofType } from "@/types/proof";

export interface ExampleEntry {
  /** Sketch text (may include $...$ LaTeX) */
  text: string;
  topic: string;
  proofType: ProofType;
  domain: MathDomain;
  difficulty: "intro" | "intermediate" | "stretch";
  pitfall: string;
}

const D = (x: ExampleEntry) => x;

export const EXAMPLE_LIBRARY: ExampleEntry[] = [
  D({
    text: `Prove by induction that $\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$ for all $n \\in \\mathbb{N}$. Base: $n=1$ gives $1 = 1$. Step: assume true for $k$, add $(k+1)$ to both sides and simplify.`,
    topic: "Discrete math — arithmetic series",
    proofType: "induction",
    domain: "discrete_math",
    difficulty: "intro",
    pitfall: "Forgetting to state the inductive hypothesis explicitly or algebra errors in the $k \\to k+1$ step.",
  }),
  D({
    text: `Show that if $a \\mid b$ and $b \\mid c$ then $a \\mid c$. We have $b = ka$ and $c = \\ell b$, so $c = \\ell k a$, hence $a \\mid c$.`,
    topic: "Number theory — divisibility",
    proofType: "direct",
    domain: "number_theory",
    difficulty: "intro",
    pitfall: "Not defining what integers $k,\\ell$ are or confusing divisibility with inequality.",
  }),
  D({
    text: `Prove $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$. Take $x$ in the left side, then $x \\in A$ and $x \\in B$ or $x \\in C$, so $x$ is in one of $A\\cap B$ or $A\\cap C$. Reverse inclusion similar.`,
    topic: "Set theory — distributive law",
    proofType: "set_identity",
    domain: "set_theory",
    difficulty: "intro",
    pitfall: "Mixing up $\\cup$ and $\\cap$ or only proving one inclusion.",
  }),
  D({
    text: `If $n^2$ is even, then $n$ is even. Prove the contrapositive: if $n$ is odd, write $n=2k+1$, expand $n^2$ and show it is odd.`,
    topic: "Number theory — contrapositive",
    proofType: "contrapositive",
    domain: "number_theory",
    difficulty: "intermediate",
    pitfall: "Attempting to argue from $n^2$ even without using parity or prime factorization cleanly.",
  }),
  D({
    text: `Prove $\\sqrt{2}$ is irrational. Assume $\\sqrt{2}=p/q$ in lowest terms, square to get $2q^2=p^2$, deduce $p,q$ even — contradiction.`,
    topic: "Number theory — classic contradiction",
    proofType: "contradiction",
    domain: "number_theory",
    difficulty: "intermediate",
    pitfall: "Skipping why $p^2$ even implies $p$ even, or forgetting the 'lowest terms' setup.",
  }),
  D({
    text: `If $a_n \\to A$ and $b_n \\to B$, prove $a_n + b_n \\to A+B$. Given $\\varepsilon>0$, choose $N_1,N_2$ for each sequence with $\\varepsilon/2$, then use triangle inequality for $n \\geq \\max(N_1,N_2)$.`,
    topic: "Real analysis — limit of a sum",
    proofType: "epsilon_delta",
    domain: "analysis",
    difficulty: "intermediate",
    pitfall: "Using the same $N$ for both sequences without justification or choosing $\\varepsilon$ too late.",
  }),
  D({
    text: `How many subsets does an $n$-element set have? Each element is in or out — $2$ choices per element, multiply to get $2^n$ by the multiplication principle.`,
    topic: "Combinatorics — counting subsets",
    proofType: "combinatorial",
    domain: "combinatorics",
    difficulty: "intro",
    pitfall: "Confusing subsets with ordered tuples or adding instead of multiplying independent choices.",
  }),
  D({
    text: `Show that if $|G|=p$ for prime $p$, then $G$ is cyclic. Pick $g\\neq e$; the order of $g$ divides $p$, so it is $p$, hence $\\langle g\\rangle=G$.`,
    topic: "Abstract algebra — cyclic group of prime order",
    proofType: "direct",
    domain: "algebra",
    difficulty: "stretch",
    pitfall: "Assuming Cauchy's theorem without stating it, or confusing order of an element with $|G|$.",
  }),
  D({
    text: `Prove that a continuous $f:[a,b]\\to\\mathbb{R}$ is bounded. If unbounded, pick $x_n$ with $|f(x_n)|>n$; by Bolzano–Weierstrass extract $x_{n_k}\\to x\\in[a,b]$; continuity gives a contradiction.`,
    topic: "Analysis — continuous on compact interval",
    proofType: "contradiction",
    domain: "analysis",
    difficulty: "stretch",
    pitfall: "Hand-waving compactness without extracting a convergent subsequence in $[a,b]$.",
  }),
  D({
    text: `Expand $(x+y)^3$ using the binomial theorem: $\\sum_{k=0}^3 \\binom{3}{k} x^{3-k}y^k$.`,
    topic: "Algebra — binomial expansion",
    proofType: "algebraic",
    domain: "algebra",
    difficulty: "intro",
    pitfall: "Arithmetic mistakes in coefficients or dropping cross terms.",
  }),
  D({
    text: `A function $f:X\\to Y$ is continuous iff $f^{-1}(U)$ is open for every open $U\\subseteq Y$. Use this to show the preimage of a closed set is closed.`,
    topic: "Topology — continuity and closed sets",
    proofType: "direct",
    domain: "topology",
    difficulty: "intermediate",
    pitfall: "Confusing preimage with image, or forgetting complements swap open/closed.",
  }),
  D({
    text: `Show there are infinitely many primes. Assume finitely many $p_1,\\ldots,p_n$; consider $N=p_1\\cdots p_n+1$; a prime factor of $N$ is not in the list.`,
    topic: "Number theory — Euclid's argument",
    proofType: "contradiction",
    domain: "number_theory",
    difficulty: "intro",
    pitfall: "Claiming $N$ itself is prime — it need only have a prime factor not in the list.",
  }),
  D({
    text: `Prove every positive integer $n\\geq 2$ has a prime factor. Either $n$ is prime or $n=ab$ with $a,b<n$; induct on $n$ or use well-ordering of a minimal counterexample.`,
    topic: "Number theory — existence of prime factor",
    proofType: "induction",
    domain: "number_theory",
    difficulty: "intermediate",
    pitfall: "Weak induction without a strong enough hypothesis for composite $n$.",
  }),
  D({
    text: `If $f'(x)=0$ for all $x\\in(a,b)$, then $f$ is constant on $(a,b)$. By MVT, $f(x)-f(y)=f'(c)(x-y)=0$ for any $x,y$.`,
    topic: "Real analysis — zero derivative",
    proofType: "direct",
    domain: "analysis",
    difficulty: "intermediate",
    pitfall: "Assuming $f$ is constant without citing differentiability on the whole interval.",
  }),
];

export function getRandomExample(lastIndex?: number): {
  text: string;
  index: number;
  meta: ExampleEntry;
} {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * EXAMPLE_LIBRARY.length);
  } while (idx === lastIndex && EXAMPLE_LIBRARY.length > 1);
  const meta = EXAMPLE_LIBRARY[idx];
  return { text: meta.text, index: idx, meta };
}
