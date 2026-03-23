"use client";

import { useState, useEffect, useCallback } from "react";
import MathText from "@/components/MathText";

interface ArchivedProof {
  id: string;
  informalProof: string;
  polishedProof: string;
  proofType: string;
  score: number;
  passed: boolean;
  stepsJson: string;
  assumptionsJson: string;
  conclusion: string;
  verificationJson: string;
  suggestionsJson: string | null;
  createdAt: string;
}

export default function ArchivePage() {
  const [proofs, setProofs] = useState<ArchivedProof[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchProofs = useCallback(async (p: number) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/archive?page=${p}&limit=20`);
      const data = await res.json();
      setProofs(data.proofs);
      setTotal(data.total);
    } catch {
      setProofs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProofs(page);
  }, [page, fetchProofs]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/archive/${id}`, { method: "DELETE" });
    fetchProofs(page);
  };

  const handleClearAll = async () => {
    if (!confirm("Delete all archived proofs? This cannot be undone.")) return;
    for (const p of proofs) {
      await fetch(`/api/archive/${p.id}`, { method: "DELETE" });
    }
    setPage(1);
    fetchProofs(1);
  };

  const formatDate = (d: string) => {
    const date = new Date(d);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Proof Archive
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {total} archived proof{total !== 1 ? "s" : ""}
          </p>
        </div>
        {proofs.length > 0 && (
          <button
            onClick={handleClearAll}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-500 dark:border-zinc-700 dark:border-t-indigo-400" />
        </div>
      ) : proofs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <svg className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            No archived proofs yet
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Forge a proof and it will appear here automatically.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {proofs.map((proof) => (
              <div
                key={proof.id}
                className="rounded-xl border border-zinc-200 bg-zinc-50 transition-all dark:border-zinc-700/50 dark:bg-zinc-800/30"
              >
                <button
                  onClick={() => setExpanded(expanded === proof.id ? null : proof.id)}
                  className="flex w-full items-center gap-4 p-4 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {proof.informalProof.slice(0, 100)}
                      {proof.informalProof.length > 100 ? "…" : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                      {formatDate(proof.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="rounded-full border border-violet-500/25 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold capitalize text-violet-700 dark:text-violet-300">
                      {proof.proofType.replace(/_/g, " ")}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                        proof.passed
                          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "border-red-500/25 bg-red-500/10 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {proof.score}/100
                    </span>
                    <svg
                      className={`h-4 w-4 text-zinc-400 transition-transform ${
                        expanded === proof.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {expanded === proof.id && (
                  <div className="border-t border-zinc-200 p-4 dark:border-zinc-700/50">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <div>
                        <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Informal Proof
                        </h4>
                        <div className="rounded-lg bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">
                          <MathText>{proof.informalProof}</MathText>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Polished Proof
                        </h4>
                        <div className="rounded-lg bg-zinc-100 p-3 text-sm text-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-300">
                          <MathText>{proof.polishedProof}</MathText>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(proof.id);
                        }}
                        className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:border-zinc-400 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-400"
              >
                Previous
              </button>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
                className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:border-zinc-400 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-400"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
