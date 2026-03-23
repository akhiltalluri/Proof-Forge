"use client";

import { useState } from "react";
import {
  ProofResult,
  ProofSuggestion,
  PipelineStage,
  PROOF_TYPE_LABELS,
  MATH_DOMAIN_LABELS,
} from "@/types/proof";
import { hasLatexContent } from "@/lib/symbols";
import { proofToMarkdown, copyToClipboard } from "@/lib/export-proof";
import MathText from "./MathText";
import StepCard from "./StepCard";
import VerificationBadge from "./VerificationBadge";
import VulnerabilityCard from "./VulnerabilityCard";
import SuggestionCard from "./SuggestionCard";

type Tab = "proof" | "steps" | "structure" | "verification";

interface ProofOutputProps {
  result: ProofResult | null;
  stage: PipelineStage;
  onRetryWithSuggestion: (suggestion: ProofSuggestion) => void;
  isLoading: boolean;
  /** Canned demo response (no API) */
  isDemo?: boolean;
  onNotify?: (message: string) => void;
}

const STAGE_LABELS: Record<PipelineStage, { title: string; sub: string }> = {
  idle: { title: "", sub: "" },
  classifying: {
    title: "Classifying proof…",
    sub: "Detecting structure and proof technique",
  },
  polishing: {
    title: "Polishing argument…",
    sub: "Rewriting into clearer, structured steps",
  },
  verifying: {
    title: "Checking for gaps…",
    sub: "Stress-testing logic and justifications",
  },
  suggesting: {
    title: "Generating suggestions…",
    sub: "Alternative proof approaches you could try",
  },
  done: { title: "", sub: "" },
};

export default function ProofOutput({
  result,
  stage,
  onRetryWithSuggestion,
  isLoading,
  isDemo,
  onNotify,
}: ProofOutputProps) {
  const [activeTab, setActiveTab] = useState<Tab>("proof");
  const [viewMode, setViewMode] = useState<"rendered" | "preview" | "raw">("rendered");

  const warningCount =
    result?.steps.filter((s) => s.hasWarning).length ?? 0;
  const vulnCount = result?.verification?.vulnerabilities?.length ?? 0;

  if (isLoading || (stage !== "idle" && stage !== "done")) {
    const label = STAGE_LABELS[stage] || STAGE_LABELS.classifying;
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-zinc-200 bg-zinc-100 p-8 dark:border-zinc-700/40 dark:bg-zinc-800/20">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400 dark:border-t-indigo-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label.title}</p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{label.sub}</p>
        </div>
        <div className="flex items-center gap-2 mt-2">
          {(["classifying", "polishing", "verifying", "suggesting"] as const).map(
            (s) => (
              <div
                key={s}
                className={`h-1.5 w-8 rounded-full transition-all ${
                  s === stage
                    ? "bg-indigo-400 dark:bg-indigo-500"
                    : (["classifying", "polishing", "verifying", "suggesting"].indexOf(s) <
                      ["classifying", "polishing", "verifying", "suggesting"].indexOf(stage))
                      ? "bg-indigo-300/70 dark:bg-indigo-500/40"
                      : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700/60">
        <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800">
          <svg
            className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
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
        <p className="max-w-sm text-sm font-medium text-zinc-600 dark:text-zinc-300">
          Output panel — polished proof, steps, and verification show up here
        </p>
        <p className="max-w-xs text-xs text-zinc-500 dark:text-zinc-500">
          Paste a sketch on the left, use <strong>Load Example</strong> or <strong>Run Demo</strong> (when enabled), then <strong>Forge Proof</strong>.
        </p>
      </div>
    );
  }

  const domainLabel = result.mathDomain
    ? MATH_DOMAIN_LABELS[result.mathDomain]
    : undefined;

  const handleCopyMd = async () => {
    const ok = await copyToClipboard(proofToMarkdown(result));
    onNotify?.(ok ? "Copied Markdown to clipboard" : "Could not copy");
  };

  const handleCopyLatex = async () => {
    const ok = await copyToClipboard(result.polishedProof);
    onNotify?.(ok ? "Copied polished proof (LaTeX/plain) to clipboard" : "Could not copy");
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "proof", label: "Polished Proof" },
    { id: "structure", label: "Structure" },
    { id: "steps", label: "Steps" },
    { id: "verification", label: "Verification" },
  ];

  return (
    <div className="flex h-full flex-col">
      {isDemo && (
        <div className="mb-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-[11px] text-amber-800 dark:text-amber-200">
          Demo mode: sample output only — no API usage. Set <code className="rounded bg-black/10 px-1 dark:bg-white/10">DEMO_MODE=true</code> and use Run Demo to explore.
        </div>
      )}
      {/* Verification badge with inline proof type */}
      <div className="mb-4">
        <VerificationBadge
          verification={result.verification}
          proofTypeLabel={PROOF_TYPE_LABELS[result.proofType]}
          mathDomainLabel={domainLabel}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-zinc-200 pb-3 mb-4 dark:border-zinc-700/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-zinc-200/80 text-zinc-900 dark:bg-zinc-700/50 dark:text-zinc-100"
                : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            {tab.label}
            {tab.id === "steps" && warningCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-100 px-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-400">
                {warningCount}
              </span>
            )}
            {tab.id === "verification" && vulnCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-100 px-1 text-[10px] font-bold text-red-700 dark:bg-red-500/20 dark:text-red-400">
                {vulnCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto">
        {activeTab === "proof" && (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700/40 dark:bg-zinc-800/30">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={handleCopyMd}
                  className="rounded-lg border border-zinc-300 px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-all hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Copy Markdown
                </button>
                <button
                  type="button"
                  onClick={handleCopyLatex}
                  className="rounded-lg border border-zinc-300 px-2.5 py-1 text-[11px] font-medium text-zinc-600 transition-all hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Copy polished text
                </button>
              </div>
              <div className="flex items-center rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-700/50">
                {(["rendered", "preview", "raw"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
                      viewMode === mode
                        ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-700/60 dark:text-zinc-100"
                        : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
                    }`}
                  >
                    {mode === "rendered"
                      ? "Rendered"
                      : mode === "preview"
                        ? "LaTeX Preview"
                        : "Raw LaTeX"}
                  </button>
                ))}
              </div>
            </div>
            {viewMode === "rendered" && (
              <MathText className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 proof-text">
                {result.polishedProof}
              </MathText>
            )}
            {viewMode === "preview" && (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/50 dark:bg-zinc-800/30">
                <div className="mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    LaTeX Preview
                  </span>
                </div>
                {hasLatexContent(result.polishedProof) ? (
                  <MathText className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {result.polishedProof}
                  </MathText>
                ) : (
                  <div>
                    <p className="mb-2 text-xs text-amber-700/90 dark:text-amber-400/80">
                      No LaTeX expressions detected in the polished proof.
                    </p>
                    <div className="whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {result.polishedProof}
                    </div>
                  </div>
                )}
              </div>
            )}
            {viewMode === "raw" && (
              <pre className="whitespace-pre-wrap break-words text-sm leading-relaxed text-zinc-700 font-mono dark:text-zinc-300">
                {result.polishedProof}
              </pre>
            )}
          </div>
        )}

        {activeTab === "steps" && (
          <div className="flex flex-col gap-3">
            {result.steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        )}

        {activeTab === "verification" && (
          <div className="flex flex-col gap-4">
            {vulnCount > 0 ? (
              <>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Vulnerabilities Found ({vulnCount})
                </h3>
                {result.verification.vulnerabilities.map((v, i) => (
                  <VulnerabilityCard key={i} vulnerability={v} />
                ))}
              </>
            ) : (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                  No vulnerabilities found. The proof holds up under scrutiny.
                </p>
              </div>
            )}

            {/* Suggestions when verification failed */}
            {result.suggestions && result.suggestions.length > 0 && (
              <div className="mt-2">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Alternative Approaches
                </h3>
                <div className="grid gap-3 sm:grid-cols-1">
                  {result.suggestions.map((s) => (
                    <SuggestionCard
                      key={s.id}
                      suggestion={s}
                      onSelect={onRetryWithSuggestion}
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "structure" && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/40 dark:bg-zinc-800/30">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Assumptions
              </h3>
              <ul className="space-y-1.5">
                {result.assumptions.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 dark:bg-indigo-500/60" />
                    <MathText className="text-zinc-700 dark:text-zinc-300">{a}</MathText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700/40 dark:bg-zinc-800/30">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Conclusion
              </h3>
              <MathText className="text-sm text-zinc-700 dark:text-zinc-300">
                {result.conclusion}
              </MathText>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
