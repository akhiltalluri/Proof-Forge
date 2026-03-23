export interface LibraryEntry {
  id: string;
  name: string;
  type: "axiom" | "definition" | "lemma" | "proposition" | "theorem" | "law" | "corollary";
  branch: string;
  statement: string;
  notes?: string;
}

export const BRANCH_LIST = [
  "Set Theory / Logic",
  "Real Analysis",
  "Abstract Algebra",
  "Linear Algebra",
  "Topology",
  "Number Theory",
  "Combinatorics",
  "Probability",
  "Complex Analysis",
  "Differential Equations",
] as const;

export type Branch = (typeof BRANCH_LIST)[number];

export const TYPE_LIST: LibraryEntry["type"][] = [
  "axiom",
  "definition",
  "lemma",
  "proposition",
  "theorem",
  "law",
  "corollary",
];

export const LIBRARY_ENTRIES: LibraryEntry[] = [
  // ═══════════════════════════════════════════
  // SET THEORY / LOGIC
  // ═══════════════════════════════════════════
  { id: "st-1", name: "Axiom of Extensionality", type: "axiom", branch: "Set Theory / Logic", statement: "Two sets are equal if and only if they have the same elements: $\\forall A\\,\\forall B\\,[\\forall x\\,(x \\in A \\Leftrightarrow x \\in B) \\Rightarrow A = B]$." },
  { id: "st-2", name: "Axiom of Pairing", type: "axiom", branch: "Set Theory / Logic", statement: "For any two sets $a$ and $b$, there exists a set $\\{a, b\\}$ whose only elements are $a$ and $b$." },
  { id: "st-3", name: "Axiom of Union", type: "axiom", branch: "Set Theory / Logic", statement: "For any set $A$, there exists a set $\\bigcup A$ whose elements are exactly those that belong to some member of $A$." },
  { id: "st-4", name: "Axiom of Power Set", type: "axiom", branch: "Set Theory / Logic", statement: "For any set $A$, there exists a set $\\mathcal{P}(A)$ whose elements are exactly the subsets of $A$." },
  { id: "st-5", name: "Axiom of Infinity", type: "axiom", branch: "Set Theory / Logic", statement: "There exists an inductive set, i.e., a set $I$ such that $\\emptyset \\in I$ and whenever $x \\in I$, then $x \\cup \\{x\\} \\in I$." },
  { id: "st-6", name: "Axiom Schema of Replacement", type: "axiom", branch: "Set Theory / Logic", statement: "If $\\varphi(x, y)$ is a functional formula and $A$ is a set, then $\\{y : \\exists x \\in A,\\, \\varphi(x,y)\\}$ is a set." },
  { id: "st-7", name: "Axiom of Regularity", type: "axiom", branch: "Set Theory / Logic", statement: "Every non-empty set $A$ contains an element $a$ such that $A \\cap a = \\emptyset$.", notes: "Also known as the Axiom of Foundation." },
  { id: "st-8", name: "Axiom of Choice", type: "axiom", branch: "Set Theory / Logic", statement: "For any family $\\{A_i\\}_{i \\in I}$ of non-empty sets, there exists a choice function $f$ with $f(i) \\in A_i$ for all $i \\in I$." },
  { id: "st-9", name: "De Morgan's Laws", type: "law", branch: "Set Theory / Logic", statement: "For sets $A$ and $B$: $(A \\cup B)^c = A^c \\cap B^c$ and $(A \\cap B)^c = A^c \\cup B^c$." },
  { id: "st-10", name: "Well-Ordering Principle", type: "theorem", branch: "Set Theory / Logic", statement: "Every non-empty set of positive integers contains a least element.", notes: "Equivalent to the Axiom of Choice." },
  { id: "st-11", name: "Zorn's Lemma", type: "lemma", branch: "Set Theory / Logic", statement: "If every chain in a partially ordered set $P$ has an upper bound in $P$, then $P$ contains a maximal element.", notes: "Equivalent to the Axiom of Choice." },
  { id: "st-12", name: "Cantor's Theorem", type: "theorem", branch: "Set Theory / Logic", statement: "For any set $A$, the power set $\\mathcal{P}(A)$ has strictly greater cardinality than $A$, i.e., $|A| < |\\mathcal{P}(A)|$." },
  { id: "st-13", name: "Schröder–Bernstein Theorem", type: "theorem", branch: "Set Theory / Logic", statement: "If there exist injections $f: A \\to B$ and $g: B \\to A$, then there exists a bijection between $A$ and $B$." },
  { id: "st-14", name: "Function (Definition)", type: "definition", branch: "Set Theory / Logic", statement: "A function $f: A \\to B$ is a relation $f \\subseteq A \\times B$ such that for every $a \\in A$ there is exactly one $b \\in B$ with $(a,b) \\in f$." },
  { id: "st-15", name: "Injection", type: "definition", branch: "Set Theory / Logic", statement: "A function $f: A \\to B$ is injective (one-to-one) if $f(a_1) = f(a_2)$ implies $a_1 = a_2$ for all $a_1, a_2 \\in A$." },
  { id: "st-16", name: "Surjection", type: "definition", branch: "Set Theory / Logic", statement: "A function $f: A \\to B$ is surjective (onto) if for every $b \\in B$ there exists $a \\in A$ such that $f(a) = b$." },
  { id: "st-17", name: "Bijection", type: "definition", branch: "Set Theory / Logic", statement: "A function $f: A \\to B$ is bijective if it is both injective and surjective." },
  { id: "st-18", name: "Countable Set", type: "definition", branch: "Set Theory / Logic", statement: "A set $A$ is countable if there exists an injection $f: A \\to \\mathbb{N}$. It is countably infinite if the injection is also a surjection." },
  { id: "st-19", name: "Uncountability of the Reals", type: "theorem", branch: "Set Theory / Logic", statement: "The set $\\mathbb{R}$ of real numbers is uncountable.", notes: "Proved by Cantor's diagonal argument." },

  // ═══════════════════════════════════════════
  // REAL ANALYSIS
  // ═══════════════════════════════════════════
  { id: "ra-1", name: "Completeness Axiom", type: "axiom", branch: "Real Analysis", statement: "Every non-empty subset of $\\mathbb{R}$ that is bounded above has a least upper bound (supremum) in $\\mathbb{R}$." },
  { id: "ra-2", name: "Archimedean Property", type: "proposition", branch: "Real Analysis", statement: "For any $x \\in \\mathbb{R}$, there exists $n \\in \\mathbb{N}$ such that $n > x$." },
  { id: "ra-3", name: "Triangle Inequality", type: "theorem", branch: "Real Analysis", statement: "For all $a, b \\in \\mathbb{R}$, $|a + b| \\leq |a| + |b|$." },
  { id: "ra-4", name: "Bolzano–Weierstrass Theorem", type: "theorem", branch: "Real Analysis", statement: "Every bounded sequence in $\\mathbb{R}$ has a convergent subsequence." },
  { id: "ra-5", name: "Heine–Borel Theorem", type: "theorem", branch: "Real Analysis", statement: "A subset of $\\mathbb{R}^n$ is compact if and only if it is closed and bounded." },
  { id: "ra-6", name: "Intermediate Value Theorem", type: "theorem", branch: "Real Analysis", statement: "If $f: [a,b] \\to \\mathbb{R}$ is continuous and $f(a) < c < f(b)$, then there exists $x \\in (a,b)$ with $f(x) = c$." },
  { id: "ra-7", name: "Extreme Value Theorem", type: "theorem", branch: "Real Analysis", statement: "If $f: [a,b] \\to \\mathbb{R}$ is continuous, then $f$ attains its maximum and minimum on $[a,b]$." },
  { id: "ra-8", name: "Mean Value Theorem", type: "theorem", branch: "Real Analysis", statement: "If $f: [a,b] \\to \\mathbb{R}$ is continuous on $[a,b]$ and differentiable on $(a,b)$, then there exists $c \\in (a,b)$ with $f'(c) = \\frac{f(b) - f(a)}{b - a}$." },
  { id: "ra-9", name: "Rolle's Theorem", type: "theorem", branch: "Real Analysis", statement: "If $f: [a,b] \\to \\mathbb{R}$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a) = f(b)$, then there exists $c \\in (a,b)$ with $f'(c) = 0$." },
  { id: "ra-10", name: "Fundamental Theorem of Calculus (Part I)", type: "theorem", branch: "Real Analysis", statement: "If $f$ is continuous on $[a,b]$ and $F(x) = \\int_a^x f(t)\\,dt$, then $F$ is differentiable on $(a,b)$ and $F'(x) = f(x)$." },
  { id: "ra-11", name: "Fundamental Theorem of Calculus (Part II)", type: "theorem", branch: "Real Analysis", statement: "If $f$ is continuous on $[a,b]$ and $F$ is any antiderivative of $f$, then $\\int_a^b f(x)\\,dx = F(b) - F(a)$." },
  { id: "ra-12", name: "Monotone Convergence Theorem", type: "theorem", branch: "Real Analysis", statement: "Every bounded monotone sequence in $\\mathbb{R}$ converges." },
  { id: "ra-13", name: "Squeeze Theorem", type: "theorem", branch: "Real Analysis", statement: "If $a_n \\leq b_n \\leq c_n$ for all $n$ and $\\lim a_n = \\lim c_n = L$, then $\\lim b_n = L$." },
  { id: "ra-14", name: "L'Hôpital's Rule", type: "theorem", branch: "Real Analysis", statement: "If $\\lim_{x \\to a} f(x) = \\lim_{x \\to a} g(x) = 0$ (or both $\\pm\\infty$) and $g'(x) \\neq 0$ near $a$, then $\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$, provided the latter limit exists." },
  { id: "ra-15", name: "Limit (Definition)", type: "definition", branch: "Real Analysis", statement: "$\\lim_{x \\to a} f(x) = L$ means: for every $\\epsilon > 0$ there exists $\\delta > 0$ such that $0 < |x - a| < \\delta$ implies $|f(x) - L| < \\epsilon$." },
  { id: "ra-16", name: "Continuity (Definition)", type: "definition", branch: "Real Analysis", statement: "A function $f$ is continuous at $a$ if $\\lim_{x \\to a} f(x) = f(a)$." },
  { id: "ra-17", name: "Derivative (Definition)", type: "definition", branch: "Real Analysis", statement: "The derivative of $f$ at $a$ is $f'(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$, when this limit exists." },
  { id: "ra-18", name: "Riemann Integral (Definition)", type: "definition", branch: "Real Analysis", statement: "A bounded function $f: [a,b] \\to \\mathbb{R}$ is Riemann integrable if $\\sup_P L(f,P) = \\inf_P U(f,P)$, where $L$ and $U$ are lower and upper Darboux sums over partitions $P$." },
  { id: "ra-19", name: "Uniform Continuity", type: "definition", branch: "Real Analysis", statement: "$f: A \\to \\mathbb{R}$ is uniformly continuous if for every $\\epsilon > 0$ there exists $\\delta > 0$ such that $|x - y| < \\delta$ implies $|f(x) - f(y)| < \\epsilon$ for all $x, y \\in A$." },
  { id: "ra-20", name: "Cauchy Sequence", type: "definition", branch: "Real Analysis", statement: "A sequence $(a_n)$ is Cauchy if for every $\\epsilon > 0$ there exists $N$ such that $|a_m - a_n| < \\epsilon$ for all $m, n \\geq N$." },
  { id: "ra-21", name: "Uniform Convergence", type: "definition", branch: "Real Analysis", statement: "A sequence of functions $f_n$ converges uniformly to $f$ on $A$ if $\\sup_{x \\in A} |f_n(x) - f(x)| \\to 0$ as $n \\to \\infty$." },
  { id: "ra-22", name: "Open Set", type: "definition", branch: "Real Analysis", statement: "A set $U \\subseteq \\mathbb{R}$ is open if for every $x \\in U$ there exists $\\epsilon > 0$ such that $(x - \\epsilon, x + \\epsilon) \\subseteq U$." },
  { id: "ra-23", name: "Compact Set", type: "definition", branch: "Real Analysis", statement: "A set $K \\subseteq \\mathbb{R}^n$ is compact if every open cover of $K$ has a finite subcover." },
  { id: "ra-24", name: "Dominated Convergence Theorem", type: "theorem", branch: "Real Analysis", statement: "If $f_n \\to f$ pointwise and $|f_n| \\leq g$ for an integrable $g$, then $\\lim \\int f_n = \\int f$.", notes: "Stated for Lebesgue integration." },

  // ═══════════════════════════════════════════
  // ABSTRACT ALGEBRA
  // ═══════════════════════════════════════════
  { id: "aa-1", name: "Group (Definition)", type: "definition", branch: "Abstract Algebra", statement: "A group $(G, \\cdot)$ is a set $G$ with a binary operation satisfying closure, associativity, existence of an identity element $e$, and existence of inverses for every element." },
  { id: "aa-2", name: "Ring (Definition)", type: "definition", branch: "Abstract Algebra", statement: "A ring $(R, +, \\cdot)$ is a set $R$ with two operations where $(R,+)$ is an abelian group, multiplication is associative, and multiplication distributes over addition." },
  { id: "aa-3", name: "Field (Definition)", type: "definition", branch: "Abstract Algebra", statement: "A field $(F, +, \\cdot)$ is a commutative ring with unity in which every non-zero element has a multiplicative inverse." },
  { id: "aa-4", name: "Subgroup (Definition)", type: "definition", branch: "Abstract Algebra", statement: "A non-empty subset $H$ of a group $G$ is a subgroup if $H$ is closed under the group operation and taking inverses." },
  { id: "aa-5", name: "Normal Subgroup", type: "definition", branch: "Abstract Algebra", statement: "A subgroup $N$ of $G$ is normal if $gNg^{-1} = N$ for all $g \\in G$, written $N \\trianglelefteq G$." },
  { id: "aa-6", name: "Quotient Group", type: "definition", branch: "Abstract Algebra", statement: "If $N \\trianglelefteq G$, the quotient group $G/N = \\{gN : g \\in G\\}$ with operation $(g_1 N)(g_2 N) = (g_1 g_2)N$." },
  { id: "aa-7", name: "Homomorphism", type: "definition", branch: "Abstract Algebra", statement: "A group homomorphism is a map $\\varphi: G \\to H$ such that $\\varphi(ab) = \\varphi(a)\\varphi(b)$ for all $a, b \\in G$." },
  { id: "aa-8", name: "Ideal", type: "definition", branch: "Abstract Algebra", statement: "A subset $I$ of a ring $R$ is an ideal if $I$ is an additive subgroup and $rI \\subseteq I$, $Ir \\subseteq I$ for all $r \\in R$." },
  { id: "aa-9", name: "Lagrange's Theorem", type: "theorem", branch: "Abstract Algebra", statement: "If $G$ is a finite group and $H$ is a subgroup of $G$, then $|H|$ divides $|G|$. Moreover, $|G| = |H| \\cdot [G:H]$." },
  { id: "aa-10", name: "First Isomorphism Theorem", type: "theorem", branch: "Abstract Algebra", statement: "If $\\varphi: G \\to H$ is a group homomorphism, then $G / \\ker(\\varphi) \\cong \\text{im}(\\varphi)$." },
  { id: "aa-11", name: "Second Isomorphism Theorem", type: "theorem", branch: "Abstract Algebra", statement: "If $H$ is a subgroup and $N$ is a normal subgroup of $G$, then $HN/N \\cong H/(H \\cap N)$." },
  { id: "aa-12", name: "Third Isomorphism Theorem", type: "theorem", branch: "Abstract Algebra", statement: "If $N \\subseteq M$ are both normal subgroups of $G$, then $(G/N)/(M/N) \\cong G/M$." },
  { id: "aa-13", name: "Cayley's Theorem", type: "theorem", branch: "Abstract Algebra", statement: "Every group $G$ is isomorphic to a subgroup of the symmetric group $S_G$ acting on $G$ by left multiplication." },
  { id: "aa-14", name: "First Sylow Theorem", type: "theorem", branch: "Abstract Algebra", statement: "If $p^k$ divides $|G|$ for a prime $p$, then $G$ has a subgroup of order $p^k$." },
  { id: "aa-15", name: "Second Sylow Theorem", type: "theorem", branch: "Abstract Algebra", statement: "All Sylow $p$-subgroups of a finite group $G$ are conjugate to each other." },
  { id: "aa-16", name: "Third Sylow Theorem", type: "theorem", branch: "Abstract Algebra", statement: "The number $n_p$ of Sylow $p$-subgroups satisfies $n_p \\equiv 1 \\pmod{p}$ and $n_p$ divides $|G|$." },
  { id: "aa-17", name: "Fundamental Theorem of Finitely Generated Abelian Groups", type: "theorem", branch: "Abstract Algebra", statement: "Every finitely generated abelian group is isomorphic to $\\mathbb{Z}^r \\oplus \\mathbb{Z}/n_1\\mathbb{Z} \\oplus \\cdots \\oplus \\mathbb{Z}/n_k\\mathbb{Z}$ where $n_1 \\mid n_2 \\mid \\cdots \\mid n_k$." },
  { id: "aa-18", name: "Principal Ideal Domain (PID)", type: "definition", branch: "Abstract Algebra", statement: "An integral domain $R$ is a PID if every ideal $I \\subseteq R$ is principal, i.e., $I = (a)$ for some $a \\in R$." },
  { id: "aa-19", name: "Unique Factorization Domain (UFD)", type: "definition", branch: "Abstract Algebra", statement: "An integral domain $R$ is a UFD if every non-zero non-unit element can be written as a product of irreducibles, uniquely up to order and associates." },

  // ═══════════════════════════════════════════
  // LINEAR ALGEBRA
  // ═══════════════════════════════════════════
  { id: "la-1", name: "Vector Space (Definition)", type: "definition", branch: "Linear Algebra", statement: "A vector space over a field $F$ is a set $V$ with addition and scalar multiplication satisfying eight axioms: closure, commutativity, and associativity of addition; existence of additive identity and inverses; compatibility, identity, and distributivity of scalar multiplication." },
  { id: "la-2", name: "Linear Transformation", type: "definition", branch: "Linear Algebra", statement: "A map $T: V \\to W$ between vector spaces is linear if $T(\\alpha u + \\beta v) = \\alpha T(u) + \\beta T(v)$ for all $u,v \\in V$ and scalars $\\alpha, \\beta$." },
  { id: "la-3", name: "Kernel", type: "definition", branch: "Linear Algebra", statement: "The kernel of a linear map $T: V \\to W$ is $\\ker(T) = \\{v \\in V : T(v) = 0\\}$." },
  { id: "la-4", name: "Image", type: "definition", branch: "Linear Algebra", statement: "The image of a linear map $T: V \\to W$ is $\\text{im}(T) = \\{T(v) : v \\in V\\}$." },
  { id: "la-5", name: "Basis (Definition)", type: "definition", branch: "Linear Algebra", statement: "A basis of a vector space $V$ is a linearly independent set that spans $V$." },
  { id: "la-6", name: "Dimension", type: "definition", branch: "Linear Algebra", statement: "The dimension of a vector space $V$ is the cardinality of any basis of $V$." },
  { id: "la-7", name: "Inner Product Space", type: "definition", branch: "Linear Algebra", statement: "An inner product space is a vector space $V$ over $\\mathbb{R}$ (or $\\mathbb{C}$) equipped with a positive-definite, conjugate-symmetric, bilinear (or sesquilinear) form $\\langle \\cdot, \\cdot \\rangle$." },
  { id: "la-8", name: "Eigenvalue and Eigenvector", type: "definition", branch: "Linear Algebra", statement: "A scalar $\\lambda$ is an eigenvalue of $T: V \\to V$ if there exists a non-zero $v \\in V$ with $T(v) = \\lambda v$. The vector $v$ is the corresponding eigenvector." },
  { id: "la-9", name: "Rank–Nullity Theorem", type: "theorem", branch: "Linear Algebra", statement: "If $T: V \\to W$ is a linear map and $V$ is finite-dimensional, then $\\dim(V) = \\dim(\\ker T) + \\dim(\\text{im}\\, T)$." },
  { id: "la-10", name: "Spectral Theorem", type: "theorem", branch: "Linear Algebra", statement: "Every real symmetric matrix (or Hermitian matrix) is orthogonally (unitarily) diagonalizable, with real eigenvalues." },
  { id: "la-11", name: "Cayley–Hamilton Theorem", type: "theorem", branch: "Linear Algebra", statement: "Every square matrix $A$ satisfies its own characteristic polynomial: if $p(\\lambda) = \\det(\\lambda I - A)$, then $p(A) = 0$." },
  { id: "la-12", name: "Determinant Properties", type: "proposition", branch: "Linear Algebra", statement: "$\\det(AB) = \\det(A)\\det(B)$ for square matrices $A, B$. A matrix is invertible iff $\\det(A) \\neq 0$." },
  { id: "la-13", name: "Cramer's Rule", type: "theorem", branch: "Linear Algebra", statement: "If $Ax = b$ is a system with $\\det(A) \\neq 0$, then $x_i = \\frac{\\det(A_i)}{\\det(A)}$ where $A_i$ is $A$ with column $i$ replaced by $b$." },
  { id: "la-14", name: "Gram–Schmidt Process", type: "theorem", branch: "Linear Algebra", statement: "Given a linearly independent set $\\{v_1, \\ldots, v_n\\}$ in an inner product space, there exists an orthonormal set $\\{e_1, \\ldots, e_n\\}$ spanning the same subspace." },
  { id: "la-15", name: "Orthogonal Complement", type: "definition", branch: "Linear Algebra", statement: "For a subspace $W$ of an inner product space $V$, the orthogonal complement is $W^\\perp = \\{v \\in V : \\langle v, w \\rangle = 0 \\text{ for all } w \\in W\\}$." },
  { id: "la-16", name: "Similar Matrices", type: "definition", branch: "Linear Algebra", statement: "Matrices $A$ and $B$ are similar if there exists an invertible matrix $P$ such that $B = P^{-1}AP$. Similar matrices have the same eigenvalues, determinant, and trace." },

  // ═══════════════════════════════════════════
  // TOPOLOGY
  // ═══════════════════════════════════════════
  { id: "top-1", name: "Topological Space", type: "definition", branch: "Topology", statement: "A topological space $(X, \\tau)$ is a set $X$ with a collection $\\tau$ of subsets (open sets) closed under arbitrary unions and finite intersections, with $\\emptyset, X \\in \\tau$." },
  { id: "top-2", name: "Metric Space", type: "definition", branch: "Topology", statement: "A metric space $(X, d)$ is a set $X$ with a function $d: X \\times X \\to [0,\\infty)$ satisfying positivity, symmetry, and the triangle inequality." },
  { id: "top-3", name: "Open Set (Metric Space)", type: "definition", branch: "Topology", statement: "A set $U$ in a metric space is open if for every $x \\in U$ there exists $\\epsilon > 0$ such that $B(x, \\epsilon) \\subseteq U$." },
  { id: "top-4", name: "Closed Set", type: "definition", branch: "Topology", statement: "A set $C$ is closed if its complement $X \\setminus C$ is open. Equivalently, $C$ contains all its limit points." },
  { id: "top-5", name: "Compactness", type: "definition", branch: "Topology", statement: "A topological space $X$ is compact if every open cover of $X$ has a finite subcover." },
  { id: "top-6", name: "Connectedness", type: "definition", branch: "Topology", statement: "A topological space $X$ is connected if it cannot be expressed as the union of two disjoint non-empty open sets." },
  { id: "top-7", name: "Path-Connectedness", type: "definition", branch: "Topology", statement: "A space $X$ is path-connected if for every $x, y \\in X$ there exists a continuous map $\\gamma: [0,1] \\to X$ with $\\gamma(0) = x$ and $\\gamma(1) = y$." },
  { id: "top-8", name: "Continuous Map", type: "definition", branch: "Topology", statement: "A map $f: X \\to Y$ between topological spaces is continuous if the preimage $f^{-1}(U)$ of every open set $U \\subseteq Y$ is open in $X$." },
  { id: "top-9", name: "Homeomorphism", type: "definition", branch: "Topology", statement: "A homeomorphism is a continuous bijection $f: X \\to Y$ whose inverse $f^{-1}$ is also continuous." },
  { id: "top-10", name: "Hausdorff Space", type: "definition", branch: "Topology", statement: "A topological space is Hausdorff ($T_2$) if for any two distinct points $x \\neq y$, there exist disjoint open sets $U \\ni x$ and $V \\ni y$." },
  { id: "top-11", name: "Tychonoff's Theorem", type: "theorem", branch: "Topology", statement: "An arbitrary product of compact topological spaces is compact in the product topology.", notes: "Equivalent to the Axiom of Choice." },
  { id: "top-12", name: "Urysohn's Lemma", type: "lemma", branch: "Topology", statement: "If $A$ and $B$ are disjoint closed sets in a normal space $X$, there exists a continuous function $f: X \\to [0,1]$ with $f(A) = \\{0\\}$ and $f(B) = \\{1\\}$." },
  { id: "top-13", name: "Brouwer Fixed-Point Theorem", type: "theorem", branch: "Topology", statement: "Every continuous map $f: B^n \\to B^n$ from the closed unit ball in $\\mathbb{R}^n$ to itself has a fixed point." },
  { id: "top-14", name: "Baire Category Theorem", type: "theorem", branch: "Topology", statement: "In a complete metric space, the intersection of countably many dense open sets is dense." },

  // ═══════════════════════════════════════════
  // NUMBER THEORY
  // ═══════════════════════════════════════════
  { id: "nt-1", name: "Prime Number (Definition)", type: "definition", branch: "Number Theory", statement: "An integer $p > 1$ is prime if its only positive divisors are $1$ and $p$." },
  { id: "nt-2", name: "GCD (Definition)", type: "definition", branch: "Number Theory", statement: "The greatest common divisor $\\gcd(a,b)$ is the largest positive integer dividing both $a$ and $b$." },
  { id: "nt-3", name: "Congruence", type: "definition", branch: "Number Theory", statement: "We write $a \\equiv b \\pmod{n}$ if $n \\mid (a - b)$." },
  { id: "nt-4", name: "Euler's Totient Function", type: "definition", branch: "Number Theory", statement: "$\\varphi(n)$ counts the number of integers $k$ with $1 \\leq k \\leq n$ and $\\gcd(k, n) = 1$." },
  { id: "nt-5", name: "Fundamental Theorem of Arithmetic", type: "theorem", branch: "Number Theory", statement: "Every integer $n > 1$ can be expressed uniquely (up to ordering) as a product of prime numbers." },
  { id: "nt-6", name: "Infinitude of Primes", type: "theorem", branch: "Number Theory", statement: "There are infinitely many prime numbers.", notes: "First proved by Euclid." },
  { id: "nt-7", name: "Fermat's Little Theorem", type: "theorem", branch: "Number Theory", statement: "If $p$ is prime and $\\gcd(a, p) = 1$, then $a^{p-1} \\equiv 1 \\pmod{p}$." },
  { id: "nt-8", name: "Euler's Theorem", type: "theorem", branch: "Number Theory", statement: "If $\\gcd(a, n) = 1$, then $a^{\\varphi(n)} \\equiv 1 \\pmod{n}$." },
  { id: "nt-9", name: "Wilson's Theorem", type: "theorem", branch: "Number Theory", statement: "An integer $p > 1$ is prime if and only if $(p-1)! \\equiv -1 \\pmod{p}$." },
  { id: "nt-10", name: "Chinese Remainder Theorem", type: "theorem", branch: "Number Theory", statement: "If $n_1, \\ldots, n_k$ are pairwise coprime and $a_1, \\ldots, a_k$ are integers, then the system $x \\equiv a_i \\pmod{n_i}$ has a unique solution modulo $N = n_1 \\cdots n_k$." },
  { id: "nt-11", name: "Bézout's Identity", type: "theorem", branch: "Number Theory", statement: "For any integers $a, b$, there exist integers $x, y$ such that $ax + by = \\gcd(a, b)$." },
  { id: "nt-12", name: "Euclid's Lemma", type: "lemma", branch: "Number Theory", statement: "If a prime $p$ divides $ab$, then $p \\mid a$ or $p \\mid b$." },
  { id: "nt-13", name: "Quadratic Reciprocity", type: "theorem", branch: "Number Theory", statement: "For distinct odd primes $p$ and $q$: $\\left(\\frac{p}{q}\\right)\\left(\\frac{q}{p}\\right) = (-1)^{\\frac{p-1}{2}\\cdot\\frac{q-1}{2}}$.", notes: "The Legendre symbol $(a/p) = 1$ if $a$ is a QR mod $p$, $-1$ otherwise." },
  { id: "nt-14", name: "Legendre Symbol", type: "definition", branch: "Number Theory", statement: "For odd prime $p$ and $\\gcd(a,p) = 1$, the Legendre symbol is $\\left(\\frac{a}{p}\\right) = a^{(p-1)/2} \\pmod{p}$, equal to $1$ if $a$ is a quadratic residue mod $p$ and $-1$ otherwise." },
  { id: "nt-15", name: "Dirichlet's Theorem on Primes in Arithmetic Progressions", type: "theorem", branch: "Number Theory", statement: "If $\\gcd(a, d) = 1$, then the arithmetic progression $a, a+d, a+2d, \\ldots$ contains infinitely many primes." },

  // ═══════════════════════════════════════════
  // COMBINATORICS
  // ═══════════════════════════════════════════
  { id: "comb-1", name: "Permutation", type: "definition", branch: "Combinatorics", statement: "The number of ways to arrange $k$ objects from $n$ distinct objects is $P(n,k) = \\frac{n!}{(n-k)!}$." },
  { id: "comb-2", name: "Combination", type: "definition", branch: "Combinatorics", statement: "The number of ways to choose $k$ objects from $n$ distinct objects (order irrelevant) is $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$." },
  { id: "comb-3", name: "Binomial Theorem", type: "theorem", branch: "Combinatorics", statement: "For any $n \\in \\mathbb{N}$ and $a, b$: $(a+b)^n = \\sum_{k=0}^{n} \\binom{n}{k} a^{n-k} b^k$." },
  { id: "comb-4", name: "Multinomial Theorem", type: "theorem", branch: "Combinatorics", statement: "$(x_1 + \\cdots + x_m)^n = \\sum \\frac{n!}{k_1! \\cdots k_m!} x_1^{k_1} \\cdots x_m^{k_m}$ where the sum is over all $(k_1,\\ldots,k_m)$ with $k_1 + \\cdots + k_m = n$." },
  { id: "comb-5", name: "Inclusion–Exclusion Principle", type: "theorem", branch: "Combinatorics", statement: "$|A_1 \\cup \\cdots \\cup A_n| = \\sum |A_i| - \\sum |A_i \\cap A_j| + \\cdots + (-1)^{n+1}|A_1 \\cap \\cdots \\cap A_n|$." },
  { id: "comb-6", name: "Pigeonhole Principle", type: "theorem", branch: "Combinatorics", statement: "If $n$ items are placed into $m$ containers and $n > m$, then at least one container holds more than one item." },
  { id: "comb-7", name: "Stars and Bars", type: "theorem", branch: "Combinatorics", statement: "The number of ways to place $n$ identical balls into $k$ distinct bins is $\\binom{n+k-1}{k-1}$." },
  { id: "comb-8", name: "Vandermonde's Identity", type: "theorem", branch: "Combinatorics", statement: "$\\binom{m+n}{r} = \\sum_{k=0}^{r} \\binom{m}{k}\\binom{n}{r-k}$." },
  { id: "comb-9", name: "Derangement Formula", type: "theorem", branch: "Combinatorics", statement: "The number of derangements of $n$ elements is $D_n = n! \\sum_{k=0}^{n} \\frac{(-1)^k}{k!}$." },
  { id: "comb-10", name: "Catalan Numbers", type: "definition", branch: "Combinatorics", statement: "The $n$-th Catalan number is $C_n = \\frac{1}{n+1}\\binom{2n}{n}$. It counts the number of valid parenthesizations of $n$ pairs of parentheses, among many other combinatorial objects." },
  { id: "comb-11", name: "Stirling's Approximation", type: "theorem", branch: "Combinatorics", statement: "$n! \\sim \\sqrt{2\\pi n}\\left(\\frac{n}{e}\\right)^n$ as $n \\to \\infty$." },

  // ═══════════════════════════════════════════
  // PROBABILITY
  // ═══════════════════════════════════════════
  { id: "prob-1", name: "Probability Space", type: "definition", branch: "Probability", statement: "A probability space is a triple $(\\Omega, \\mathcal{F}, P)$ where $\\Omega$ is the sample space, $\\mathcal{F}$ is a $\\sigma$-algebra of events, and $P: \\mathcal{F} \\to [0,1]$ is a probability measure." },
  { id: "prob-2", name: "Kolmogorov Axioms", type: "axiom", branch: "Probability", statement: "(1) $P(A) \\geq 0$ for all $A \\in \\mathcal{F}$. (2) $P(\\Omega) = 1$. (3) For pairwise disjoint $A_1, A_2, \\ldots$: $P(\\bigcup A_i) = \\sum P(A_i)$." },
  { id: "prob-3", name: "Conditional Probability", type: "definition", branch: "Probability", statement: "The conditional probability of $A$ given $B$ (with $P(B) > 0$) is $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$." },
  { id: "prob-4", name: "Independence", type: "definition", branch: "Probability", statement: "Events $A$ and $B$ are independent if $P(A \\cap B) = P(A)P(B)$." },
  { id: "prob-5", name: "Random Variable", type: "definition", branch: "Probability", statement: "A random variable is a measurable function $X: \\Omega \\to \\mathbb{R}$." },
  { id: "prob-6", name: "Bayes' Theorem", type: "theorem", branch: "Probability", statement: "$P(A \\mid B) = \\frac{P(B \\mid A)\\, P(A)}{P(B)}$, provided $P(B) > 0$." },
  { id: "prob-7", name: "Law of Total Probability", type: "theorem", branch: "Probability", statement: "If $\\{B_i\\}$ is a partition of $\\Omega$ with $P(B_i) > 0$, then $P(A) = \\sum_i P(A \\mid B_i)P(B_i)$." },
  { id: "prob-8", name: "Linearity of Expectation", type: "theorem", branch: "Probability", statement: "For any random variables $X, Y$: $E[aX + bY] = aE[X] + bE[Y]$, regardless of dependence." },
  { id: "prob-9", name: "Variance Formula", type: "definition", branch: "Probability", statement: "$\\text{Var}(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2$." },
  { id: "prob-10", name: "Markov's Inequality", type: "theorem", branch: "Probability", statement: "If $X \\geq 0$ and $a > 0$, then $P(X \\geq a) \\leq \\frac{E[X]}{a}$." },
  { id: "prob-11", name: "Weak Law of Large Numbers", type: "theorem", branch: "Probability", statement: "If $X_1, X_2, \\ldots$ are i.i.d. with mean $\\mu$ and finite variance, then $\\bar{X}_n \\xrightarrow{P} \\mu$ as $n \\to \\infty$." },
  { id: "prob-12", name: "Central Limit Theorem", type: "theorem", branch: "Probability", statement: "If $X_1, X_2, \\ldots$ are i.i.d. with mean $\\mu$ and variance $\\sigma^2$, then $\\frac{\\bar{X}_n - \\mu}{\\sigma / \\sqrt{n}} \\xrightarrow{d} N(0,1)$ as $n \\to \\infty$." },

  // ═══════════════════════════════════════════
  // COMPLEX ANALYSIS
  // ═══════════════════════════════════════════
  { id: "ca-1", name: "Analytic Function", type: "definition", branch: "Complex Analysis", statement: "A function $f: U \\to \\mathbb{C}$ (where $U$ is open) is analytic (holomorphic) at $z_0$ if it is complex-differentiable in a neighborhood of $z_0$." },
  { id: "ca-2", name: "Cauchy–Riemann Equations", type: "theorem", branch: "Complex Analysis", statement: "A function $f = u + iv$ is holomorphic if and only if $u$ and $v$ have continuous partial derivatives satisfying $\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}$ and $\\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}$." },
  { id: "ca-3", name: "Cauchy's Integral Theorem", type: "theorem", branch: "Complex Analysis", statement: "If $f$ is holomorphic on a simply connected domain $D$ and $\\gamma$ is a closed curve in $D$, then $\\oint_\\gamma f(z)\\,dz = 0$." },
  { id: "ca-4", name: "Cauchy's Integral Formula", type: "theorem", branch: "Complex Analysis", statement: "If $f$ is holomorphic inside and on a simple closed curve $\\gamma$, then for any $z_0$ inside $\\gamma$: $f(z_0) = \\frac{1}{2\\pi i} \\oint_\\gamma \\frac{f(z)}{z - z_0}\\,dz$." },
  { id: "ca-5", name: "Residue Theorem", type: "theorem", branch: "Complex Analysis", statement: "If $f$ is holomorphic on a domain except for isolated singularities $z_1, \\ldots, z_n$ inside a closed curve $\\gamma$, then $\\oint_\\gamma f(z)\\,dz = 2\\pi i \\sum_{k=1}^{n} \\text{Res}(f, z_k)$." },
  { id: "ca-6", name: "Liouville's Theorem", type: "theorem", branch: "Complex Analysis", statement: "Every bounded entire function is constant." },
  { id: "ca-7", name: "Fundamental Theorem of Algebra", type: "corollary", branch: "Complex Analysis", statement: "Every non-constant polynomial with complex coefficients has at least one root in $\\mathbb{C}$.", notes: "Follows from Liouville's theorem." },
  { id: "ca-8", name: "Maximum Modulus Principle", type: "theorem", branch: "Complex Analysis", statement: "If $f$ is holomorphic and non-constant on a connected open set $D$, then $|f|$ has no local maximum in $D$." },
  { id: "ca-9", name: "Laurent Series", type: "definition", branch: "Complex Analysis", statement: "A Laurent series of $f$ around $z_0$ is $f(z) = \\sum_{n=-\\infty}^{\\infty} a_n (z - z_0)^n$, converging in an annulus $r < |z - z_0| < R$." },
  { id: "ca-10", name: "Rouché's Theorem", type: "theorem", branch: "Complex Analysis", statement: "If $f$ and $g$ are holomorphic inside and on a simple closed curve $\\gamma$ and $|g(z)| < |f(z)|$ on $\\gamma$, then $f$ and $f + g$ have the same number of zeros inside $\\gamma$." },

  // ═══════════════════════════════════════════
  // DIFFERENTIAL EQUATIONS
  // ═══════════════════════════════════════════
  { id: "de-1", name: "Ordinary Differential Equation (Definition)", type: "definition", branch: "Differential Equations", statement: "An ODE is an equation involving an unknown function $y(t)$ and its derivatives: $F(t, y, y', \\ldots, y^{(n)}) = 0$." },
  { id: "de-2", name: "Picard–Lindelöf Theorem", type: "theorem", branch: "Differential Equations", statement: "If $f(t,y)$ is Lipschitz continuous in $y$ and continuous in $t$ near $(t_0, y_0)$, then $y' = f(t,y)$, $y(t_0) = y_0$ has a unique local solution." },
  { id: "de-3", name: "Gronwall's Inequality", type: "lemma", branch: "Differential Equations", statement: "If $u(t) \\leq \\alpha(t) + \\int_{t_0}^{t} \\beta(s) u(s)\\,ds$ with $\\beta \\geq 0$, then $u(t) \\leq \\alpha(t) + \\int_{t_0}^{t} \\alpha(s)\\beta(s) \\exp\\left(\\int_s^t \\beta(r)\\,dr\\right) ds$." },
  { id: "de-4", name: "Existence and Uniqueness for Linear ODEs", type: "theorem", branch: "Differential Equations", statement: "The initial value problem $y' + p(t)y = g(t)$, $y(t_0) = y_0$, has a unique solution on any interval where $p$ and $g$ are continuous." },
  { id: "de-5", name: "Variation of Parameters", type: "theorem", branch: "Differential Equations", statement: "A particular solution of $y'' + p(t)y' + q(t)y = g(t)$ can be found as $y_p = u_1 y_1 + u_2 y_2$ where $u_1' y_1 + u_2' y_2 = 0$ and $u_1' y_1' + u_2' y_2' = g$." },
  { id: "de-6", name: "Laplace Transform (Definition)", type: "definition", branch: "Differential Equations", statement: "The Laplace transform of $f(t)$ is $\\mathcal{L}\\{f\\}(s) = \\int_0^\\infty e^{-st} f(t)\\,dt$, defined for $s$ in the region of convergence." },
  { id: "de-7", name: "Separation of Variables", type: "theorem", branch: "Differential Equations", statement: "If $\\frac{dy}{dx} = f(x)g(y)$ with $g(y) \\neq 0$, then $\\int \\frac{dy}{g(y)} = \\int f(x)\\,dx + C$.", notes: "One of the simplest solution techniques for first-order ODEs." },
  { id: "de-8", name: "Sturm–Liouville Theory", type: "theorem", branch: "Differential Equations", statement: "The eigenvalue problem $\\frac{d}{dx}[p(x)y'] + q(x)y = -\\lambda w(x)y$ on $[a,b]$ with boundary conditions has a countable sequence of real eigenvalues $\\lambda_1 < \\lambda_2 < \\cdots$ and orthogonal eigenfunctions." },
];
