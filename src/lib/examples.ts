import { MathDomain, ProofType } from "@/types/proof";

export type ExampleDifficulty = "Intro" | "Intermediate" | "Advanced";
export type ExampleVerification = "sound" | "mixed" | "fragile";

export const EXAMPLE_VERIFICATION_LABELS: Record<ExampleVerification, string> = {
  sound: "Mostly Sound",
  mixed: "Needs Checks",
  fragile: "High Risk",
};

export interface ProofExample {
  id: string;
  title: string;
  topic: string;
  proofType: ProofType;
  mathDomain: MathDomain;
  difficulty: ExampleDifficulty;
  verification: ExampleVerification;
  pitfall: string;
  text: string;
}

const ANALYSIS_EXAMPLES: ProofExample[] = [
  {
    id: "analysis-harmonic",
    title: "Harmonic series diverges",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    verification: "mixed",
    pitfall: "Grouping terms without spelling out the lower bound",
    text:
      "I want to show that $1 + 1/2 + 1/3 + 1/4 + \\cdots$ diverges. The idea is to group the terms in blocks and compare each block to $1/2$.",
  },
  {
    id: "analysis-ivt",
    title: "Intermediate value crossing",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Invoking continuity informally instead of stating the theorem",
    text:
      "If a continuous function starts below zero at $a$ and ends above zero at $b$, then it should hit zero somewhere in between. Can you make that rigorous with the Intermediate Value Theorem?",
  },
  {
    id: "analysis-evt",
    title: "Maximum on a closed interval",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Claiming the supremum is attained without the compactness step",
    text:
      "If $f$ is continuous on $[a,b]$, I think it has to reach a maximum somewhere. Since $[a,b]$ is compact and $f$ is continuous, the image should also be compact.",
  },
  {
    id: "analysis-limit-sum",
    title: "Limit of a sum",
    topic: "Analysis",
    proofType: "epsilon_delta",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using the same epsilon twice without splitting it",
    text:
      "If $a_n \\to A$ and $b_n \\to B$, then I want to prove $a_n + b_n \\to A + B$. I was going to use $\\varepsilon/2$ for each piece and then apply the triangle inequality.",
  },
  {
    id: "analysis-bolzano-weierstrass",
    title: "Bounded sequence has a convergent subsequence",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "fragile",
    pitfall: "Citing the theorem as if it were already proved",
    text:
      "I remember that every bounded sequence in $\\mathbb{R}$ has a convergent subsequence, but I do not remember the proof. Can we turn that into a clean argument?",
  },
  {
    id: "analysis-mvt-constant",
    title: "Derivative zero implies constant",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using the Mean Value Theorem without specifying the interval",
    text:
      "Suppose $f'(x)=0$ for every $x$ in an interval. I think the Mean Value Theorem should force $f(x)=f(y)$ for any two points $x$ and $y$.",
  },
  {
    id: "analysis-monotone-convergence",
    title: "Bounded increasing sequence converges",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Skipping the supremum argument",
    text:
      "Let $(a_n)$ be increasing and bounded above. If I define $L=\\sup\\{a_n:n\\in\\mathbb{N}\\}$, I think that should be the limit, but I want the epsilon proof written carefully.",
  },
  {
    id: "analysis-diff-implies-cont",
    title: "Differentiable implies continuous",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Forgetting to rewrite the difference as a quotient times $x-a$",
    text:
      "If $f$ is differentiable at $a$, then it should be continuous at $a$. I know I am supposed to write $f(x)-f(a)$ in a way that uses the derivative limit.",
  },
  {
    id: "analysis-cauchy-r",
    title: "Cauchy sequences converge in $\\mathbb{R}$",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Confusing boundedness with convergence",
    text:
      "I want to prove every Cauchy sequence in $\\mathbb{R}$ converges. I know completeness is the key, but I am not sure how to organize the argument.",
  },
  {
    id: "analysis-squeeze-sinx",
    title: "Limit of $\\sin x / x$",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Using geometric inequalities without explaining where they come from",
    text:
      "Can we show $\\lim_{x\\to 0} \\sin x / x = 1$ by squeezing it between two easier expressions? I remember there is a geometry argument behind it.",
  },
  {
    id: "analysis-uniform-continuity-compact",
    title: "Continuous on compact implies uniformly continuous",
    topic: "Analysis",
    proofType: "contradiction",
    mathDomain: "analysis",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Not constructing the bad sequences clearly in the negation",
    text:
      "I think a continuous function on a compact set has to be uniformly continuous. If not, there should be sequences getting close together where the function values stay far apart.",
  },
  {
    id: "analysis-ftc-part1",
    title: "Derivative of an integral",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Passing from the difference quotient to $f(x)$ too quickly",
    text:
      "Let $F(x)=\\int_a^x f(t)\\,dt$ with $f$ continuous. I want to justify carefully why $F'(x)=f(x)$ using the definition of derivative.",
  },
  {
    id: "analysis-comparison-series",
    title: "Comparison with a $p$-series",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "fragile",
    pitfall: "Comparing terms in the wrong direction",
    text:
      "I want to prove $\\sum 1/(n^2+1)$ converges by comparing it to something simpler. I think $1/(n^2+1) \\leq 1/n^2$ should be useful.",
  },
  {
    id: "analysis-rolle",
    title: "Rolle's theorem application",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Forgetting the endpoint hypothesis $f(a)=f(b)$",
    text:
      "If a differentiable function has the same value at both ends of an interval, there should be some interior point where the derivative is zero. I want that written as a clean proof using Rolle's theorem.",
  },
  {
    id: "analysis-polynomial-continuity",
    title: "Polynomials are continuous",
    topic: "Analysis",
    proofType: "direct",
    mathDomain: "analysis",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Treating closure properties as obvious without naming them",
    text:
      "I want to show every polynomial is continuous. Since constants and the identity function are continuous, and sums and products of continuous functions are continuous, that should finish it.",
  },
];

const NUMBER_THEORY_EXAMPLES: ProofExample[] = [
  {
    id: "number-theory-largest-prime",
    title: "There is no largest prime",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Forgetting to explain why the new prime divisor is not on the list",
    text:
      "Suppose $p_1,\\dots,p_n$ are all the primes. Let $N=p_1\\cdots p_n+1$. None of the listed primes divide $N$, so there must be a prime factor not in the list.",
  },
  {
    id: "number-theory-sqrt2",
    title: "Irrationality of $\\sqrt{2}$",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Skipping the contradiction with lowest terms",
    text:
      "Assume $\\sqrt{2}=p/q$ in lowest terms. Then $2q^2=p^2$, so $p$ is even. Writing $p=2k$ makes $q$ even too, which contradicts lowest terms.",
  },
  {
    id: "number-theory-prime-divides-product",
    title: "Euclid's lemma",
    topic: "Number Theory",
    proofType: "direct",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using gcd facts without justifying them",
    text:
      "I want to prove that if a prime $p$ divides $ab$, then $p$ divides $a$ or $p$ divides $b$. I remember Bezout's identity is the standard tool if $p$ does not divide $a$.",
  },
  {
    id: "number-theory-even-square",
    title: "If $a^2$ is even then $a$ is even",
    topic: "Number Theory",
    proofType: "contrapositive",
    mathDomain: "number_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Choosing contradiction when contrapositive is cleaner",
    text:
      "To show that $a^2$ even implies $a$ even, I think the contrapositive is easier: if $a$ is odd then $a=2k+1$, so $a^2$ is odd.",
  },
  {
    id: "number-theory-gcd-shift",
    title: "Preserving gcd under addition",
    topic: "Number Theory",
    proofType: "algebraic",
    mathDomain: "number_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not proving divisibility in both directions",
    text:
      "I want to prove $\\gcd(a,b)=\\gcd(a,a+b)$. The common divisors of $a$ and $b$ should be exactly the common divisors of $a$ and $a+b$.",
  },
  {
    id: "number-theory-mod4-squares",
    title: "Squares mod 4",
    topic: "Number Theory",
    proofType: "cases",
    mathDomain: "number_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Checking only one parity case",
    text:
      "Every integer is either even or odd, so I think any square is congruent to $0$ or $1$ mod $4$. This feels like a short proof by cases.",
  },
  {
    id: "number-theory-n5-minus-n",
    title: "$n^5-n$ is divisible by 5",
    topic: "Number Theory",
    proofType: "algebraic",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Factoring incompletely",
    text:
      "I want to show $5$ divides $n^5-n$ for every integer $n$. It factors as $n(n^4-1)=n(n^2-1)(n^2+1)=n(n-1)(n+1)(n^2+1)$.",
  },
  {
    id: "number-theory-odd-square-mod8",
    title: "Odd squares are 1 mod 8",
    topic: "Number Theory",
    proofType: "algebraic",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Expanding without simplifying cleanly",
    text:
      "If $n$ is odd then $n=2k+1$. Squaring gives $n^2=4k(k+1)+1$, and one of $k$ or $k+1$ is even, so I think this shows $n^2\\equiv 1 \\pmod 8$.",
  },
  {
    id: "number-theory-cuberoot2",
    title: "Irrationality of $\\sqrt[3]{2}$",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using prime exponents informally",
    text:
      "Can we prove $\\sqrt[3]{2}$ is irrational? If $\\sqrt[3]{2}=p/q$ in lowest terms, then $p^3=2q^3$, so the exponent of $2$ in the prime factorization seems wrong on both sides.",
  },
  {
    id: "number-theory-composite-prime-divisor",
    title: "Every composite number has a prime divisor",
    topic: "Number Theory",
    proofType: "induction",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using a smaller factor without checking it exceeds 1",
    text:
      "I think every composite integer has a prime divisor. Induction on the integer should work because a composite number factors into smaller positive integers.",
  },
  {
    id: "number-theory-fundamental-theorem",
    title: "Existence of prime factorization",
    topic: "Number Theory",
    proofType: "induction",
    mathDomain: "number_theory",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Not separating the prime and composite cases",
    text:
      "I want to show every integer greater than 1 can be written as a product of primes. If the number is not prime, I can factor it into smaller integers and use induction.",
  },
  {
    id: "number-theory-infinite-4n3-primes",
    title: "Infinitely many primes congruent to 3 mod 4",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Advanced",
    verification: "fragile",
    pitfall: "Not tracking the congruence of the constructed number carefully",
    text:
      "I heard there is a Euclid-style proof that there are infinitely many primes congruent to $3$ mod $4$. I think you multiply a finite list and look at $4p_1\\cdots p_n-1$.",
  },
  {
    id: "number-theory-modular-inverse-prime",
    title: "Nonzero classes mod $p$ have inverses",
    topic: "Number Theory",
    proofType: "contradiction",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Assuming cancellation mod $p$ before it is justified",
    text:
      "If $p$ is prime and $a \\not\\equiv 0 \\pmod p$, I think $a$ should have a multiplicative inverse mod $p$. Maybe look at the residues $a,2a,\\dots,(p-1)a$ mod $p$.",
  },
  {
    id: "number-theory-divisibility-11",
    title: "Difference of alternating sums test",
    topic: "Number Theory",
    proofType: "algebraic",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "fragile",
    pitfall: "Using decimal notation without converting it into powers of 10",
    text:
      "I want a proof of the divisibility test for $11$. Since $10\\equiv -1 \\pmod{11}$, it seems like the decimal expansion should turn into an alternating sum of digits.",
  },
  {
    id: "number-theory-prime-divides-square",
    title: "Prime divides a square implies it divides the base",
    topic: "Number Theory",
    proofType: "direct",
    mathDomain: "number_theory",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using Euclid's lemma without stating it",
    text:
      "If a prime $p$ divides $a^2$, then I think $p$ must divide $a$. Since $a^2=a\\cdot a$, this should follow from the prime dividing a product result.",
  },
];

const ALGEBRA_EXAMPLES: ProofExample[] = [
  {
    id: "algebra-0999",
    title: "$0.999\\ldots = 1$",
    topic: "Algebra",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Relying on intuition instead of a legal algebraic step",
    text:
      "Let $x=0.999\\ldots$. Then $10x=9.999\\ldots$, so subtracting gives $9x=9$ and hence $x=1$. I want that written in a clean way.",
  },
  {
    id: "algebra-difference-squares",
    title: "Congruence of squares",
    topic: "Algebra / Number Theory",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Skipping the factorization step",
    text:
      "Show that if $a\\equiv b\\pmod n$, then $a^2\\equiv b^2\\pmod n$. I know the key factorization is $a^2-b^2=(a-b)(a+b)$.",
  },
  {
    id: "algebra-group-identity-unique",
    title: "Identity element is unique",
    topic: "Abstract Algebra",
    proofType: "uniqueness",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Applying the left and right identity laws in the wrong order",
    text:
      "If a group had two identity elements $e$ and $e'$, I think we can show they are equal by computing $ee'$ in two different ways.",
  },
  {
    id: "algebra-group-inverse-unique",
    title: "Inverse is unique",
    topic: "Abstract Algebra",
    proofType: "uniqueness",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not chaining the equalities clearly",
    text:
      "Suppose $b$ and $c$ are both inverses of $a$ in a group. I want the standard proof that $b=c$ by inserting the identity carefully.",
  },
  {
    id: "algebra-cancellation-group",
    title: "Cancellation law in a group",
    topic: "Abstract Algebra",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Cancelling without multiplying by the inverse explicitly",
    text:
      "If $ab=ac$ in a group, then $b=c$. I think multiplying both sides on the left by $a^{-1}$ is the whole proof, but I want it made explicit.",
  },
  {
    id: "algebra-kernel-subgroup",
    title: "Kernel is a subgroup",
    topic: "Abstract Algebra",
    proofType: "direct",
    mathDomain: "algebra",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Checking closure but forgetting inverses",
    text:
      "For a homomorphism $\\varphi:G\\to H$, I want to prove that $\\ker\\varphi$ is a subgroup of $G$. I think the subgroup test should be the easiest route.",
  },
  {
    id: "algebra-triangular-determinant",
    title: "Determinant of a triangular matrix",
    topic: "Linear Algebra",
    proofType: "direct",
    mathDomain: "algebra",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using cofactor expansion without a clear induction pattern",
    text:
      "I want to prove the determinant of an upper triangular matrix is the product of the diagonal entries. It seems natural to expand along the first column and use induction.",
  },
  {
    id: "algebra-nilpotent-not-invertible",
    title: "Nilpotent matrices are not invertible",
    topic: "Linear Algebra",
    proofType: "contradiction",
    mathDomain: "algebra",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Multiplying by the inverse too late",
    text:
      "If $A^k=0$ for some positive integer $k$, I think $A$ cannot be invertible. Otherwise multiplying by $A^{-k}$ would force the identity matrix to equal zero.",
  },
  {
    id: "algebra-even-polynomials",
    title: "Sum of even polynomials is even",
    topic: "Algebra",
    proofType: "algebraic",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Checking only one of the two summands",
    text:
      "If $p(-x)=p(x)$ and $q(-x)=q(x)$ for all $x$, then I want to show $(p+q)(-x)=(p+q)(x)$. This should be just substitution and simplification.",
  },
  {
    id: "algebra-idempotent-eigenvalues",
    title: "Eigenvalues of an idempotent matrix",
    topic: "Linear Algebra",
    proofType: "direct",
    mathDomain: "algebra",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Not applying the matrix equation to an eigenvector",
    text:
      "If $A^2=A$ and $Av=\\lambda v$ for a nonzero vector $v$, I think the eigenvalue must satisfy $\\lambda^2=\\lambda$, so only $0$ or $1$ are possible.",
  },
  {
    id: "algebra-integral-domain-zero-product",
    title: "Zero-product property in an integral domain",
    topic: "Abstract Algebra",
    proofType: "contradiction",
    mathDomain: "algebra",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using cancellation without noting one factor is nonzero",
    text:
      "In an integral domain, if $ab=0$, then one factor should be zero. I want to phrase that as a contradiction starting from $a\\neq 0$ and $b\\neq 0$.",
  },
  {
    id: "algebra-subspace-intersection",
    title: "Intersection of subspaces",
    topic: "Linear Algebra",
    proofType: "direct",
    mathDomain: "algebra",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Checking closure under addition but not scalar multiplication",
    text:
      "If $U$ and $W$ are subspaces of a vector space, I think $U\\cap W$ is also a subspace. This looks like a straightforward verification of the subspace test.",
  },
];

const COMBINATORICS_EXAMPLES: ProofExample[] = [
  {
    id: "comb-handshake",
    title: "Handshake lemma",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Counting each edge only once instead of at both endpoints",
    text:
      "In a finite graph, why is the sum of the vertex degrees equal to twice the number of edges? I know each edge contributes to two vertices, but I want the clean proof.",
  },
  {
    id: "comb-pigeonhole-months",
    title: "Two birthdays in the same month",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not identifying the pigeons and holes explicitly",
    text:
      "If 13 people are in a room, then at least two should have birthdays in the same month. This looks like a direct use of the pigeonhole principle.",
  },
  {
    id: "comb-committee-double-count",
    title: "Count a committee two ways",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Counting two different objects by accident",
    text:
      "I want a combinatorial proof of $k\\binom{n}{k}=n\\binom{n-1}{k-1}$ by counting committees of size $k$ together with a distinguished chairperson.",
  },
  {
    id: "comb-vandermonde",
    title: "Vandermonde's identity",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Not explaining what the summation index counts",
    text:
      "Can we prove $\\binom{m+n}{r}=\\sum_{k=0}^r \\binom{m}{k}\\binom{n}{r-k}$ by splitting the choice of an $r$-element subset according to how many elements come from the first block?",
  },
  {
    id: "comb-binomial-coefficient",
    title: "Coefficient in the binomial theorem",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not linking terms in the expansion to selections",
    text:
      "Why is the coefficient of $x^k y^{n-k}$ in $(x+y)^n$ equal to $\\binom{n}{k}$? I think it counts the places where you pick $x$ out of the $n$ factors.",
  },
  {
    id: "comb-subsets-power-set",
    title: "A set with $n$ elements has $2^n$ subsets",
    topic: "Combinatorics",
    proofType: "induction",
    mathDomain: "combinatorics",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Adding the new element without splitting cases",
    text:
      "I want to prove by induction that an $n$-element set has $2^n$ subsets. When you add one new element, each old subset either keeps it out or includes it.",
  },
  {
    id: "comb-odd-degree-vertices",
    title: "Graphs have an even number of odd-degree vertices",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Forgetting to connect parity of the total degree sum to parity of the odd terms",
    text:
      "The sum of all vertex degrees is even, so I think the number of odd-degree vertices must also be even. I want that parity argument written carefully.",
  },
  {
    id: "comb-derangements",
    title: "Derangement recurrence",
    topic: "Combinatorics",
    proofType: "cases",
    mathDomain: "combinatorics",
    difficulty: "Advanced",
    verification: "fragile",
    pitfall: "Splitting cases without showing they cover everything",
    text:
      "I want to derive the recurrence for derangements by looking at where element 1 goes. It feels like there should be two cases depending on whether a 2-cycle appears.",
  },
  {
    id: "comb-stars-bars",
    title: "Stars and bars count",
    topic: "Combinatorics",
    proofType: "construction",
    mathDomain: "combinatorics",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not justifying the bijection between strings and allocations",
    text:
      "How many ways can I distribute 8 identical cookies to 3 children? I think stars and bars turns this into arranging stars and separators in a row.",
  },
  {
    id: "comb-catalan-parentheses",
    title: "Balanced parentheses count",
    topic: "Combinatorics",
    proofType: "combinatorial",
    mathDomain: "combinatorics",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Referring to Catalan numbers without defining the counted objects",
    text:
      "I know Catalan numbers count balanced parenthesis strings, but I want a cleaner explanation of why the objects line up with the recursive counting idea.",
  },
];

const DISCRETE_EXAMPLES: ProofExample[] = [
  {
    id: "discrete-sum-integers",
    title: "Sum of the first $n$ integers",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Forgetting to separate the base case and inductive step",
    text:
      "Prove by induction that $1+2+\\cdots+n=n(n+1)/2$. Base case $n=1$ is clear, and the inductive step is to add $k+1$.",
  },
  {
    id: "discrete-power-two-bound",
    title: "$2^n \\geq n+1$",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Using the inductive hypothesis but not simplifying the new inequality",
    text:
      "I want to show $2^n\\geq n+1$ for all $n\\geq 0$ by induction. If it is true for $k$, then $2^{k+1}=2\\cdot 2^k$ should be at least $2(k+1)$.",
  },
  {
    id: "discrete-trees-edges",
    title: "A tree with $n$ vertices has $n-1$ edges",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Removing a vertex without preserving the tree structure in the argument",
    text:
      "I think every finite tree with $n$ vertices has exactly $n-1$ edges. Induction by deleting a leaf seems right, but I need help making that precise.",
  },
  {
    id: "discrete-fibonacci-bound",
    title: "A Fibonacci inequality",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using only one previous term when the recurrence has two",
    text:
      "Can we prove by induction that the Fibonacci numbers satisfy $F_n \\leq 2^n$ for all $n\\geq 0$? I know the recurrence should make the inductive step easy.",
  },
  {
    id: "discrete-even-plus-even",
    title: "Sum of two even integers",
    topic: "Discrete Math",
    proofType: "direct",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not unpacking the definition of even",
    text:
      "If $a$ and $b$ are even integers, then $a+b$ should also be even. This looks like a direct proof from the definition.",
  },
  {
    id: "discrete-contrapositive-odd",
    title: "If $n^2$ is odd then $n$ is odd",
    topic: "Discrete Math",
    proofType: "contrapositive",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Using contradiction when contrapositive is shorter",
    text:
      "I want to prove that if $n^2$ is odd, then $n$ is odd. The contrapositive seems easier: if $n$ is even, then $n^2$ is even.",
  },
  {
    id: "discrete-bitstrings-subsets",
    title: "Bitstrings correspond to subsets",
    topic: "Discrete Math",
    proofType: "construction",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Describing the correspondence only one way",
    text:
      "I think subsets of an $n$-element set correspond exactly to binary strings of length $n$ by recording whether each element is in or out.",
  },
  {
    id: "discrete-graph-max-edges",
    title: "Maximum edges in a simple graph",
    topic: "Discrete Math",
    proofType: "direct",
    mathDomain: "discrete_math",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Counting ordered pairs instead of unordered pairs",
    text:
      "A simple graph on $n$ vertices should have at most $n(n-1)/2$ edges, because every edge is determined by choosing two distinct vertices.",
  },
  {
    id: "discrete-geometric-series",
    title: "Closed form for a geometric series",
    topic: "Discrete Math",
    proofType: "algebraic",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Cancelling terms without lining up the two sums",
    text:
      "I want to prove $1+r+r^2+\\cdots+r^n=(r^{n+1}-1)/(r-1)$ for $r\\neq 1$. The standard trick is to multiply by $r$ and subtract.",
  },
  {
    id: "discrete-absolute-value-cases",
    title: "Solve an absolute value equation",
    topic: "Discrete Math / Algebra",
    proofType: "cases",
    mathDomain: "discrete_math",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Forgetting the sign conditions in each case",
    text:
      "How do I prove all solutions of $|x-3|=5$? I think I need two cases, one where $x-3=5$ and one where $x-3=-5$.",
  },
  {
    id: "discrete-finite-union-finite",
    title: "Finite union of finite sets is finite",
    topic: "Discrete Math",
    proofType: "induction",
    mathDomain: "discrete_math",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using induction without defining what the parameter is",
    text:
      "I want to prove that a finite union of finite sets is finite. Induction on the number of sets seems natural, with the two-set case as the base.",
  },
  {
    id: "discrete-divisibility-digit-sum",
    title: "Divisibility by 3 via digit sums",
    topic: "Discrete Math / Number Theory",
    proofType: "algebraic",
    mathDomain: "discrete_math",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using decimal notation informally",
    text:
      "I want to show an integer is divisible by $3$ exactly when the sum of its digits is divisible by $3$. Since $10\\equiv 1 \\pmod 3$, I think the decimal expansion should collapse nicely.",
  },
];

const SET_THEORY_EXAMPLES: ProofExample[] = [
  {
    id: "set-distributive-law",
    title: "Distributive law for sets",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Proving only one inclusion",
    text:
      "Prove $A\\cap(B\\cup C)=(A\\cap B)\\cup(A\\cap C)$ by taking an arbitrary element and doing both directions.",
  },
  {
    id: "set-de-morgan",
    title: "De Morgan's law",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Swapping union and intersection in only one direction",
    text:
      "I want to show $(A\\cup B)^c=A^c\\cap B^c$. This should follow by chasing what it means for an element to belong or not belong to each set.",
  },
  {
    id: "set-subset-transitive",
    title: "Transitivity of subset",
    topic: "Set Theory",
    proofType: "direct",
    mathDomain: "set_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Treating it as obvious without using an arbitrary element",
    text:
      "If $A\\subseteq B$ and $B\\subseteq C$, then I want to prove $A\\subseteq C$ directly by starting with $x\\in A$.",
  },
  {
    id: "set-power-intersection",
    title: "Power set of an intersection",
    topic: "Set Theory",
    proofType: "direct",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Confusing elements of a power set with elements of the underlying set",
    text:
      "I think $\\mathcal{P}(A\\cap B)\\subseteq \\mathcal{P}(A)\\cap \\mathcal{P}(B)$ should be true. If $X\\subseteq A\\cap B$, then $X$ ought to be a subset of each.",
  },
  {
    id: "set-difference-union",
    title: "Set difference over a union",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Dropping complements too early",
    text:
      "I want to prove $A\\setminus(B\\cup C)=(A\\setminus B)\\cap(A\\setminus C)$. It feels like De Morgan's law should appear after rewriting set difference with complements.",
  },
  {
    id: "set-bijection-def",
    title: "Bijective means injective and surjective",
    topic: "Set Theory",
    proofType: "direct",
    mathDomain: "set_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Mixing up the directions of the definitions",
    text:
      "I want a clean explanation that a function is bijective exactly when it is both injective and surjective. This should mostly be unpacking definitions.",
  },
  {
    id: "set-empty-union",
    title: "Union with the empty set",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Skipping one of the two inclusions because it looks obvious",
    text:
      "Prove $A\\cup\\varnothing=A$. I know no element comes from the empty set, but I want the proof written the standard way.",
  },
  {
    id: "set-product-intersection",
    title: "Cartesian product and intersection",
    topic: "Set Theory",
    proofType: "set_identity",
    mathDomain: "set_theory",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Not unpacking ordered pairs carefully",
    text:
      "I think $(A\\cap B)\\times C=(A\\times C)\\cap(B\\times C)$. This should come from checking what it means for an ordered pair to belong to each side.",
  },
  {
    id: "set-double-inclusion",
    title: "Equality by double inclusion",
    topic: "Set Theory",
    proofType: "direct",
    mathDomain: "set_theory",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Using equality before both subset directions are proved",
    text:
      "I want a template proof that if $A\\subseteq B$ and $B\\subseteq A$, then $A=B$. This is the standard double inclusion principle.",
  },
  {
    id: "set-image-union",
    title: "Image of a union",
    topic: "Set Theory",
    proofType: "direct",
    mathDomain: "set_theory",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Switching preimages and images accidentally",
    text:
      "For a function $f$, I want to prove $f(A\\cup B)=f(A)\\cup f(B)$. Taking an element in the image of the union should split into two cases.",
  },
];

const TOPOLOGY_EXAMPLES: ProofExample[] = [
  {
    id: "topology-preimage-open",
    title: "Preimage of an open set is open",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Using epsilon language without naming the topology definition",
    text:
      "If $f:X\\to Y$ is continuous and $U\\subseteq Y$ is open, then I want to prove $f^{-1}(U)$ is open in $X$. I know this is basically the definition, but I want it written cleanly.",
  },
  {
    id: "topology-finite-intersection-open",
    title: "Finite intersections of open sets are open",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Assuming arbitrary intersections also stay open",
    text:
      "I want to show the intersection of two open sets is open. If a point lies in both, then each set gives a neighborhood around it, and their intersection should still be open.",
  },
  {
    id: "topology-arbitrary-union-open",
    title: "Arbitrary unions of open sets are open",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Trying to use a finite argument for an arbitrary union",
    text:
      "If $x$ is in the union of a family of open sets, then it belongs to one particular open set in the family, and that should already give the needed neighborhood.",
  },
  {
    id: "topology-compact-hausdorff-closed",
    title: "Compact subsets of Hausdorff spaces are closed",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Covering the compact set without first separating a point outside it",
    text:
      "I want to prove that a compact subset of a Hausdorff space is closed. The idea should be to take a point outside the compact set and separate it from every point inside by disjoint neighborhoods.",
  },
  {
    id: "topology-continuous-image-compact",
    title: "Continuous image of a compact set",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Pushing an open cover forward instead of pulling it back",
    text:
      "If $f:X\\to Y$ is continuous and $K\\subseteq X$ is compact, I think $f(K)$ should be compact because every open cover of $f(K)$ pulls back to an open cover of $K$.",
  },
  {
    id: "topology-heine-borel-interval",
    title: "Closed intervals are compact",
    topic: "Topology / Analysis",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Advanced",
    verification: "fragile",
    pitfall: "Using Heine-Borel as if it were already established",
    text:
      "I want a proof that $[a,b]$ is compact. I know Heine-Borel says closed and bounded subsets of $\\mathbb{R}$ are compact, but I am not sure how to prove the interval case from scratch.",
  },
  {
    id: "topology-closure-limit-points",
    title: "Closure contains all limit points",
    topic: "Topology",
    proofType: "direct",
    mathDomain: "topology",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Confusing points of the set with limit points of the set",
    text:
      "If $x$ is a limit point of $A$, then every neighborhood of $x$ meets $A$, so I think that should imply $x\\in \\overline{A}$ directly from the definition of closure.",
  },
  {
    id: "topology-interval-connected",
    title: "Intervals are connected",
    topic: "Topology",
    proofType: "contradiction",
    mathDomain: "topology",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Not using order properties of the real line strongly enough",
    text:
      "I want to show an interval in $\\mathbb{R}$ is connected. A contradiction proof should start by assuming it is split into two nonempty separated open pieces and then using a supremum.",
  },
];

const GEOMETRY_EXAMPLES: ProofExample[] = [
  {
    id: "geometry-triangle-angle-sum",
    title: "Angle sum in a triangle",
    topic: "Geometry",
    proofType: "direct",
    mathDomain: "geometry",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Using parallel lines without naming the angle relationships",
    text:
      "I want the standard proof that the interior angles of a Euclidean triangle add up to $180^\\circ$. I know you draw a line through one vertex parallel to the opposite side.",
  },
  {
    id: "geometry-centroid-medians",
    title: "Medians meet at a point",
    topic: "Geometry",
    proofType: "construction",
    mathDomain: "geometry",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Constructing coordinates but not using them consistently",
    text:
      "I think the three medians of a triangle are concurrent. A coordinate proof seems easiest if I place the triangle at convenient points.",
  },
  {
    id: "geometry-perpendicular-bisector",
    title: "Perpendicular bisector characterization",
    topic: "Geometry",
    proofType: "direct",
    mathDomain: "geometry",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using congruent triangles without naming the theorem",
    text:
      "A point on the perpendicular bisector of a segment should be equidistant from the endpoints. This looks like a two-triangle congruence argument.",
  },
  {
    id: "geometry-isosceles-base-angles",
    title: "Base angles in an isosceles triangle",
    topic: "Geometry",
    proofType: "direct",
    mathDomain: "geometry",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Assuming the conclusion in the diagram",
    text:
      "In an isosceles triangle, the base angles are equal. I think the standard proof drops an altitude from the apex and then uses congruent triangles.",
  },
  {
    id: "geometry-cyclic-quadrilateral",
    title: "Opposite angles in a cyclic quadrilateral",
    topic: "Geometry",
    proofType: "direct",
    mathDomain: "geometry",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Invoking arc facts without saying which theorem is used",
    text:
      "I want to show opposite angles in a cyclic quadrilateral are supplementary. The inscribed angle theorem should translate each angle into half an arc measure.",
  },
  {
    id: "geometry-parallelogram-diagonals",
    title: "Diagonals of a parallelogram bisect each other",
    topic: "Geometry",
    proofType: "direct",
    mathDomain: "geometry",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using parallel lines but not identifying the equal angles",
    text:
      "If I draw both diagonals of a parallelogram, I think they cut each other in half. It seems like opposite sides being parallel should give congruent triangles.",
  },
  {
    id: "geometry-pythagorean-converse",
    title: "Converse of the Pythagorean theorem",
    topic: "Geometry",
    proofType: "contradiction",
    mathDomain: "geometry",
    difficulty: "Advanced",
    verification: "fragile",
    pitfall: "Assuming the side lengths already determine the angle without a construction",
    text:
      "I want to prove that if a triangle has side lengths satisfying $a^2+b^2=c^2$, then the angle opposite $c$ is right. I think a contradiction or comparison triangle argument should work.",
  },
  {
    id: "geometry-dilation-area",
    title: "Area under dilation",
    topic: "Geometry",
    proofType: "algebraic",
    mathDomain: "geometry",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Scaling lengths correctly but forgetting area uses two dimensions",
    text:
      "If every length in a figure is multiplied by $k$, I think the area gets multiplied by $k^2$. I want a clean proof based on rectangles or triangulation.",
  },
];

const GENERAL_EXAMPLES: ProofExample[] = [
  {
    id: "general-limit-unique",
    title: "Limits are unique",
    topic: "General Proofs",
    proofType: "direct",
    mathDomain: "general",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Using two different epsilons instead of comparing both limits to the same one",
    text:
      "I want to prove a sequence cannot converge to two different limits. The idea should be to assume it converges to $L$ and $M$ and then use $\\varepsilon=|L-M|/3$.",
  },
  {
    id: "general-identity-unique",
    title: "Identity element uniqueness in a structure",
    topic: "General Proofs",
    proofType: "uniqueness",
    mathDomain: "general",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Not using the defining property of both candidates",
    text:
      "Whenever a binary operation has an identity element, I think it must be unique. The proof should be just a short chain of equalities using two supposed identities.",
  },
  {
    id: "general-absolute-value-cases",
    title: "Triangle inequality by cases",
    topic: "General Proofs",
    proofType: "cases",
    mathDomain: "general",
    difficulty: "Intermediate",
    verification: "mixed",
    pitfall: "Not covering all sign patterns",
    text:
      "Can we prove $|x+y|\\leq |x|+|y|$ by splitting into sign cases for $x$ and $y$? I know there are several cases, and I want them organized carefully.",
  },
  {
    id: "general-construction-irrational",
    title: "Construct irrational numbers with rational product",
    topic: "General Proofs",
    proofType: "construction",
    mathDomain: "general",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Leaving the construction conditional without resolving both cases",
    text:
      "I want to show there exist irrational numbers $a$ and $b$ such that $a^b$ is rational. I remember the proof starts with $\\sqrt{2}^{\\sqrt{2}}$ and then splits into two cases.",
  },
  {
    id: "general-finite-set-max",
    title: "A finite nonempty set of reals has a maximum",
    topic: "General Proofs",
    proofType: "induction",
    mathDomain: "general",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Skipping the induction step when adding one element",
    text:
      "I think every finite nonempty set of real numbers has a largest element. Induction on the number of elements feels natural here.",
  },
  {
    id: "general-rational-root-contrapositive",
    title: "Rational root divisibility condition",
    topic: "General Proofs",
    proofType: "contrapositive",
    mathDomain: "general",
    difficulty: "Advanced",
    verification: "fragile",
    pitfall: "Using the conclusion of the rational root theorem before proving the divisibility claims",
    text:
      "If $p/q$ in lowest terms is a rational root of an integer polynomial, then I think the numerator and denominator must divide the constant and leading coefficients in a very specific way.",
  },
  {
    id: "general-sum-k-binomial",
    title: "A weighted binomial identity",
    topic: "General Proofs",
    proofType: "combinatorial",
    mathDomain: "general",
    difficulty: "Advanced",
    verification: "mixed",
    pitfall: "Counting different distinguished objects on the two sides",
    text:
      "I want a proof of $\\sum_{k=0}^n k\\binom{n}{k}=n2^{n-1}$ by counting subsets together with one marked element.",
  },
  {
    id: "general-epsilon-delta-square",
    title: "Limit of $x^2$ at 2",
    topic: "General Proofs",
    proofType: "epsilon_delta",
    mathDomain: "general",
    difficulty: "Intermediate",
    verification: "sound",
    pitfall: "Choosing $\\delta=\\varepsilon$ without controlling $|x+2|$",
    text:
      "I want to prove $\\lim_{x\\to 2} x^2 = 4$ directly. The hard part seems to be controlling $|x^2-4|=|x-2||x+2|$ by making sure $x$ stays near 2.",
  },
  {
    id: "general-sqrt3-irrational",
    title: "Irrationality of $\\sqrt{3}$",
    topic: "General Proofs",
    proofType: "contradiction",
    mathDomain: "general",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Copying the $\\sqrt{2}$ proof without checking the divisibility step",
    text:
      "Can we prove $\\sqrt{3}$ is irrational by contradiction? If $\\sqrt{3}=p/q$ in lowest terms, then $3q^2=p^2$, so divisibility by 3 should force both $p$ and $q$ to be multiples of 3.",
  },
  {
    id: "general-inverse-image-inclusion",
    title: "Inverse image preserves inclusion",
    topic: "General Proofs",
    proofType: "direct",
    mathDomain: "general",
    difficulty: "Intro",
    verification: "sound",
    pitfall: "Mixing up membership in the codomain and domain",
    text:
      "If $A\\subseteq B$ in the codomain of a function $f$, then I think $f^{-1}(A)\\subseteq f^{-1}(B)$ should be a direct one-line element chase.",
  },
];

export const EXAMPLES: ProofExample[] = [
  ...ANALYSIS_EXAMPLES,
  ...NUMBER_THEORY_EXAMPLES,
  ...ALGEBRA_EXAMPLES,
  ...COMBINATORICS_EXAMPLES,
  ...DISCRETE_EXAMPLES,
  ...SET_THEORY_EXAMPLES,
  ...TOPOLOGY_EXAMPLES,
  ...GEOMETRY_EXAMPLES,
  ...GENERAL_EXAMPLES,
];

export const EXAMPLE_COUNT = EXAMPLES.length;

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
