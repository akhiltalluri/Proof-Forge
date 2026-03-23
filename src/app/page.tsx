"use client";

import { useState, useCallback, useEffect } from "react";
import ProofInput from "@/components/ProofInput";
import ProofOutput from "@/components/ProofOutput";
import ApiKeyModal from "@/components/ApiKeyModal";
import {
  ProofResult,
  ProofSuggestion,
  PipelineStage,
  ProofType,
  ApiResponse,
} from "@/types/proof";

export default function Home() {
  const [result, setResult] = useState<ProofResult | null>(null);
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [lastProof, setLastProof] = useState<string>("");
  const [hasKey, setHasKey] = useState(false);

  const isLoading = stage !== "idle" && stage !== "done";

  useEffect(() => {
    const stored = localStorage.getItem("proof-forge-api-key");
    setHasKey(!!(stored || apiKey));
  }, [apiKey]);

  const runPipeline = useCallback(
    async (proof: string, forceType?: ProofType) => {
      setStage("classifying");
      setError(null);
      setResult(null);
      setLastProof(proof);

      const key =
        typeof window !== "undefined"
          ? localStorage.getItem("proof-forge-api-key") ?? apiKey
          : apiKey;

      const stageTimer = setTimeout(() => setStage("polishing"), 2000);
      const stageTimer2 = setTimeout(() => setStage("verifying"), 5000);
      const stageTimer3 = setTimeout(() => setStage("suggesting"), 8000);

      try {
        const res = await fetch("/api/forge", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            proof,
            apiKey: key || undefined,
            proofType: forceType || undefined,
          }),
        });

        clearTimeout(stageTimer);
        clearTimeout(stageTimer2);
        clearTimeout(stageTimer3);

        const data: ApiResponse = await res.json();

        if (!data.success) {
          setError(data.error ?? "Something went wrong.");
          setStage("idle");
        } else if (data.data) {
          setResult(data.data);
          setStage("done");
        }
      } catch {
        clearTimeout(stageTimer);
        clearTimeout(stageTimer2);
        clearTimeout(stageTimer3);
        setError("Network error. Please check your connection and try again.");
        setStage("idle");
      }
    },
    [apiKey]
  );

  const handleSubmit = useCallback(
    (proof: string) => runPipeline(proof),
    [runPipeline]
  );

  const handleRetryWithSuggestion = useCallback(
    (suggestion: ProofSuggestion) => {
      if (lastProof) {
        runPipeline(lastProof, suggestion.proofType);
      }
    },
    [lastProof, runPipeline]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <div className="relative">
        <button
          onClick={() => setShowKeyModal(true)}
          className={`absolute right-6 top-6 flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
            hasKey
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
              : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
            />
          </svg>
          {hasKey ? "API Key Set" : "Set API Key"}
        </button>
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
            Proof Forge
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Paste a rough proof sketch, get a clean formal proof back — with every step verified.
          </p>
          <p className="mt-1 text-xs text-zinc-600">
            made by Akhil Talluri
          </p>
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <svg
                className="h-5 w-5 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <p className="text-sm text-red-300">{error}</p>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-400/60 hover:text-red-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-2">
            <ProofInput onSubmit={handleSubmit} isLoading={isLoading} />
            <ProofOutput
              result={result}
              stage={stage}
              onRetryWithSuggestion={handleRetryWithSuggestion}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800/50 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs text-zinc-600">
            Proof Forge provides structural assistance and heuristic
            verification, not formal proof checking. Always verify results
            independently.
          </p>
        </div>
      </footer>

      <ApiKeyModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={setApiKey}
      />
    </div>
  );
}
