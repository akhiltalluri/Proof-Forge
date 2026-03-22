"use client";

import { useState } from "react";
import { ProofResult } from "@/types/proof";
import MathText from "./MathText";
import StepCard from "./StepCard";

type Tab = "proof" | "steps" | "structure";

interface ProofOutputProps {
  result: ProofResult | null;
  isLoading: boolean;
}

export default function ProofOutput({ result, isLoading }: ProofOutputProps) {
  const [activeTab, setActiveTab] = useState<Tab>("proof");

  const tabs: { id: Tab; label: string }[] = [
    { id: "proof", label: "Polished Proof" },
    { id: "steps", label: "Steps" },
    { id: "structure", label: "Structure" },
  ];

  const warningCount =
    result?.steps.filter((s) => s.hasWarning).length ?? 0;

  if (isLoading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-zinc-700/40 bg-zinc-800/20 p-8">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-300">
            Forging your proof…
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Analyzing structure and rewriting
          </p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-700/60 p-8 text-center">
        <div className="rounded-full bg-zinc-800 p-3">
          <svg
            className="h-6 w-6 text-zinc-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
        </div>
        <p className="text-sm text-zinc-400">
          Your polished proof will appear here
        </p>
        <p className="text-xs text-zinc-600">
          Paste an informal proof sketch and click &quot;Polish Proof&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-zinc-700/50 pb-3 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-zinc-700/50 text-zinc-100"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
            {tab.id === "steps" && warningCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[10px] font-bold text-amber-400">
                {warningCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto">
        {activeTab === "proof" && (
          <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-5">
            <MathText className="text-sm leading-relaxed text-zinc-200 proof-text">
              {result.polishedProof}
            </MathText>
          </div>
        )}

        {activeTab === "steps" && (
          <div className="flex flex-col gap-3">
            {result.steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        )}

        {activeTab === "structure" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Assumptions
              </h3>
              <ul className="space-y-1.5">
                {result.assumptions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/60" />
                    <MathText className="text-zinc-300">{a}</MathText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-700/40 bg-zinc-800/30 p-4">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Conclusion
              </h3>
              <MathText className="text-sm text-zinc-300">
                {result.conclusion}
              </MathText>
            </div>
            {warningCount > 0 && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400/80">
                  Flagged Steps ({warningCount})
                </h3>
                <ul className="space-y-1.5">
                  {result.steps
                    .filter((s) => s.hasWarning)
                    .map((s) => (
                      <li
                        key={s.number}
                        className="text-sm text-amber-300/80"
                      >
                        Step {s.number}: {s.warning}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
