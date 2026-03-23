"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ProofInput from "@/components/ProofInput";
import ProofOutput from "@/components/ProofOutput";
import ApiKeyModal from "@/components/ApiKeyModal";
import {
  ProofResult,
  ProofSuggestion,
  PipelineStage,
  ProofType,
  ApiResponse,
  DemoFixtureId,
} from "@/types/proof";
import { titleFromProof } from "@/lib/archive-helpers";

export default function ForgePage() {
  const [result, setResult] = useState<ProofResult | null>(null);
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [lastProof, setLastProof] = useState<string>("");
  const [hasKey, setHasKey] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [lastIsDemo, setLastIsDemo] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [prefillText, setPrefillText] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoading = stage !== "idle" && stage !== "done";

  useEffect(() => {
    const stored = localStorage.getItem("proof-forge-api-key");
    setHasKey(!!(stored || apiKey));
  }, [apiKey]);

  useEffect(() => {
    fetch("/api/archive/cleanup", { method: "POST" }).catch(() => {});
  }, []);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((d: { demoMode?: boolean }) => setDemoMode(!!d.demoMode))
      .catch(() => setDemoMode(false));
  }, []);

  useEffect(() => {
    const p = sessionStorage.getItem("proof-forge-prefill");
    if (p) {
      setPrefillText(p);
      sessionStorage.removeItem("proof-forge-prefill");
    }
  }, []);

  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const runDemo = useCallback(async (fixtureId: DemoFixtureId) => {
    setStage("classifying");
    setError(null);
    setResult(null);
    setLastProof("");
    setLastIsDemo(true);

    const t1 = setTimeout(() => setStage("polishing"), 400);
    const t2 = setTimeout(() => setStage("verifying"), 900);
    const t3 = setTimeout(() => setStage("suggesting"), 1400);

    try {
      const res = await fetch("/api/forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ demo: true, demoFixture: fixtureId }),
      });
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);

      const data: ApiResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Demo failed.");
        setStage("idle");
        setLastIsDemo(false);
      } else if (data.data) {
        setResult(data.data);
        setStage("done");
        showToast("Demo loaded — no API usage");
      }
    } catch {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      setError("Network error.");
      setStage("idle");
      setLastIsDemo(false);
    }
  }, [showToast]);

  const runPipeline = useCallback(
    async (proof: string, forceType?: ProofType) => {
      setStage("classifying");
      setError(null);
      setResult(null);
      setLastProof(proof);
      setLastIsDemo(false);

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

          if (!data.demo) {
            fetch("/api/archive", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                proof,
                title: titleFromProof(proof),
                result: data.data,
              }),
            })
              .then(() => showToast("Saved to archive"))
              .catch(() => {});
          }
        }
      } catch {
        clearTimeout(stageTimer);
        clearTimeout(stageTimer2);
        clearTimeout(stageTimer3);
        setError("Network error. Please check your connection and try again.");
        setStage("idle");
      }
    },
    [apiKey, showToast]
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
    <>
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-2 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Turn a rough mathematical sketch into a clearer, structured proof — with heuristic checks on gaps and structure.
        </p>
        {!hasKey && !demoMode && (
          <button
            onClick={() => setShowKeyModal(true)}
            className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-all hover:border-zinc-400 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-200"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>
            Set API Key to forge with the live model
          </button>
        )}
        {demoMode && (
          <p className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400">
            Demo mode on — use Run Demo for sample outputs without an API key.
          </p>
        )}
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-6">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
              <svg className="h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto text-red-400/60 hover:text-red-300">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-2">
            <ProofInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              demoMode={demoMode}
              onRunDemo={runDemo}
              prefillText={prefillText}
              onConsumePrefill={() => setPrefillText(null)}
            />
            <ProofOutput
              result={result}
              stage={stage}
              onRetryWithSuggestion={handleRetryWithSuggestion}
              isLoading={isLoading}
              isDemo={lastIsDemo}
              onNotify={showToast}
            />
          </div>
        </div>
      </main>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 shadow-lg dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {toast}
        </div>
      )}

      <ApiKeyModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSave={setApiKey}
      />
    </>
  );
}
