"use client";

import { useState } from "react";
import { Domain, DOMAIN_LABELS } from "@/lib/prompt";

interface ProofInputProps {
  onSubmit: (proof: string, domain: Domain) => void;
  isLoading: boolean;
}

const EXAMPLES: Record<Domain, string> = {
  "real-analysis": `Let (a_n) be a convergent sequence with a_n → L. Since convergent sequences are bounded, a_n is bounded. Therefore there exists M such that |a_n| ≤ M for all n.`,
  "discrete-math": `Prove that for all n ≥ 1, 1 + 2 + ... + n = n(n+1)/2. Base case is obvious. For the inductive step, assume it holds for n = k. Then adding k+1 to both sides gives the result for k+1.`,
};

const DOMAINS = Object.keys(DOMAIN_LABELS) as Domain[];

export default function ProofInput({ onSubmit, isLoading }: ProofInputProps) {
  const [text, setText] = useState("");
  const [domain, setDomain] = useState<Domain>("real-analysis");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim(), domain);
    }
  };

  const loadExample = () => {
    setText(EXAMPLES[domain]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-zinc-100">
          Informal Proof Sketch
        </h2>
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value as Domain)}
          disabled={isLoading}
          className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30 outline-none cursor-pointer transition-all hover:bg-indigo-500/25 disabled:opacity-40 appearance-none"
        >
          {DOMAINS.map((d) => (
            <option key={d} value={d} className="bg-zinc-900 text-zinc-200">
              {DOMAIN_LABELS[d]}
            </option>
          ))}
        </select>
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
              Polishing…
            </span>
          ) : (
            "Polish Proof"
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
