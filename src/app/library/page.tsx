"use client";

import { useEffect, useMemo, useState } from "react";
import {
  LIBRARY_ENTRIES,
  BRANCH_LIST,
  TYPE_LIST,
  LibraryEntry,
} from "@/lib/library-data";
import { formatLibraryType, getLibraryDetail } from "@/lib/library-detail";
import MathText from "@/components/MathText";
import { convertToLatex } from "@/lib/symbols";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<LibraryEntry | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return LIBRARY_ENTRIES.filter((e) => {
      if (activeBranch && e.branch !== activeBranch) return false;
      if (activeType && e.type !== activeType) return false;
      if (q && !e.name.toLowerCase().includes(q) && !e.statement.toLowerCase().includes(q) && !e.branch.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [search, activeBranch, activeType]);

  const grouped = useMemo(() => {
    const map = new Map<string, LibraryEntry[]>();
    for (const entry of filtered) {
      const list = map.get(entry.branch) || [];
      list.push(entry);
      map.set(entry.branch, list);
    }
    return map;
  }, [filtered]);

  useEffect(() => {
    if (!selectedEntry) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedEntry(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEntry]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Mathematical Library
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Browse {LIBRARY_ENTRIES.length} curated axioms, definitions, theorems, and more across {BRANCH_LIST.length} branches of mathematics.
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, statement, or branch…"
          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:placeholder:text-zinc-500"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Branch
          </span>
          <button
            onClick={() => setActiveBranch(null)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
              !activeBranch
                ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            All
          </button>
          {BRANCH_LIST.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBranch(activeBranch === b ? null : b)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-all ${
                activeBranch === b
                  ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Type
          </span>
          <button
            onClick={() => setActiveType(null)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize transition-all ${
              !activeType
                ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            }`}
          >
            All
          </button>
          {TYPE_LIST.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(activeType === t ? null : t)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium capitalize transition-all ${
                activeType === t
                  ? "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-zinc-400 dark:text-zinc-500">
        Showing {filtered.length} of {LIBRARY_ENTRIES.length} entries
      </p>

      {/* Grouped entries */}
      {grouped.size === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No entries match your filters.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {Array.from(grouped.entries()).map(([branch, entries]) => (
            <section key={branch}>
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-800 dark:text-zinc-200">
                {branch}
                <span className="text-xs font-normal text-zinc-400 dark:text-zinc-500">
                  ({entries.length})
                </span>
              </h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((entry) => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    onOpen={() => setSelectedEntry(entry)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {selectedEntry && (
        <EntryDetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
}

const TYPE_COLORS: Record<string, string> = {
  axiom: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/25",
  definition: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/25",
  lemma: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/25",
  proposition: "bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/25",
  theorem: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  law: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/25",
  corollary: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/25",
};

function EntryCard({
  entry,
  onOpen,
}: {
  entry: LibraryEntry;
  onOpen: () => void;
}) {
  return (
    <article className="group rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 text-left transition-all hover:border-indigo-500/30 hover:bg-zinc-100 dark:border-zinc-700/50 dark:bg-zinc-800/30 dark:hover:bg-zinc-800/50">
      <div className="flex items-start justify-between gap-2 mb-1">
        <button
          type="button"
          onClick={onOpen}
          className="text-left text-sm font-medium leading-snug text-zinc-800 transition-colors hover:text-indigo-700 dark:text-zinc-200 dark:hover:text-indigo-300"
        >
          {entry.name}
        </button>
        <span
          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${
            TYPE_COLORS[entry.type] || ""
          }`}
        >
          {formatLibraryType(entry.type)}
        </span>
      </div>
      <p className="mt-0.5 text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2">
        {entry.statement.replace(/\$[^$]*\$/g, "…")}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 text-[11px] font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
      >
        Open full explanation
      </button>
    </article>
  );
}

function EntryDetailModal({
  entry,
  onClose,
}: {
  entry: LibraryEntry;
  onClose: () => void;
}) {
  const detail = getLibraryDetail(entry);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="surface-panel max-h-[90vh] w-full max-w-4xl overflow-auto rounded-[28px] p-6 sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400 dark:text-zinc-500">
              Library Detail
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              {entry.name}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                  TYPE_COLORS[entry.type] || ""
                }`}
              >
                {formatLibraryType(entry.type)}
              </span>
              <span className="rounded-full border border-zinc-300 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
                {entry.branch}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4">
          <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/90 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Formal Statement
            </h3>
            <MathText className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
              {entry.statement}
            </MathText>
            {entry.notes && (
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">{entry.notes}</p>
            )}
          </section>

          <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/90 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              In Simpler Language
            </h3>
            <MathText className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {convertToLatex(detail.explanation)}
            </MathText>
          </section>

          <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/90 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Examples
            </h3>
            <div className="grid gap-3">
              {detail.examples.map((example, index) => (
                <div
                  key={`${entry.id}-example-${index}`}
                  className="rounded-2xl border border-zinc-200 bg-white/90 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  <MathText className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {convertToLatex(example)}
                  </MathText>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-zinc-200 bg-zinc-50/90 p-5 dark:border-zinc-700/50 dark:bg-zinc-800/30">
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
              Practice Problems
            </h3>
            <div className="grid gap-3">
              {detail.problems.map((problem, index) => (
                <div
                  key={`${entry.id}-problem-${index}`}
                  className="rounded-2xl border border-zinc-200 bg-white/90 p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                    Problem {index + 1}
                  </p>
                  <MathText className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {convertToLatex(problem)}
                  </MathText>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
