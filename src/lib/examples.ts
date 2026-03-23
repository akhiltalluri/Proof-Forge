export const EXAMPLES: string[] = [
  // 1 — Convergent sequences are bounded
  `Let (a_n) be a convergent sequence with a_n → L. Since convergent sequences are bounded, a_n is bounded. Therefore there exists M such that |a_n| ≤ M for all n.`,

  // 2 — Limit of a sum
  `Suppose a_n → A and b_n → B. Then a_n + b_n → A + B. Pick ε > 0. There exist N1, N2 such that |a_n - A| < ε/2 for n ≥ N1 and |b_n - B| < ε/2 for n ≥ N2. Take N = max(N1, N2). Then |(a_n + b_n) - (A + B)| ≤ |a_n - A| + |b_n - B| < ε.`,

  // 3 — Squeeze theorem
  `Let a_n ≤ b_n ≤ c_n for all n, and suppose a_n → L and c_n → L. Then b_n → L too. Given ε > 0, eventually a_n > L - ε and c_n < L + ε, so L - ε < a_n ≤ b_n ≤ c_n < L + ε, which means |b_n - L| < ε.`,

  // 4 — Monotone convergence theorem usage
  `Let a_n be increasing and bounded above. Then a_n converges. Let L = sup{a_n}. For any ε > 0, L - ε is not an upper bound, so there exists N with a_N > L - ε. Since a_n is increasing, a_n ≥ a_N > L - ε for all n ≥ N. Also a_n ≤ L, so |a_n - L| < ε.`,

  // 5 — Uniqueness of limits
  `Suppose a_n → L and a_n → M. Then L = M. Given ε > 0, there exist N1, N2 such that |a_n - L| < ε/2 and |a_n - M| < ε/2 for n ≥ max(N1, N2). By triangle inequality, |L - M| ≤ |L - a_n| + |a_n - M| < ε. Since ε was arbitrary, L = M.`,

  // 6 — Continuous function on closed interval is bounded
  `Let f be continuous on [a,b]. Then f is bounded. Suppose not. Then for each n, there exists x_n in [a,b] with |f(x_n)| > n. By Bolzano-Weierstrass, x_n has a convergent subsequence x_{n_k} → c ∈ [a,b]. By continuity, f(x_{n_k}) → f(c), but |f(x_{n_k})| > n_k → ∞, contradiction.`,

  // 7 — Intermediate value theorem sketch
  `Let f be continuous on [a,b] with f(a) < 0 and f(b) > 0. Then there exists c in (a,b) with f(c) = 0. Define S = {x in [a,b] : f(x) ≤ 0}. Let c = sup S. By continuity, f(c) = 0. The argument uses the fact that f can't jump from negative to positive without hitting zero.`,

  // 8 — Limit of a product
  `If a_n → A and b_n → B, then a_n * b_n → A * B. Write a_n * b_n - A*B = a_n(b_n - B) + B(a_n - A). Since a_n is convergent it's bounded, say |a_n| ≤ M. Then |a_n * b_n - AB| ≤ M|b_n - B| + |B||a_n - A|. Both terms go to 0, so the product converges.`,

  // 9 — Cauchy sequences converge in R
  `Let (a_n) be Cauchy in R. Then a_n converges. First, a_n is bounded (Cauchy implies bounded). By Bolzano-Weierstrass, there's a convergent subsequence a_{n_k} → L. Then a_n → L because for any ε, |a_n - L| ≤ |a_n - a_{n_k}| + |a_{n_k} - L|, and both terms are small for large n, n_k.`,

  // 10 — Ratio test
  `Consider the series Σ a_n where a_n > 0 and a_{n+1}/a_n → r < 1. Then Σ a_n converges. Pick r < s < 1. Eventually a_{n+1}/a_n < s, so a_n < C * s^n for some constant C. Since Σ s^n converges (geometric series), comparison gives convergence.`,

  // 11 — Continuity implies sequential continuity
  `Let f be continuous at c and let x_n → c. Then f(x_n) → f(c). Given ε > 0, by continuity there's δ > 0 with |x - c| < δ implying |f(x) - f(c)| < ε. Since x_n → c, there's N with |x_n - c| < δ for n ≥ N. So |f(x_n) - f(c)| < ε for n ≥ N.`,

  // 12 — Derivative of x^n by induction
  `Prove d/dx(x^n) = n*x^{n-1} for all positive integers n. Base case: d/dx(x) = 1 = 1*x^0. Inductive step: assume it for n=k. Then d/dx(x^{k+1}) = d/dx(x * x^k) = x^k + x * k*x^{k-1} by the product rule = x^k + k*x^k = (k+1)*x^k. Done.`,

  // 13 — Geometric series
  `For |r| < 1, the series Σ_{n=0}^∞ r^n = 1/(1-r). The partial sum S_N = (1 - r^{N+1})/(1 - r). Since |r| < 1, r^{N+1} → 0, so S_N → 1/(1-r).`,

  // 14 — A continuous function that attains its max
  `If f is continuous on [a,b], then f attains its supremum. Let M = sup f([a,b]). For each n, there exists x_n with f(x_n) > M - 1/n. By Bolzano-Weierstrass, some subsequence x_{n_k} → c ∈ [a,b]. By continuity f(c) = lim f(x_{n_k}) ≥ M. But f(c) ≤ M by definition, so f(c) = M.`,

  // 15 — Uniform continuity on closed interval
  `A continuous function on [a,b] is uniformly continuous. Suppose not. Then there exists ε > 0 and sequences x_n, y_n in [a,b] with |x_n - y_n| < 1/n but |f(x_n) - f(y_n)| ≥ ε. By B-W, x_n has a subsequence converging to some c. Then y_n also converges to c. But f(x_n) and f(y_n) both approach f(c), contradicting |f(x_n) - f(y_n)| ≥ ε.`,

  // 16 — Alternating series test
  `If a_n is decreasing and a_n → 0, then Σ (-1)^n a_n converges. The even partial sums S_{2n} are increasing and bounded above, and the odd partial sums S_{2n+1} are decreasing and bounded below. Both converge, and S_{2n+1} - S_{2n} = -a_{2n+1} → 0, so they converge to the same limit.`,

  // 17 — Absolute convergence implies convergence
  `If Σ |a_n| converges then Σ a_n converges. Note 0 ≤ a_n + |a_n| ≤ 2|a_n|. By comparison, Σ(a_n + |a_n|) converges. Then Σ a_n = Σ(a_n + |a_n|) - Σ|a_n| converges as the difference of two convergent series.`,

  // 18 — Riemann integral of a continuous function exists
  `If f is continuous on [a,b] then f is Riemann integrable. Since f is uniformly continuous on [a,b], for any ε > 0 there's δ with |f(x)-f(y)| < ε/(b-a) whenever |x-y| < δ. Take a partition with mesh < δ. Then U(f,P) - L(f,P) < ε. So f is integrable.`,

  // 19 — Limit comparison test
  `If a_n, b_n > 0 and a_n/b_n → L where 0 < L < ∞, then Σa_n and Σb_n either both converge or both diverge. Eventually L/2 < a_n/b_n < 2L, so (L/2)b_n < a_n < 2L*b_n. By comparison, they have the same convergence behavior.`,

  // 20 — Mean value theorem application
  `Let f be differentiable on (a,b) and continuous on [a,b] with f'(x) = 0 for all x in (a,b). Then f is constant. For any x, y in [a,b], by MVT there exists c between x and y with f(x) - f(y) = f'(c)(x - y) = 0. So f(x) = f(y).`,

  // 21 — Bolzano-Weierstrass theorem
  `Every bounded sequence in R has a convergent subsequence. Let (a_n) be bounded. Bisect the interval [inf a_n, sup a_n]. At least one half contains infinitely many terms. Pick a term from it. Repeat, getting a nested sequence of intervals whose lengths → 0. The selected subsequence converges to the common point.`,

  // 22 — L'Hopital's rule application
  `Evaluate lim_{x→0} sin(x)/x. Both numerator and denominator go to 0. By L'Hopital, lim sin(x)/x = lim cos(x)/1 = cos(0) = 1. We should note that f and g are differentiable near 0 and g'(0) = 1 ≠ 0.`,

  // 23 — Root test
  `Consider Σ a_n with |a_n|^{1/n} → r. If r < 1 the series converges. Pick r < s < 1. Eventually |a_n|^{1/n} < s, so |a_n| < s^n. Σ s^n is a convergent geometric series, so by comparison Σ |a_n| converges, hence Σ a_n converges absolutely.`,

  // 24 — Fundamental theorem of calculus (part 1)
  `Let f be continuous on [a,b] and define F(x) = ∫_a^x f(t)dt. Then F is differentiable and F'(x) = f(x). We have (F(x+h) - F(x))/h = (1/h)∫_x^{x+h} f(t)dt. By continuity, f(t) is close to f(x) on [x, x+h], so this ratio → f(x) as h → 0.`,

  // 25 — Subsequential limits and limsup
  `The limsup of a bounded sequence a_n equals the largest subsequential limit. Let L = lim sup a_n = lim_{n→∞} sup_{k≥n} a_k. For any ε, eventually sup_{k≥n} a_k < L + ε, and infinitely often a_n > L - ε. So we can extract a subsequence converging to L. Any subsequential limit M satisfies M ≤ L since eventually a_n < L + ε.`,

  // 26 — p-series convergence
  `The series Σ 1/n^p converges if and only if p > 1. For p > 1, use the integral test: ∫_1^∞ x^{-p}dx = 1/(p-1) < ∞. For p ≤ 1, compare with the harmonic series. Σ 1/n diverges by grouping: 1/2 + (1/3 + 1/4) + (1/5+...+1/8) + ... where each group sums to at least 1/2.`,

  // 27 — Nested intervals theorem
  `Let [a_n, b_n] be a nested sequence of closed intervals with b_n - a_n → 0. Then the intersection contains exactly one point. a_n is increasing and bounded above (by b_1), so a_n → a. Similarly b_n → b. Since b_n - a_n → 0, a = b. Call it c. Then c ∈ [a_n, b_n] for all n, and any other point eventually falls outside some interval.`,

  // 28 — Differentiation of power series
  `If f(x) = Σ a_n x^n has radius of convergence R > 0, then f is differentiable on (-R, R) and f'(x) = Σ n*a_n*x^{n-1}. The key is that the derived series has the same radius of convergence. You can show this using the root test: limsup |n*a_n|^{1/n} = limsup |a_n|^{1/n} since n^{1/n} → 1.`,

  // 29 — Density of rationals
  `Between any two real numbers there is a rational number. Let a < b. Choose n with 1/n < b - a (Archimedean property). Let m be the smallest integer with m/n > a. Then m/n ≤ a + 1/n < a + (b-a) = b. So a < m/n < b.`,

  // 30 — Completeness via Cauchy sequences
  `R is complete: every Cauchy sequence converges. Let (x_n) be Cauchy. It's bounded, so by Bolzano-Weierstrass some subsequence x_{n_k} → L. Given ε > 0, pick K so |x_{n_k} - L| < ε/2 for k ≥ K, and N so |x_m - x_n| < ε/2 for m,n ≥ N. For n ≥ max(N, n_K), |x_n - L| ≤ |x_n - x_{n_K}| + |x_{n_K} - L| < ε.`,
];

export function getRandomExample(lastIndex?: number): { text: string; index: number } {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * EXAMPLES.length);
  } while (idx === lastIndex && EXAMPLES.length > 1);
  return { text: EXAMPLES[idx], index: idx };
}
