"use client";

import { VerificationResult } from "@/types/proof";

interface VerificationBadgeProps {
  verification: VerificationResult;
  proofTypeLabel?: string;
}

export default function VerificationBadge({
  verification,
  proofTypeLabel,
}: VerificationBadgeProps) {
  const { passed, score, summary } = verification;

  const scoreColor =
    score >= 90
      ? "text-emerald-400"
      : score >= 70
        ? "text-yellow-400"
        : score >= 50
          ? "text-orange-400"
          : "text-red-400";

  const ringColor =
    score >= 90
      ? "border-emerald-500/40"
      : score >= 70
        ? "border-yellow-500/40"
        : score >= 50
          ? "border-orange-500/40"
          : "border-red-500/40";

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-4 ${
        passed
          ? "border-emerald-500/30 bg-emerald-500/5"
          : "border-red-500/30 bg-red-500/5"
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${ringColor}`}
      >
        <span className={`text-lg font-bold ${scoreColor}`}>{score}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {passed ? (
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          )}
          <span
            className={`text-sm font-semibold ${passed ? "text-emerald-300" : "text-red-300"}`}
          >
            {passed ? "Verification Passed" : "Verification Failed"}
          </span>
          {proofTypeLabel && (
            <span className="rounded-full bg-violet-500/15 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300 border border-violet-500/25">
              {proofTypeLabel}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
