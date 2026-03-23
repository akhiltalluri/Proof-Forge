/** Insertable skeletons for common proof shapes (user fills in details). */
export const PROOF_TEMPLATES: { id: string; label: string; text: string }[] = [
  {
    id: "direct",
    label: "Direct proof",
    text: "We prove P.\n\nAssume [hypotheses].\n\n[Chain of deductions.]\n\nTherefore P holds.\n",
  },
  {
    id: "contradiction",
    label: "Contradiction",
    text: "We prove P by contradiction.\n\nSuppose ¬P. Then [deduce consequences].\n\nThis contradicts [known fact]. Hence P.\n",
  },
  {
    id: "contrapositive",
    label: "Contrapositive",
    text: "We show (¬Q) ⇒ (¬P), which is equivalent to P ⇒ Q.\n\nAssume ¬Q.\n\n[Show ¬P follows.]\n\nThus the contrapositive holds, so P ⇒ Q.\n",
  },
  {
    id: "induction",
    label: "Induction",
    text: "We prove ∀n∈ℕ, P(n) by induction.\n\nBase case (n=0 or n=1): [verify P(n₀)].\n\nInductive step: Assume P(k). Then [show P(k+1)].\n\nBy induction, P(n) for all n.\n",
  },
  {
    id: "epsilon",
    label: "Epsilon–delta limit",
    text: "We show lim_{x→a} f(x) = L.\n\nLet ε > 0. We seek δ > 0 such that 0 < |x-a| < δ implies |f(x)-L| < ε.\n\n[Bound |f(x)-L| in terms of |x-a| and choose δ.]\n\nThis completes the proof.\n",
  },
  {
    id: "cases",
    label: "Proof by cases",
    text: "We consider all cases.\n\nCase 1: [condition]. Then [conclusion in this case].\n\nCase 2: [condition]. Then [conclusion in this case].\n\nCases are exhaustive, so [final conclusion].\n",
  },
];
