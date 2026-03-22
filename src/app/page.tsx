"use client";

import { useState, useCallback } from "react";
import ProofInput from "@/components/ProofInput";
import ProofOutput from "@/components/ProofOutput";
import ApiKeyModal from "@/components/ApiKeyModal";
import { ProofResult, ApiResponse } from "@/types/proof";

export default function Home() {
  const [result, setResult] = useState<ProofResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  const hasKey =
    typeof window !== "undefined"
      ? !!(localStorage.getItem("proof-forge-api-key") || apiKey)
      : false;

  const handleSubmit = useCallback(
    async (proof: string) => {
      setIsLoading(true);
      setError(null);
      setResult(null);

      const key =
        typeof window !== "undefined"
          ? localStorage.getItem("proof-forge-api-key") ?? apiKey
          : apiKey;

      try {
        const res = await fetch("/api/rewrite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proof, apiKey: key || undefined }),
        });

        const data: ApiResponse = await res.json();

        if (!data.success) {
          setError(data.error ?? "Something went wrong.");
        } else if (data.data) {
          setResult(data.data);
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey]
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                className="h-4 w-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-zinc-100">
                Proof Forge
              </h1>
              <p className="text-xs text-zinc-500">
                Rough proof in, clean proof out
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
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
        </div>
      </header>

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

          <div className="grid gap-8 lg:grid-cols-2">
            <ProofInput onSubmit={handleSubmit} isLoading={isLoading} />
            <ProofOutput result={result} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800/50 py-6">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-xs text-zinc-600">
            Proof Forge provides proof polishing and structural assistance, not
            formal verification. Always verify results independently.
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
