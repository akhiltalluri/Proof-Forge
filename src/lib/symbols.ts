export interface MathSymbol {
  latex: string;
  unicode: string;
  display: string;
}

export interface SymbolGroup {
  label: string;
  symbols: MathSymbol[];
}

export const SYMBOL_GROUPS: SymbolGroup[] = [
  {
    label: "Greek",
    symbols: [
      { latex: "\\alpha", unicode: "α", display: "α" },
      { latex: "\\beta", unicode: "β", display: "β" },
      { latex: "\\gamma", unicode: "γ", display: "γ" },
      { latex: "\\delta", unicode: "δ", display: "δ" },
      { latex: "\\epsilon", unicode: "ε", display: "ε" },
      { latex: "\\sigma", unicode: "σ", display: "σ" },
      { latex: "\\pi", unicode: "π", display: "π" },
      { latex: "\\omega", unicode: "ω", display: "ω" },
      { latex: "\\phi", unicode: "φ", display: "φ" },
      { latex: "\\psi", unicode: "ψ", display: "ψ" },
      { latex: "\\lambda", unicode: "λ", display: "λ" },
      { latex: "\\mu", unicode: "μ", display: "μ" },
      { latex: "\\theta", unicode: "θ", display: "θ" },
    ],
  },
  {
    label: "Logic",
    symbols: [
      { latex: "\\forall", unicode: "∀", display: "∀" },
      { latex: "\\exists", unicode: "∃", display: "∃" },
      { latex: "\\implies", unicode: "⟹", display: "⟹" },
      { latex: "\\iff", unicode: "⟺", display: "⟺" },
      { latex: "\\neg", unicode: "¬", display: "¬" },
      { latex: "\\land", unicode: "∧", display: "∧" },
      { latex: "\\lor", unicode: "∨", display: "∨" },
    ],
  },
  {
    label: "Relations",
    symbols: [
      { latex: "\\leq", unicode: "≤", display: "≤" },
      { latex: "\\geq", unicode: "≥", display: "≥" },
      { latex: "\\neq", unicode: "≠", display: "≠" },
      { latex: "\\in", unicode: "∈", display: "∈" },
      { latex: "\\notin", unicode: "∉", display: "∉" },
      { latex: "\\subset", unicode: "⊂", display: "⊂" },
      { latex: "\\subseteq", unicode: "⊆", display: "⊆" },
      { latex: "\\approx", unicode: "≈", display: "≈" },
      { latex: "\\equiv", unicode: "≡", display: "≡" },
    ],
  },
  {
    label: "Operators",
    symbols: [
      { latex: "\\sum", unicode: "∑", display: "∑" },
      { latex: "\\prod", unicode: "∏", display: "∏" },
      { latex: "\\int", unicode: "∫", display: "∫" },
      { latex: "\\infty", unicode: "∞", display: "∞" },
      { latex: "\\partial", unicode: "∂", display: "∂" },
      { latex: "\\nabla", unicode: "∇", display: "∇" },
      { latex: "\\sqrt", unicode: "√", display: "√" },
    ],
  },
  {
    label: "Arrows",
    symbols: [
      { latex: "\\to", unicode: "→", display: "→" },
      { latex: "\\leftarrow", unicode: "←", display: "←" },
      { latex: "\\leftrightarrow", unicode: "↔", display: "↔" },
      { latex: "\\mapsto", unicode: "↦", display: "↦" },
    ],
  },
];

export const LATEX_TO_UNICODE: Record<string, string> =
  SYMBOL_GROUPS.flatMap((g) => g.symbols).reduce(
    (map, s) => {
      map[s.latex] = s.unicode;
      return map;
    },
    {} as Record<string, string>
  );

export function replaceLatexShortcuts(text: string): string {
  return text.replace(/\\[a-zA-Z]+ /g, (match) => {
    const cmd = match.trimEnd();
    return LATEX_TO_UNICODE[cmd] !== undefined
      ? LATEX_TO_UNICODE[cmd] + " "
      : match;
  });
}
