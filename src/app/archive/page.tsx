"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import MathText from "@/components/MathText";
import { MATH_DOMAIN_LABELS, PROOF_TYPE_LABELS } from "@/types/proof";
import type { MathDomain, ProofType } from "@/types/proof";

interface ArchivedProof {
  id: string;
  title: string;
  mathDomain: string;
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

const DOMAIN_KEYS = Object.keys(MATH_DOMAIN_LABELS) as MathDomain[];
const TYPE_KEYS = Object.keys(PROOF_TYPE_LABELS) as ProofType[];

export default function ArchivePage() {
  const router = useRouter();
  const [proofs, setProofs] = useState<ArchivedProof[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, domainFilter, typeFilter]);

  const showToast = (message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  };

  const fetchProofs = useCallback(
    async (p: number) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(p));
        params.set("limit", "50");
        if (debouncedSearch.trim()) params.set("q", debouncedSearch.trim());
        if (domainFilter) params.set("domain", domainFilter);
        if (typeFilter) params.set("proofType", typeFilter);

        const res = await fetch(`/api/archive?${params}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setProofs(data.proofs || []);
        setTotal(data.total || 0);
      } catch {
        setProofs([]);
      } finally {
        setLoading(false);
      }
    },
    [debouncedSearch, domainFilter, typeFilter]
  );

  useEffect(() => {
    fetchProofs(page);
  }, [page, fetchProofs]);

  const goForgeWithText = (text: string) => {
    sessionStorage.setItem("proof-forge-prefill", text);
    router.push("/forge");
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/archive/${id}`, { method: "DELETE", cache: "no-store" });
    showToast("Deleted from proof history");
    fetchProofs(page);
  };

  const handleClearAll = async () => {
    if (!confirm("Delete all archived proofs? This cannot be undone.")) return;
    const res = await fetch("/api/archive", {
      method: "DELETE",
      cache: "no-store",
    });
    if (res.ok) {
      showToast("Proof history cleared");
      fetchProofs(1);
      setPage(1);
    }
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

  const listTitle = (proof: ArchivedProof) =>
    proof.title?.trim() ||
    (proof.informalProof.slice(0, 80) + (proof.informalProof.length > 80 ? "..." : ""));

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Proof History
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Search, filter, re-forge, or duplicate past drafts as your proofs improve.
          </p>
          <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
            {total} entr{total === 1 ? "y" : "ies"} match the current filters
          </p>
        </div>
        {total > 0 && (
          <button
            onClick={handleClearAll}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search titles or proof text..."
          className="min-w-[220px] flex-1 rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 outline-none focus:border-indigo-500/60 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200"
        />
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200"
        >
          <option value="">All domains</option>
          {DOMAIN_KEYS.map((key) => (
            <option key={key} value={key}>
              {MATH_DOMAIN_LABELS[key]}
            </option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200"
        >
          <option value="">All proof types</option>
          {TYPE_KEYS.map((key) => (
            <option key={key} value={key}>
              {PROOF_TYPE_LABELS[key]}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-indigo-500 dark:border-zinc-700 dark:border-t-indigo-400" />
        </div>
      ) : proofs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No proofs match your filters yet.
          </p>
          <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
            Forge a new proof and it will show up here automatically.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {proofs.map((proof) => (
            <div
              key={proof.id}
              className="rounded-xl border border-zinc-200 bg-zinc-50 transition-all dark:border-zinc-700/50 dark:bg-zinc-800/30"
            >
              <button
                type="button"
                onClick={() => setExpanded(expanded === proof.id ? null : proof.id)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                    {listTitle(proof)}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500">
                    {formatDate(proof.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 shrink-0">
                  {proof.mathDomain && MATH_DOMAIN_LABELS[proof.mathDomain as MathDomain] && (
                    <span className="rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-700 dark:text-sky-300">
                      {MATH_DOMAIN_LABELS[proof.mathDomain as MathDomain]}
                    </span>
                  )}
                  <span className="rounded-full border border-violet-500/25 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
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
                </div>
              </button>

              {expanded === proof.id && (
                <div className="border-t border-zinc-200 p-4 dark:border-zinc-700/50">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => goForgeWithText(proof.informalProof)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-indigo-500"
                    >
                      Re-forge
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        goForgeWithText(
                          `${proof.informalProof}\n\n---\n(Edit below after duplicating from history)\n`
                        );
                        showToast("Opened duplicate in Forge");
                      }}
                      className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500"
                    >
                      Duplicate & Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(proof.id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>

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
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-800 shadow-lg dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100">
          {toast}
        </div>
      )}
    </div>
  );
}
