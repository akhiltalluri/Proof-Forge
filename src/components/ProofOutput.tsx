"use client";

import { useState } from "react";
import { ProofResult } from "@/types/proof";
import {
  proofToPlainText,
  proofToMarkdown,
  copyToClipboard,
  downloadAsFile,
} from "@/lib/export";
import MathText from "./MathText";
import StepCard from "./StepCard";

type Tab = "proof" | "steps" | "structure";

interface ProofOutputProps {
  result: ProofResult | null;
  isLoading: boolean;
}

export default function ProofOutput({ result, isLoading }: ProofOutputProps) {
  const [activeTab, setActiveTab] = useState<Tab>("proof");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!result) return;
    const ok = await copyToClipboard(proofToPlainText(result));
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadAsFile(proofToMarkdown(result), "proof.md");
  };

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
      <div className="flex items-center justify-between border-b border-zinc-700/50 pb-3 mb-4">
        <div className="flex items-center gap-1">
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
                Copy
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-2.5 py-1.5 text-xs text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download .md
          </button>
        </div>
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
