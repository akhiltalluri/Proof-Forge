"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { getRandomExample } from "@/lib/examples";
import { PROOF_TEMPLATES } from "@/lib/proof-templates";
import {
  SYMBOL_GROUPS,
  replaceLatexShortcuts,
  hasLatexContent,
} from "@/lib/symbols";
import type { DemoFixtureId } from "@/types/proof";
import { PROOF_TYPE_LABELS, MATH_DOMAIN_LABELS } from "@/types/proof";
import MathText from "./MathText";
import { DEMO_FIXTURE_LIST } from "@/lib/demo-fixtures";

interface ProofInputProps {
  onSubmit: (proof: string) => void;
  isLoading: boolean;
  demoMode?: boolean;
  onRunDemo?: (fixtureId: DemoFixtureId) => void;
  /** When set (e.g. from archive “Re-forge”), replaces textarea content once */
  prefillText?: string | null;
  onConsumePrefill?: () => void;
}

const DIFF_LABEL = {
  intro: "Intro",
  intermediate: "Intermediate",
  stretch: "Stretch",
} as const;

export default function ProofInput({
  onSubmit,
  isLoading,
  demoMode,
  onRunDemo,
  prefillText,
  onConsumePrefill,
}: ProofInputProps) {
  const [text, setText] = useState("");
  const [showToolbar, setShowToolbar] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [exampleMeta, setExampleMeta] = useState<ReturnType<
    typeof getRandomExample
  >["meta"] | null>(null);
  const lastExampleIdx = useRef<number | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (prefillText != null && prefillText !== "") {
      setText(prefillText);
      setExampleMeta(null);
      onConsumePrefill?.();
    }
  }, [prefillText, onConsumePrefill]);

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const loadExample = () => {
    const { text: example, index, meta } = getRandomExample(lastExampleIdx.current);
    lastExampleIdx.current = index;
    setText(example);
    setExampleMeta(meta);
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

  const insertTemplate = (tpl: string) => {
    const ta = textareaRef.current;
    if (!ta) {
      setText((prev) => (prev ? `${prev}\n\n${tpl}` : tpl));
      return;
    }
    const start = ta.selectionStart;
    const before = text.slice(0, start);
    const after = text.slice(ta.selectionEnd);
    const newText = before + (before && !before.endsWith("\n") ? "\n\n" : "") + tpl + after;
    setText(newText);
    setExampleMeta(null);
    requestAnimationFrame(() => {
      ta.focus();
      const pos = newText.length - after.length;
      ta.setSelectionRange(pos, pos);
    });
  };

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
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
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
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
            title={showToolbar ? "Hide symbol toolbar" : "Show symbol toolbar"}
          >
            {showToolbar ? "Hide Symbols" : "Show Symbols"}
          </button>
          <button
            onClick={() => setShowTemplates((v) => !v)}
            className={`rounded-lg border px-2.5 py-1 text-[11px] transition-all ${
              showTemplates
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
            title="Insert proof outline templates"
          >
            Templates
          </button>
        </div>
      </div>

      {exampleMeta && (
        <div className="mb-2 flex flex-wrap gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 p-2.5 text-[10px] dark:border-zinc-700/50 dark:bg-zinc-800/40">
          <span className="rounded-full bg-zinc-200 px-2 py-0.5 font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
            {exampleMeta.topic}
          </span>
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-violet-700 dark:text-violet-300">
            {PROOF_TYPE_LABELS[exampleMeta.proofType]}
          </span>
          <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2 py-0.5 text-sky-700 dark:text-sky-300">
            {MATH_DOMAIN_LABELS[exampleMeta.domain]}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-amber-800 dark:text-amber-200">
            {DIFF_LABEL[exampleMeta.difficulty]}
          </span>
          <p className="w-full text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-600 dark:text-zinc-300">Common pitfall:</span>{" "}
            {exampleMeta.pitfall}
          </p>
        </div>
      )}

      {showTemplates && (
        <div className="mb-2 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/40">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Outlines (insert at cursor)
          </p>
          <div className="flex flex-wrap gap-1">
            {PROOF_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                disabled={isLoading}
                onClick={() => insertTemplate(t.text)}
                className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[10px] font-medium text-zinc-600 transition-all hover:border-indigo-500/40 hover:text-indigo-700 disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:text-indigo-300"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

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
                      className="flex h-7 min-w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-700/40 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 text-sm text-zinc-700 dark:text-zinc-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-30 disabled:cursor-not-allowed"
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
                <p className="mb-2 text-xs text-amber-700/90 dark:text-amber-400/80">
                  No LaTeX expressions detected. Wrap math in{" "}
                  <code className="rounded bg-zinc-200 dark:bg-zinc-800 px-1 py-0.5 text-amber-800 dark:text-amber-300">
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

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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
        {demoMode && onRunDemo && (
          <div className="relative inline-flex items-center gap-1">
            <select
              disabled={isLoading}
              defaultValue=""
              onChange={(e) => {
                const v = e.target.value as DemoFixtureId;
                if (v) {
                  onRunDemo(v);
                  e.target.value = "";
                }
              }}
              className="max-w-[140px] rounded-lg border border-emerald-500/40 bg-emerald-500/10 py-2 pl-2 pr-6 text-xs font-medium text-emerald-800 dark:text-emerald-200 disabled:opacity-40 sm:max-w-[200px]"
            >
              <option value="">Run Demo…</option>
              {DEMO_FIXTURE_LIST.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {demoMode && (
        <p className="mt-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
          Demo uses canned results — no OpenAI key or credits required.
        </p>
      )}
    </div>
  );
}
