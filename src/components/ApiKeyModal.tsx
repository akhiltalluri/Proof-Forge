"use client";

import { useState, useEffect } from "react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  onSave,
}: ApiKeyModalProps) {
  const [key, setKey] = useState("");

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem("proof-forge-api-key") ?? "";
      setKey(saved);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem("proof-forge-api-key", key);
    onSave(key);
    onClose();
  };

  const handleClear = () => {
    localStorage.removeItem("proof-forge-api-key");
    setKey("");
    onSave("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-zinc-700/60 bg-zinc-900 p-6 shadow-2xl">
        <h2 className="text-lg font-semibold text-zinc-100">
          OpenAI API Key
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Your key is stored locally in your browser and sent only to the
          Next.js server route, which proxies requests to OpenAI. It is never
          logged or persisted on the server.
        </p>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-..."
          className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
        />
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
          >
            Clear key
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-400 transition-all hover:border-zinc-500 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
