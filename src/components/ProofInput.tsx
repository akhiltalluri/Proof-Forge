"use client";

import { useRef, useState, useCallback } from "react";
import { getRandomExample } from "@/lib/examples";
import {
  SYMBOL_GROUPS,
  replaceLatexShortcuts,
  hasLatexContent,
} from "@/lib/symbols";
import MathText from "./MathText";

interface ProofInputProps {
  onSubmit: (proof: string) => void;
  isLoading: boolean;
}

export default function ProofInput({ onSubmit, isLoading }: ProofInputProps) {
  const [text, setText] = useState("");
  const [showToolbar, setShowToolbar] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const lastExampleIdx = useRef<number | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const loadExample = () => {
    const { text: example, index } = getRandomExample(lastExampleIdx.current);
    lastExampleIdx.current = index;
    setText(example);
  };

  const insertSymbol = useCallback(
    (symbol: string) => {
      const ta = textareaRef.current;
      if (!ta) {
        setText((prev) => prev + symbol);
        return;
      }

      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const before = text.slice(0, start);
      const after = text.slice(end);
      const newText = before + symbol + after;
      setText(newText);

      requestAnimationFrame(() => {
        ta.focus();
        const cursor = start + symbol.length;
        ta.setSelectionRange(cursor, cursor);
      });
    },
    [text]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(replaceLatexShortcuts(e.target.value));
  };

  const latexDetected = hasLatexContent(text);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Informal Proof Sketch
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowPreview((v) => !v)}
            className={`rounded-lg border px-2.5 py-1 text-[11px] transition-all ${
              showPreview
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
            title={showPreview ? "Hide LaTeX preview" : "Show LaTeX preview"}
          >
            {showPreview ? "Hide Preview" : "Preview LaTeX"}
          </button>
          <button
            onClick={() => setShowToolbar((v) => !v)}
            className={`rounded-lg border px-2.5 py-1 text-[11px] transition-all ${
              showToolbar
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
            title={showToolbar ? "Hide symbol toolbar" : "Show symbol toolbar"}
          >
            {showToolbar ? "Hide Symbols" : "Show Symbols"}
          </button>
        </div>
      </div>

      {showToolbar && (
        <div className="mb-2 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/40 p-2.5 overflow-x-auto">
          <div className="flex flex-col gap-2">
            {SYMBOL_GROUPS.map((group) => (
              <div key={group.label} className="flex items-center gap-1.5">
                <span className="shrink-0 w-16 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-1">
                  {group.symbols.map((sym) => (
                    <button
                      key={sym.latex}
                      onClick={() => insertSymbol(sym.unicode)}
                      disabled={isLoading}
                      title={sym.latex}
                      className="flex h-7 min-w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-700/40 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 text-sm text-zinc-700 dark:text-zinc-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {sym.display}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-zinc-500 dark:text-zinc-600 leading-relaxed">
            Tip: type LaTeX shortcuts like{" "}
            <code className="text-zinc-400 dark:text-zinc-500">\forall</code>{" "}
            <code className="text-zinc-400 dark:text-zinc-500">\alpha</code>{" "}
            <code className="text-zinc-400 dark:text-zinc-500">\leq</code> followed by a space to
            auto-convert.
          </p>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        placeholder="Paste your rough proof sketch here…"
        className="min-h-[200px] w-full resize-none rounded-xl border border-zinc-300 dark:border-zinc-700/60 bg-zinc-100 dark:bg-zinc-800/50 p-4 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
        disabled={isLoading}
      />

      {showPreview && (
        <div className="mt-2 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-zinc-50 dark:bg-zinc-800/30 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              LaTeX Preview
            </span>
          </div>
          {text.trim() ? (
            latexDetected ? (
              <MathText className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                {text}
              </MathText>
            ) : (
              <div>
                <p className="mb-2 text-xs text-amber-400/80">
                  No LaTeX expressions detected. Wrap math in{" "}
                  <code className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 text-amber-300">
                    $...$
                  </code>{" "}
                  to see rendered output.
                </p>
                <MathText className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {text}
                </MathText>
              </div>
            )
          ) : (
            <p className="text-xs text-zinc-500 dark:text-zinc-600 italic">
              Start typing to see a preview.
            </p>
          )}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Forging…
            </span>
          ) : (
            "Forge Proof"
          )}
        </button>
        <button
          onClick={loadExample}
          disabled={isLoading}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-4 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 transition-all hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Load Example
        </button>
      </div>
    </div>
  );
}
