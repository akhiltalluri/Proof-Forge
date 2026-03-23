"use client";

import { useRef, useState } from "react";
import { getRandomExample } from "@/lib/examples";

interface ProofInputProps {
  onSubmit: (proof: string) => void;
  isLoading: boolean;
}

export default function ProofInput({ onSubmit, isLoading }: ProofInputProps) {
  const [text, setText] = useState("");
  const lastExampleIdx = useRef<number | undefined>(undefined);

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-100">
          Informal Proof Sketch
        </h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-medium text-indigo-300 border border-indigo-500/30">
            Real Analysis
          </span>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your rough proof sketch here…"
        className="flex-1 min-h-[260px] w-full resize-none rounded-xl border border-zinc-700/60 bg-zinc-800/50 p-4 text-sm leading-relaxed text-zinc-200 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
        disabled={isLoading}
      />

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
          className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Load Example
        </button>
      </div>
    </div>
  );
}
