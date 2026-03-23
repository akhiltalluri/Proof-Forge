export const EXAMPLES: string[] = [
  // ═══════════════════════════════════════════════════════════════════════
  // TIER 1 — Plain English / No math background (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 1
  `I want to show that if you keep adding smaller and smaller positive numbers, the total can still blow up to infinity. Like 1 + 1/2 + 1/3 + 1/4 + ... never stops growing.`,

  // 2
  `How do I prove that there's no biggest prime number? I know primes are numbers only divisible by 1 and themselves, but I don't know how to show the list never ends.`,

  // 3
  `If I have a continuous curve that starts below zero and ends above zero, it has to cross zero at some point, right? Can you make that rigorous?`,

  // 4
  `Can you help me show that the square root of 2 is irrational? I've heard you assume it's a fraction and get a contradiction, but I don't know the details.`,

  // 5
  `I think if a sequence keeps getting closer and closer together, it has to converge to something. Like the terms are bunching up so they must be heading somewhere. Can you prove that?`,

  // 6
  `If I have a function that's continuous on a closed interval, can I always find where it reaches its maximum? It feels true but I don't know how to argue it.`,

  // 7
  `I want to prove that 0.999... repeating is exactly equal to 1, not just close to it. People always argue about this — what's the actual proof?`,

  // 8
  `If two sequences both converge, does their sum also converge? It seems obvious but how do you actually prove it with epsilons and deltas?`,

  // 9
  `Is it true that every bounded sequence has a convergent subsequence? I remember hearing this in class but I don't remember why it's true.`,

  // 10
  `I need to show that if a function has a derivative of zero everywhere on an interval, then it must be constant. Intuitively it makes sense — no slope means flat — but how do I prove it?`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 2 — Semi-formal sketches with gaps (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 11
  `Let f be continuous on [a,b]. Then f is bounded. I think you use Bolzano-Weierstrass somehow — if f were unbounded you'd get a sequence going to infinity, and then a subsequence would converge, but f would blow up, which is a contradiction.`,

  // 12
  `If a_n converges to L, then clearly |a_n| converges to |L|. It's obvious from the reverse triangle inequality, since ||a_n| - |L|| ≤ |a_n - L|. The right side goes to 0 so the left does too.`,

  // 13
  `To show √2 is irrational: assume √2 = p/q in lowest terms. Then 2q² = p², so p is even. Write p = 2k, then 2q² = 4k², so q² = 2k², meaning q is even too. But we said lowest terms, contradiction.`,

  // 14
  `The limit of sin(x)/x as x → 0 is 1. You can use L'Hôpital since it's 0/0: the derivative of sin(x) is cos(x), derivative of x is 1, and cos(0) = 1. But I think there might be a circularity issue here.`,

  // 15
  `A continuous function on [a,b] is uniformly continuous. The idea is: if not, there exist sequences x_n, y_n with |x_n - y_n| → 0 but |f(x_n) - f(y_n)| ≥ ε. By compactness you get a convergent subsequence and then continuity gives a contradiction.`,

  // 16
  `The series Σ 1/n² converges. I think you compare it with a telescoping series. Since 1/n² ≤ 1/n(n-1) = 1/(n-1) - 1/n for n ≥ 2, the partial sums are bounded, so it converges.`,

  // 17
  `If f is differentiable at c then f is continuous at c. We have f(x) - f(c) = [f(x)-f(c)]/(x-c) · (x-c). As x → c, the first factor goes to f'(c) and the second to 0, so the product goes to 0, meaning f(x) → f(c).`,

  // 18
  `A convergent sequence is Cauchy. If a_n → L, pick N so |a_n - L| < ε/2. Then for m, n ≥ N, |a_m - a_n| ≤ |a_m - L| + |L - a_n| < ε. Pretty straightforward application of triangle inequality.`,

  // 19
  `The intersection of an arbitrary collection of closed sets is closed. A closed set contains all its limit points. If x is a limit point of the intersection, then x is a limit point of each set in the collection, so x is in each set, hence in the intersection.`,

  // 20
  `If Σ a_n converges, then a_n → 0. Because a_n = S_n - S_{n-1} where S_n is the partial sum. If Σ a_n converges, S_n → S, so a_n = S_n - S_{n-1} → S - S = 0.`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 3 — Structured but incomplete, missing justifications (10 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 21
  `Let (a_n) be a convergent sequence with a_n → L. Since convergent sequences are bounded, a_n is bounded. Therefore there exists M such that |a_n| ≤ M for all n.`,

  // 22
  `Suppose a_n → A and b_n → B. Then a_n + b_n → A + B. Pick ε > 0. There exist N1, N2 such that |a_n - A| < ε/2 for n ≥ N1 and |b_n - B| < ε/2 for n ≥ N2. Take N = max(N1, N2). Then |(a_n + b_n) - (A + B)| ≤ |a_n - A| + |b_n - B| < ε.`,

  // 23
  `Let a_n ≤ b_n ≤ c_n for all n, and suppose a_n → L and c_n → L. Then b_n → L too. Given ε > 0, eventually a_n > L - ε and c_n < L + ε, so L - ε < a_n ≤ b_n ≤ c_n < L + ε, which means |b_n - L| < ε.`,

  // 24
  `For |r| < 1, the series Σ_{n=0}^∞ r^n = 1/(1-r). The partial sum S_N = (1 - r^{N+1})/(1 - r). Since |r| < 1, r^{N+1} → 0, so S_N → 1/(1-r).`,

  // 25
  `Let f be continuous on [a,b] with f(a) < 0 and f(b) > 0. Then there exists c in (a,b) with f(c) = 0. Define S = {x in [a,b] : f(x) ≤ 0}. Let c = sup S. By continuity, f(c) = 0. The argument uses the fact that f can't jump from negative to positive without hitting zero.`,

  // 26
  `If a_n → A and b_n → B, then a_n * b_n → A * B. Write a_n * b_n - A*B = a_n(b_n - B) + B(a_n - A). Since a_n is convergent it's bounded, say |a_n| ≤ M. Then |a_n * b_n - AB| ≤ M|b_n - B| + |B||a_n - A|. Both terms go to 0, so the product converges.`,

  // 27
  `The series Σ 1/n^p converges if and only if p > 1. For p > 1, use the integral test: ∫_1^∞ x^{-p}dx = 1/(p-1) < ∞. For p ≤ 1, compare with the harmonic series. Σ 1/n diverges by grouping: 1/2 + (1/3 + 1/4) + (1/5+...+1/8) + ... where each group sums to at least 1/2.`,

  // 28
  `Consider the series Σ a_n where a_n > 0 and a_{n+1}/a_n → r < 1. Then Σ a_n converges. Pick r < s < 1. Eventually a_{n+1}/a_n < s, so a_n < C * s^n for some constant C. Since Σ s^n converges (geometric series), comparison gives convergence.`,

  // 29
  `Let f be continuous on [a,b] and define F(x) = ∫_a^x f(t)dt. Then F is differentiable and F'(x) = f(x). We have (F(x+h) - F(x))/h = (1/h)∫_x^{x+h} f(t)dt. By continuity, f(t) is close to f(x) on [x, x+h], so this ratio → f(x) as h → 0.`,

  // 30
  `Let [a_n, b_n] be a nested sequence of closed intervals with b_n - a_n → 0. Then the intersection contains exactly one point. a_n is increasing and bounded above (by b_1), so a_n → a. Similarly b_n → b. Since b_n - a_n → 0, a = b. Call it c. Then c ∈ [a_n, b_n] for all n, and any other point eventually falls outside some interval.`,

  // ═══════════════════════════════════════════════════════════════════════
  // TIER 4 — Nearly rigorous, textbook quality (8 examples)
  // ═══════════════════════════════════════════════════════════════════════

  // 31
  `Suppose a_n → L and a_n → M. Then L = M. Given ε > 0, there exist N1, N2 such that |a_n - L| < ε/2 and |a_n - M| < ε/2 for n ≥ max(N1, N2). By the triangle inequality, |L - M| ≤ |L - a_n| + |a_n - M| < ε. Since ε > 0 was arbitrary, L = M.`,

  // 32
  `Let a_n be increasing and bounded above. Then a_n converges. Let L = sup{a_n : n ∈ N}. For any ε > 0, L - ε is not an upper bound for {a_n}, so there exists N ∈ N with a_N > L - ε. Since a_n is increasing, for all n ≥ N we have L - ε < a_N ≤ a_n ≤ L. Thus |a_n - L| < ε for all n ≥ N.`,

  // 33
  `Let f be continuous at c and let x_n → c. Then f(x_n) → f(c). Given ε > 0, by continuity of f at c there exists δ > 0 such that |x - c| < δ implies |f(x) - f(c)| < ε. Since x_n → c, there exists N ∈ N such that |x_n - c| < δ for all n ≥ N. Therefore |f(x_n) - f(c)| < ε for all n ≥ N.`,

  // 34
  `Prove d/dx(x^n) = n·x^{n-1} for all positive integers n by induction. Base case: d/dx(x^1) = 1 = 1·x^0. Inductive step: assume d/dx(x^k) = k·x^{k-1}. Then d/dx(x^{k+1}) = d/dx(x · x^k) = x^k + x · k·x^{k-1} = x^k + k·x^k = (k+1)·x^k. By induction the result holds for all n ∈ N.`,

  // 35
  `Let (a_n) be Cauchy in R. Then a_n converges. First, (a_n) is bounded: pick N so |a_m - a_n| < 1 for m,n ≥ N, then |a_n| ≤ max(|a_1|,...,|a_{N-1}|, |a_N|+1). By Bolzano-Weierstrass, there exists a convergent subsequence a_{n_k} → L. For any ε > 0, choose K so |a_{n_k} - L| < ε/2 for k ≥ K, and M so |a_m - a_n| < ε/2 for m,n ≥ M. For n ≥ max(M, n_K), |a_n - L| ≤ |a_n - a_{n_K}| + |a_{n_K} - L| < ε.`,

  // 36
  `Between any two real numbers there is a rational number. Let a < b. By the Archimedean property, choose n ∈ N with 1/n < b - a. Let m be the smallest integer with m/n > a. Then m/n ≤ a + 1/n < a + (b - a) = b. So a < m/n < b, and m/n ∈ Q.`,

  // 37
  `If f is continuous on [a,b] then f is Riemann integrable. Since [a,b] is compact and f is continuous, f is uniformly continuous: for any ε > 0 there exists δ > 0 with |f(x) - f(y)| < ε/(b-a) whenever |x-y| < δ. Choose a partition P with mesh(P) < δ. Then U(f,P) - L(f,P) = Σ (M_i - m_i)Δx_i < [ε/(b-a)] · Σ Δx_i = ε. By the Riemann criterion, f is integrable.`,

  // 38
  `The limsup of a bounded sequence (a_n) equals the largest subsequential limit. Let L = lim sup a_n = lim_{n→∞} sup_{k≥n} a_k. For any ε > 0 and any N, there exists k ≥ N with a_k > L - ε (since sup_{k≥N} a_k ≥ L - ε for large N). Also, for large n, sup_{k≥n} a_k < L + ε, so a_k < L + ε for all k ≥ n. Thus we can extract a subsequence converging to L. Conversely, if a_{n_j} → M, then M ≤ sup_{k≥n_j} a_k → L, so M ≤ L.`,
];

export function getRandomExample(lastIndex?: number): { text: string; index: number } {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * EXAMPLES.length);
  } while (idx === lastIndex && EXAMPLES.length > 1);
  return { text: EXAMPLES[idx], index: idx };
}
