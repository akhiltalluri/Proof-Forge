"use client";

import { ProofStep } from "@/types/proof";
import MathText from "./MathText";

interface StepCardProps {
  step: ProofStep;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        step.hasWarning
          ? "border-amber-500/40 bg-amber-500/5"
          : "border-zinc-200 bg-zinc-50 dark:border-zinc-700/50 dark:bg-zinc-800/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            step.hasWarning
              ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
              : "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400"
          }`}
        >
          {step.number}
        </span>
        <div className="flex-1 min-w-0">
          <MathText className="text-sm text-zinc-800 leading-relaxed dark:text-zinc-200">
            {step.statement}
          </MathText>
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-500">
            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Justification:
            </span>{" "}
            {step.justification}
          </p>
          {step.hasWarning && step.warning && (
            <div className="mt-2 flex items-start gap-2 rounded-lg bg-amber-500/10 px-3 py-2">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-xs text-amber-900/90 leading-relaxed dark:text-amber-300/90">
                {step.warning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
