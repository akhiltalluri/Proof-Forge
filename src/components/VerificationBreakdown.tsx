"use client";

import { VerificationResult } from "@/types/proof";

interface VerificationBreakdownProps {
  verification: VerificationResult;
}

function formatPoints(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function getScoreTone(score: number): string {
  if (score >= 85) return "border-emerald-500/25 bg-emerald-500/8";
  if (score >= 70) return "border-amber-500/25 bg-amber-500/8";
  return "border-red-500/25 bg-red-500/8";
}

export default function VerificationBreakdown({
  verification,
}: VerificationBreakdownProps) {
  const rubric = verification.rubric ?? [];

  if (rubric.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-[22px] border border-zinc-200 bg-zinc-50/90 p-4 dark:border-zinc-700/40 dark:bg-zinc-800/30">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Scoring Breakdown
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          Final score = weighted rubric total. Each category explains both why it
          matters and why points were kept or docked.
        </p>
      </div>

      {rubric.map((item) => {
        const earned = (item.score * item.weight) / 100;
        const docked = Math.max(0, item.weight - earned);

        return (
          <div
            key={item.id}
            className={`rounded-[22px] border p-4 ${getScoreTone(item.score)}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.label}
                </h4>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  Weight: {item.weight} points
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatPoints(earned)} / {item.weight}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Docked {formatPoints(docked)} points
                </p>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-zinc-200/80 bg-white/70 p-3 dark:border-zinc-700/50 dark:bg-zinc-900/40">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Why This Weight Exists
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.weightReason}
                </p>
              </div>
              <div className="rounded-lg border border-zinc-200/80 bg-white/70 p-3 dark:border-zinc-700/50 dark:bg-zinc-900/40">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Why Points Were Docked
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {item.diagnosis}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
