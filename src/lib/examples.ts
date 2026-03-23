export const EXAMPLES: string[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 1 — Plain English / No math background (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 1 — plain
  `I want to show that if you keep adding smaller and smaller positive numbers, the total can still blow up to infinity. Like 1 + 1/2 + 1/3 + 1/4 + ... never stops growing.`,

  // 2 — LaTeX
  `How do I prove that there's no biggest prime number? Suppose $p_1, p_2, \\ldots, p_n$ are all the primes. Consider $N = p_1 p_2 \\cdots p_n + 1$. None of the $p_i$ divide $N$, so $N$ has a prime factor not on the list — contradiction.`,

  // 3 — plain
  `If I have a continuous curve that starts below zero and ends above zero, it has to cross zero at some point, right? Can you make that rigorous?`,

  // 4 — LaTeX
  `Can you help me show that $\\sqrt{2}$ is irrational? Assume $\\sqrt{2} = p/q$ in lowest terms. Then $2q^2 = p^2$, so $p$ is even. Write $p = 2k$, then $q^2 = 2k^2$, so $q$ is even too — contradicting lowest terms.`,

  // 5 — plain
  `I think if a sequence keeps getting closer and closer together, it has to converge to something. Like the terms are bunching up so they must be heading somewhere. Can you prove that?`,

  // 6 — LaTeX
  `If $f$ is continuous on $[a,b]$, can I always find where it reaches its maximum? Since $[a,b]$ is compact and $f$ is continuous, $f([a,b])$ is compact in $\\mathbb{R}$, hence closed and bounded. So $\\sup f([a,b])$ is attained.`,

  // 7 — plain
  `I want to prove that 0.999... repeating is exactly equal to 1, not just close to it. People always argue about this — what's the actual proof?`,

  // 8 — LaTeX
  `If $a_n \\to A$ and $b_n \\to B$, does $a_n + b_n \\to A + B$? Pick $\\varepsilon > 0$. Choose $N_1$ so $|a_n - A| < \\varepsilon/2$ for $n \\geq N_1$ and $N_2$ so $|b_n - B| < \\varepsilon/2$ for $n \\geq N_2$. Then for $n \\geq \\max(N_1, N_2)$, $|(a_n+b_n)-(A+B)| < \\varepsilon$.`,

  // 9 — plain
  `Is it true that every bounded sequence has a convergent subsequence? I remember hearing this in class but I don't remember why it's true.`,

  // 10 — LaTeX
  `I need to show that if $f'(x) = 0$ for all $x \\in (a,b)$, then $f$ is constant. By the Mean Value Theorem, for any $x, y \\in (a,b)$ there exists $c$ between them with $f(x) - f(y) = f'(c)(x-y) = 0$.`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 2 — Semi-formal sketches with gaps (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 11 — plain
  `Let f be continuous on [a,b]. Then f is bounded. I think you use Bolzano-Weierstrass somehow — if f were unbounded you'd get a sequence going to infinity, and then a subsequence would converge, but f would blow up, which is a contradiction.`,

  // 12 — LaTeX
  `If $a_n \\to L$, then $|a_n| \\to |L|$. By the reverse triangle inequality, $\\bigl||a_n| - |L|\\bigr| \\leq |a_n - L|$. The right side $\\to 0$, so the left does too.`,

  // 13 — plain
  `To show √2 is irrational: assume √2 = p/q in lowest terms. Then 2q² = p², so p is even. Write p = 2k, then 2q² = 4k², so q² = 2k², meaning q is even too. But we said lowest terms, contradiction.`,

  // 14 — LaTeX
  `The limit $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$. By L'Hôpital (0/0 form): $\\lim \\frac{\\cos x}{1} = \\cos(0) = 1$. But there might be a circularity issue since the derivative of $\\sin x$ uses this limit.`,

  // 15 — plain
  `A continuous function on [a,b] is uniformly continuous. The idea is: if not, there exist sequences x_n, y_n with |x_n - y_n| → 0 but |f(x_n) - f(y_n)| ≥ ε. By compactness you get a convergent subsequence and then continuity gives a contradiction.`,

  // 16 — LaTeX
  `The series $\\sum 1/n^2$ converges. Since $\\frac{1}{n^2} \\leq \\frac{1}{n(n-1)} = \\frac{1}{n-1} - \\frac{1}{n}$ for $n \\geq 2$, the partial sums are bounded by a telescoping series, so convergence follows.`,

  // 17 — plain
  `If f is differentiable at c then f is continuous at c. We have f(x) - f(c) = [f(x)-f(c)]/(x-c) · (x-c). As x → c, the first factor goes to f'(c) and the second to 0, so the product goes to 0, meaning f(x) → f(c).`,

  // 18 — LaTeX
  `A convergent sequence is Cauchy. If $a_n \\to L$, pick $N$ so $|a_n - L| < \\varepsilon/2$ for $n \\geq N$. Then for $m, n \\geq N$: $|a_m - a_n| \\leq |a_m - L| + |L - a_n| < \\varepsilon$.`,

  // 19 — plain
  `The intersection of an arbitrary collection of closed sets is closed. A closed set contains all its limit points. If x is a limit point of the intersection, then x is a limit point of each set in the collection, so x is in each set, hence in the intersection.`,

  // 20 — LaTeX
  `If $\\sum a_n$ converges, then $a_n \\to 0$. Since $a_n = S_n - S_{n-1}$ where $S_n$ is the partial sum, and $S_n \\to S$, we get $a_n = S_n - S_{n-1} \\to S - S = 0$.`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 3 — Structured but incomplete, missing justifications (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 21 — plain
  `Let (a_n) be a convergent sequence with a_n → L. Since convergent sequences are bounded, a_n is bounded. Therefore there exists M such that |a_n| ≤ M for all n.`,

  // 22 — LaTeX
  `Suppose $a_n \\to A$ and $b_n \\to B$. Then $a_n + b_n \\to A + B$. Pick $\\varepsilon > 0$. There exist $N_1, N_2$ such that $|a_n - A| < \\varepsilon/2$ for $n \\geq N_1$ and $|b_n - B| < \\varepsilon/2$ for $n \\geq N_2$. Take $N = \\max(N_1, N_2)$. Then $|(a_n + b_n) - (A + B)| \\leq |a_n - A| + |b_n - B| < \\varepsilon$.`,

  // 23 — plain
  `Let a_n ≤ b_n ≤ c_n for all n, and suppose a_n → L and c_n → L. Then b_n → L too. Given ε > 0, eventually a_n > L - ε and c_n < L + ε, so L - ε < a_n ≤ b_n ≤ c_n < L + ε, which means |b_n - L| < ε.`,

  // 24 — LaTeX
  `For $|r| < 1$, the series $\\sum_{n=0}^{\\infty} r^n = \\frac{1}{1-r}$. The partial sum $S_N = \\frac{1 - r^{N+1}}{1 - r}$. Since $|r| < 1$, $r^{N+1} \\to 0$, so $S_N \\to \\frac{1}{1-r}$.`,

  // 25 — plain
  `Let f be continuous on [a,b] with f(a) < 0 and f(b) > 0. Then there exists c in (a,b) with f(c) = 0. Define S = {x in [a,b] : f(x) ≤ 0}. Let c = sup S. By continuity, f(c) = 0. The argument uses the fact that f can't jump from negative to positive without hitting zero.`,

  // 26 — LaTeX
  `If $a_n \\to A$ and $b_n \\to B$, then $a_n b_n \\to AB$. Write $a_n b_n - AB = a_n(b_n - B) + B(a_n - A)$. Since $(a_n)$ is convergent it is bounded, say $|a_n| \\leq M$. Then $|a_n b_n - AB| \\leq M|b_n - B| + |B||a_n - A| \\to 0$.`,

  // 27 — plain
  `The series Σ 1/n^p converges if and only if p > 1. For p > 1, use the integral test: ∫_1^∞ x^{-p}dx = 1/(p-1) < ∞. For p ≤ 1, compare with the harmonic series. Σ 1/n diverges by grouping: 1/2 + (1/3 + 1/4) + (1/5+...+1/8) + ... where each group sums to at least 1/2.`,

  // 28 — LaTeX
  `Consider $\\sum a_n$ where $a_n > 0$ and $a_{n+1}/a_n \\to r < 1$. Pick $r < s < 1$. Eventually $a_{n+1}/a_n < s$, so $a_n < C s^n$ for some constant $C$. Since $\\sum s^n$ converges (geometric), comparison gives convergence of $\\sum a_n$.`,

  // 29 — plain
  `Let f be continuous on [a,b] and define F(x) = ∫_a^x f(t)dt. Then F is differentiable and F'(x) = f(x). We have (F(x+h) - F(x))/h = (1/h)∫_x^{x+h} f(t)dt. By continuity, f(t) is close to f(x) on [x, x+h], so this ratio → f(x) as h → 0.`,

  // 30 — LaTeX
  `Let $[a_n, b_n]$ be nested closed intervals with $b_n - a_n \\to 0$. Then $\\bigcap [a_n, b_n]$ contains exactly one point. $(a_n)$ is increasing and bounded above by $b_1$, so $a_n \\to a$. Similarly $b_n \\to b$. Since $b_n - a_n \\to 0$, $a = b =: c$. Then $c \\in [a_n, b_n]$ for all $n$.`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 4 — Nearly rigorous, textbook quality (8 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 31 — plain
  `Suppose a_n → L and a_n → M. Then L = M. Given ε > 0, there exist N1, N2 such that |a_n - L| < ε/2 and |a_n - M| < ε/2 for n ≥ max(N1, N2). By the triangle inequality, |L - M| ≤ |L - a_n| + |a_n - M| < ε. Since ε > 0 was arbitrary, L = M.`,

  // 32 — LaTeX
  `Let $(a_n)$ be increasing and bounded above. Let $L = \\sup\\{a_n : n \\in \\mathbb{N}\\}$. For any $\\varepsilon > 0$, $L - \\varepsilon$ is not an upper bound, so there exists $N$ with $a_N > L - \\varepsilon$. Since $(a_n)$ is increasing, $L - \\varepsilon < a_N \\leq a_n \\leq L$ for all $n \\geq N$. Thus $|a_n - L| < \\varepsilon$.`,

  // 33 — plain
  `Let f be continuous at c and let x_n → c. Then f(x_n) → f(c). Given ε > 0, by continuity of f at c there exists δ > 0 such that |x - c| < δ implies |f(x) - f(c)| < ε. Since x_n → c, there exists N ∈ N such that |x_n - c| < δ for all n ≥ N. Therefore |f(x_n) - f(c)| < ε for all n ≥ N.`,

  // 34 — LaTeX
  `Prove $\\frac{d}{dx}(x^n) = n x^{n-1}$ for all $n \\in \\mathbb{N}$ by induction. Base: $\\frac{d}{dx}(x^1) = 1 = 1 \\cdot x^0$. Step: assume $\\frac{d}{dx}(x^k) = k x^{k-1}$. Then $\\frac{d}{dx}(x^{k+1}) = x^k + x \\cdot k x^{k-1} = (k+1)x^k$.`,

  // 35 — plain
  `Let (a_n) be Cauchy in R. Then a_n converges. First, (a_n) is bounded: pick N so |a_m - a_n| < 1 for m,n ≥ N, then |a_n| ≤ max(|a_1|,...,|a_{N-1}|, |a_N|+1). By Bolzano-Weierstrass, there exists a convergent subsequence a_{n_k} → L. For any ε > 0, choose K so |a_{n_k} - L| < ε/2 for k ≥ K, and M so |a_m - a_n| < ε/2 for m,n ≥ M. For n ≥ max(M, n_K), |a_n - L| ≤ |a_n - a_{n_K}| + |a_{n_K} - L| < ε.`,

  // 36 — LaTeX
  `Let $a < b$. By the Archimedean property, choose $n \\in \\mathbb{N}$ with $1/n < b - a$. Let $m$ be the smallest integer with $m/n > a$. Then $m/n \\leq a + 1/n < b$. So $a < m/n < b$ and $m/n \\in \\mathbb{Q}$.`,

  // 37 — plain
  `If f is continuous on [a,b] then f is Riemann integrable. Since [a,b] is compact and f is continuous, f is uniformly continuous: for any ε > 0 there exists δ > 0 with |f(x) - f(y)| < ε/(b-a) whenever |x-y| < δ. Choose a partition P with mesh(P) < δ. Then U(f,P) - L(f,P) = Σ (M_i - m_i)Δx_i < [ε/(b-a)] · Σ Δx_i = ε. By the Riemann criterion, f is integrable.`,

  // 38 — LaTeX
  `Let $L = \\limsup a_n = \\lim_{n \\to \\infty} \\sup_{k \\geq n} a_k$. For any $\\varepsilon > 0$, infinitely many $a_k > L - \\varepsilon$ and eventually all $a_k < L + \\varepsilon$. Extract a subsequence converging to $L$. Conversely, if $a_{n_j} \\to M$, then $M \\leq \\sup_{k \\geq n_j} a_k \\to L$, so $M \\leq L$.`,
];

export function getRandomExample(lastIndex?: number): { text: string; index: number } {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * EXAMPLES.length);
  } while (idx === lastIndex && EXAMPLES.length > 1);
  return { text: EXAMPLES[idx], index: idx };
}
