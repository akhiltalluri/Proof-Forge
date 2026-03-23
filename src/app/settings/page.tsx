"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

type Theme = "light" | "dark" | "system";

const RETENTION_OPTIONS = [
  { label: "7 days", value: 7 },
  { label: "14 days", value: 14 },
  { label: "30 days", value: 30 },
  { label: "60 days", value: 60 },
  { label: "90 days", value: 90 },
  { label: "Forever", value: 0 },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [apiKey, setApiKey] = useState("");
  const [retention, setRetention] = useState(30);
  const [retentionSaved, setRetentionSaved] = useState(false);
  const [keySaved, setKeySaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("proof-forge-api-key") ?? "";
    setApiKey(stored);

    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data?.archiveRetentionDays !== undefined) {
          setRetention(data.archiveRetentionDays);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem("proof-forge-api-key", apiKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleClearKey = () => {
    localStorage.removeItem("proof-forge-api-key");
    setApiKey("");
  };

  const handleRetentionChange = async (val: number) => {
    setRetention(val);
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archiveRetentionDays: val }),
    });
    setRetentionSaved(true);
    setTimeout(() => setRetentionSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Settings
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Configure your Proof Forge experience.
      </p>

      {/* Appearance */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Appearance
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          Choose how Proof Forge looks.
        </p>
        <div className="mt-3 inline-flex rounded-xl border border-zinc-200 p-1 dark:border-zinc-700">
          {(["light", "system", "dark"] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                theme === t
                  ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Archive Retention */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Archive Retention
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          How long to keep archived proofs before automatic cleanup.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {RETENTION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleRetentionChange(opt.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-all ${
                retention === opt.value
                  ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
                  : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {retentionSaved && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            Retention period saved.
          </p>
        )}
      </section>

      {/* API Key */}
      <section className="mt-8">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          OpenAI API Key
        </h2>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          Stored in your browser and sent only to this app&apos;s API routes when you forge (proxied to OpenAI). Not stored in the SQLite database.
        </p>
        <div className="mt-3 flex gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="flex-1 rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:placeholder:text-zinc-600"
          />
          <button
            onClick={handleSaveKey}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500"
          >
            Save
          </button>
          {apiKey && (
            <button
              onClick={handleClearKey}
              className="rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-500 transition-all hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-red-500/40 dark:hover:text-red-400"
            >
              Clear
            </button>
          )}
        </div>
        {keySaved && (
          <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
            API key saved.
          </p>
        )}
      </section>

      {/* About */}
      <section className="mt-8 rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          About Proof Forge
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Proof-writing helper for clearer structure and heuristic gap-checks across many areas of math — not formal verification. Built by Akhil Talluri as a passion project.
        </p>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
            v0.1.0
          </span>
          <a
            href="https://github.com/akhiltalluri/Proof-Forge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-indigo-600 hover:underline dark:text-indigo-400"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
