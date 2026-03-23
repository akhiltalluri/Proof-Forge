"use client";

import { ProofSuggestion, PROOF_TYPE_LABELS } from "@/types/proof";
import MathText from "./MathText";

interface SuggestionCardProps {
  suggestion: ProofSuggestion;
  onSelect: (suggestion: ProofSuggestion) => void;
  disabled: boolean;
}

export default function SuggestionCard({
  suggestion,
  onSelect,
  disabled,
}: SuggestionCardProps) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-800/30 p-4 transition-all hover:border-indigo-500/40 hover:bg-zinc-800/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/20">
              {PROOF_TYPE_LABELS[suggestion.proofType]}
            </span>
          </div>
          <h4 className="text-sm font-medium text-zinc-200">
            {suggestion.label}
          </h4>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
            {suggestion.description}
          </p>
          <div className="mt-2 rounded-lg bg-zinc-900/40 px-3 py-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              Sketch
            </span>
            <MathText className="mt-1 text-xs text-zinc-400 leading-relaxed">
              {suggestion.sketch}
            </MathText>
          </div>
        </div>
      </div>
      <button
        onClick={() => onSelect(suggestion)}
        disabled={disabled}
        className="mt-3 w-full rounded-lg bg-indigo-600/80 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        Retry with this approach
      </button>
    </div>
  );
}
