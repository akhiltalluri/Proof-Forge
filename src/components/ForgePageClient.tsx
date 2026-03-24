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
  ForgeMode,
} from "@/types/proof";
import { titleFromProof } from "@/lib/archive-helpers";

interface ForgePageClientProps {
  initialDemoModeAvailable: boolean;
  initialLiveModeAvailable: boolean;
}

const MODE_STORAGE_KEY = "proof-forge-mode";

function resolveInitialMode(
  savedMode: string | null,
  demoModeAvailable: boolean,
  liveModeAvailable: boolean
): ForgeMode {
  if (savedMode === "demo" && demoModeAvailable) return "demo";
  if (savedMode === "live" && liveModeAvailable) return "live";
  if (demoModeAvailable) return "demo";
  return "live";
}

export default function ForgePageClient({
  initialDemoModeAvailable,
  initialLiveModeAvailable,
}: ForgePageClientProps) {
  const [result, setResult] = useState<ProofResult | null>(null);
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [error, setError] = useState<string | null>(null);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [lastProof, setLastProof] = useState<string>("");
  const [hasKey, setHasKey] = useState(false);
  const [demoModeAvailable, setDemoModeAvailable] = useState(
    initialDemoModeAvailable
  );
  const [serverLiveModeAvailable, setServerLiveModeAvailable] = useState(
    initialLiveModeAvailable
  );
  const [currentMode, setCurrentMode] = useState<ForgeMode>(() =>
    initialDemoModeAvailable ? "demo" : "live"
  );
  const [modeReady, setModeReady] = useState(false);
  const [lastIsDemo, setLastIsDemo] = useState(false);
  const [lastDemoKind, setLastDemoKind] = useState<"fixture" | "mock" | null>(
    null
  );
  const [toast, setToast] = useState<string | null>(null);
  const [prefillText, setPrefillText] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoading = stage !== "idle" && stage !== "done";
  const liveModeAvailable = serverLiveModeAvailable || hasKey;
  const modeDescription =
    currentMode === "demo"
      ? "Demo mode uses the local mock/demo pipeline. No OpenAI API key is required."
      : liveModeAvailable
        ? "Live mode uses the OpenAI API for model-backed rewriting and feedback."
        : "Live mode uses the OpenAI API. Add a server-side or browser-stored API key to use it.";

  useEffect(() => {
    const storedKey = localStorage.getItem("proof-forge-api-key") ?? "";
    setHasKey(!!(storedKey || apiKey));
  }, [apiKey]);

  useEffect(() => {
    fetch("/api/archive/cleanup", {
      method: "POST",
      cache: "no-store",
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("proof-forge-prefill");
    if (saved) {
      setPrefillText(saved);
      sessionStorage.removeItem("proof-forge-prefill");
    }
  }, []);

  useEffect(() => {
    const storedKey = localStorage.getItem("proof-forge-api-key") ?? "";
    const localLiveAvailable = !!storedKey;
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY);

    fetch("/api/config", { cache: "no-store" })
      .then((response) => response.json())
      .then(
        (data: { demoModeAvailable?: boolean; liveModeAvailable?: boolean }) => {
          const nextDemoAvailable = data.demoModeAvailable !== false;
          const nextServerLiveAvailable = !!data.liveModeAvailable;
          const nextMode = resolveInitialMode(
            savedMode,
            nextDemoAvailable,
            nextServerLiveAvailable || localLiveAvailable
          );

          setDemoModeAvailable(nextDemoAvailable);
          setServerLiveModeAvailable(nextServerLiveAvailable);
          setCurrentMode(nextMode);
          setModeReady(true);
        }
      )
      .catch(() => {
        const nextMode = resolveInitialMode(
          savedMode,
          initialDemoModeAvailable,
          initialLiveModeAvailable || localLiveAvailable
        );
        setCurrentMode(nextMode);
        setModeReady(true);
      });
  }, [initialDemoModeAvailable, initialLiveModeAvailable]);

  useEffect(() => {
    if (!modeReady) return;
    localStorage.setItem(MODE_STORAGE_KEY, currentMode);
  }, [currentMode, modeReady]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const handleModeChange = useCallback(
    (mode: ForgeMode) => {
      setCurrentMode(mode);
      setError(null);

      if (mode === "demo") {
        showToast("Demo mode selected");
        return;
      }

      if (liveModeAvailable) {
        showToast("Live mode selected");
      } else {
        showToast("Live mode needs an API key");
      }
    },
    [liveModeAvailable, showToast]
  );

  const runDemo = useCallback(
    async (fixtureId: DemoFixtureId) => {
      setStage("classifying");
      setError(null);
      setResult(null);
      setLastProof("");
      setLastIsDemo(true);
      setLastDemoKind("fixture");

      const t1 = setTimeout(() => setStage("polishing"), 350);
      const t2 = setTimeout(() => setStage("verifying"), 850);
      const t3 = setTimeout(() => setStage("suggesting"), 1300);

      try {
        const res = await fetch("/api/forge", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "demo",
            demo: true,
            demoFixture: fixtureId,
          }),
        });

        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);

        const data: ApiResponse = await res.json();
        if (!data.success) {
          setError(data.error ?? "Demo failed.");
          setStage("idle");
          setLastIsDemo(false);
          setLastDemoKind(null);
        } else if (data.data) {
          setResult(data.data);
          setStage("done");
          setLastIsDemo(!!data.demo);
          setLastDemoKind(data.demo ? data.demoKind ?? "fixture" : null);
          showToast("Demo loaded with canned fixture data");
        }
      } catch {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        setError("Demo failed to load.");
        setStage("idle");
        setLastIsDemo(false);
        setLastDemoKind(null);
      }
    },
    [showToast]
  );

  const runPipeline = useCallback(
    async (proof: string, forceType?: ProofType) => {
      if (currentMode === "live" && !liveModeAvailable) {
        setError(
          "Live mode is selected, but no OpenAI API key is available. Add one in the settings modal or switch to Demo mode."
        );
        setShowKeyModal(true);
        return;
      }

      setStage("classifying");
      setError(null);
      setResult(null);
      setLastProof(proof);
      setLastIsDemo(false);
      setLastDemoKind(null);

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
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: currentMode,
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
          setLastIsDemo(!!data.demo);
          setLastDemoKind(data.demo ? data.demoKind ?? "mock" : null);

          if (!data.demo) {
            fetch("/api/archive", {
              method: "POST",
              cache: "no-store",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                proof,
                title: titleFromProof(proof),
                result: data.data,
              }),
            })
              .then(() => showToast("Saved to proof history"))
              .catch(() => {});
          } else if (data.demoKind === "mock") {
            showToast("Offline mock demo result generated locally");
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
    [apiKey, currentMode, liveModeAvailable, showToast]
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
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-4">
        <div className="surface-panel relative overflow-hidden rounded-[28px] px-6 py-7 sm:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background:linear-gradient(135deg,rgba(99,102,241,0.08),transparent_40%,rgba(16,185,129,0.08))]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500 dark:text-zinc-400">
                Mathematical Proof-Writing Assistant
              </p>
              <h1 className="display-font text-4xl font-semibold leading-none text-zinc-900 sm:text-5xl dark:text-zinc-100">
                Refine the argument.
                <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                  Keep the idea.
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                Turn rough mathematical proof sketches into clearer,
                better-structured arguments with proof typing, heuristic
                verification, and revision support across multiple areas of
                math.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900/60">
                Proof Types
              </span>
              <span className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900/60">
                Domain Tags
              </span>
              <span className="rounded-full border border-zinc-200 bg-white/75 px-3 py-1 dark:border-zinc-700 dark:bg-zinc-900/60">
                Heuristic Checks
              </span>
            </div>
          </div>
        </div>

        <div className="soft-rule mt-5" />

        <div className="pt-4">
          <div className="flex flex-col items-center gap-3 text-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
                Mode
              </p>
              <div className="mt-2 inline-flex rounded-full border border-zinc-200 bg-white/80 p-1 dark:border-zinc-700 dark:bg-zinc-900/70">
                {(["demo", "live"] as const).map((mode) => {
                  const active = currentMode === mode;
                  const unavailable = mode === "live" && !liveModeAvailable;
                  return (
                    <button
                      key={mode}
                      onClick={() => handleModeChange(mode)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                        active
                          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                          : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                      }`}
                    >
                      {mode === "demo" ? "Demo" : "Live"}
                      {unavailable ? " (Needs Key)" : ""}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="max-w-2xl space-y-1">
              <p
                className={`text-[11px] ${
                  currentMode === "demo"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : liveModeAvailable
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {modeDescription}
              </p>
              {currentMode === "live" && !liveModeAvailable && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <p className="text-[11px] text-amber-600 dark:text-amber-400">
                    No server-side key is configured, and no browser-stored API key is available yet.
                  </p>
                  <button
                    onClick={() => setShowKeyModal(true)}
                    className="rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-medium text-amber-700 transition-all hover:bg-amber-500/20 dark:text-amber-300"
                  >
                    Add API Key
                  </button>
                </div>
              )}
              {demoModeAvailable && currentMode === "demo" && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  Demo mode includes canned fixtures plus offline mock results for custom proof input.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-6">
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

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)]">
            <ProofInput
              onSubmit={handleSubmit}
              isLoading={isLoading}
              demoMode={currentMode === "demo" && demoModeAvailable}
              liveModeAvailable={liveModeAvailable}
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
              demoKind={lastDemoKind}
              onNotify={showToast}
            />
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 shadow-lg dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
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
