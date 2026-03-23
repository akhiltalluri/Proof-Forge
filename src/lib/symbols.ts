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
    label: "Sets",
    symbols: [
      { latex: "\\mathbb{R}", unicode: "ℝ", display: "ℝ" },
      { latex: "\\mathbb{N}", unicode: "ℕ", display: "ℕ" },
      { latex: "\\mathbb{Z}", unicode: "ℤ", display: "ℤ" },
      { latex: "\\mathbb{Q}", unicode: "ℚ", display: "ℚ" },
      { latex: "\\mathbb{C}", unicode: "ℂ", display: "ℂ" },
      { latex: "\\emptyset", unicode: "∅", display: "∅" },
      { latex: "\\cup", unicode: "∪", display: "∪" },
      { latex: "\\cap", unicode: "∩", display: "∩" },
      { latex: "\\setminus", unicode: "∖", display: "∖" },
    ],
  },
  {
    label: "Relations",
    symbols: [
      { latex: "<", unicode: "<", display: "<" },
      { latex: ">", unicode: ">", display: ">" },
      { latex: "\\leq", unicode: "≤", display: "≤" },
      { latex: "\\geq", unicode: "≥", display: "≥" },
      { latex: "\\neq", unicode: "≠", display: "≠" },
      { latex: "\\in", unicode: "∈", display: "∈" },
      { latex: "\\notin", unicode: "∉", display: "∉" },
      { latex: "\\subset", unicode: "⊂", display: "⊂" },
      { latex: "\\subseteq", unicode: "⊆", display: "⊆" },
      { latex: "\\supset", unicode: "⊃", display: "⊃" },
      { latex: "\\supseteq", unicode: "⊇", display: "⊇" },
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

export const UNICODE_TO_LATEX: Record<string, string> =
  SYMBOL_GROUPS.flatMap((g) => g.symbols).reduce(
    (map, s) => {
      map[s.unicode] = s.latex;
      return map;
    },
    {} as Record<string, string>
  );

const UNICODE_PATTERN = new RegExp(
  Object.keys(UNICODE_TO_LATEX)
    .sort((a, b) => b.length - a.length)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "g"
);

/**
 * Convert informal proof text with Unicode math symbols into inline LaTeX
 * while leaving ordinary prose outside math mode so words do not get
 * italicized.
 */
export function convertToLatex(text: string): string {
  const protectedBlocks: string[] = [];
  const protect = (value: string) => {
    const index = protectedBlocks.push(value) - 1;
    return `@@LATEX_BLOCK_${index}@@`;
  };

  let converted = text.replace(
    /(\$\$[\s\S]*?\$\$|\$[^$]+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\])/g,
    (match) => protect(match)
  );

  converted = converted.replace(UNICODE_PATTERN, (match) => {
    const latex = UNICODE_TO_LATEX[match];
    return latex ? ` $${latex}$ ` : match;
  });

  converted = converted
    .replace(
      /\b([A-Za-z0-9_(){}\[\]]+)\s+\$(\\(?:in|notin|subseteq|subset|supseteq|supset|leq|geq|neq|approx|equiv|cup|cap|setminus|to|mapsto|leftarrow|leftrightarrow|implies|iff|land|lor))\$\s+([A-Za-z0-9_(){}\[\]]+)\b/g,
      (_, left, operator, right) => `$${left} ${operator} ${right}$`
    )
    .replace(
      /\$(\\(?:forall|exists))\$\s+([A-Za-z][A-Za-z0-9_]*)/g,
      (_, quantifier, variable) => `$${quantifier} ${variable}$`
    )
    .replace(/\s{2,}/g, " ");

  return converted.replace(/@@LATEX_BLOCK_(\d+)@@/g, (_, idx) => protectedBlocks[Number(idx)]);
}

export function hasLatexContent(text: string): boolean {
  return /\$[^$]+\$/.test(text) || /\\\(.*?\\\)/.test(text) || /\\\[[\s\S]*?\\]/.test(text);
}

export function stripLatexDelimiters(text: string): string {
  return text
    .replace(/\$\$([^$]+)\$\$/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\\\((.+?)\\\)/g, "$1")
    .replace(/\\\[(.+?)\\]/g, "$1")
    .replace(/\\(?:text|mathrm|mathbf|mathit|textbf|textit)\{([^}]*)\}/g, "$1")
    .replace(/\\(?:left|right|big|Big|bigg|Bigg)[.!|()[\]{}]?/g, "")
    .replace(/\\{/g, "{")
    .replace(/\\}/g, "}")
    .replace(/\\\\/g, "\n");
}
