import type { ProofResult } from "@/types/proof";

/** Markdown-friendly export of a forged proof (for notes / README / papers). */
export function proofToMarkdown(result: ProofResult): string {
  const lines: string[] = [];
  lines.push(`## Polished proof\n\n${result.polishedProof.replace(/\n/g, "\n\n")}\n`);
  lines.push(`## Structure\n\n**Assumptions:**\n`);
  for (const a of result.assumptions) lines.push(`- ${a}`);
  lines.push(`\n**Conclusion:** ${result.conclusion}\n`);
  lines.push(`## Steps\n`);
  for (const s of result.steps) {
    lines.push(`### Step ${s.number}\n${s.statement}\n\n*Justification:* ${s.justification}`);
    if (s.hasWarning && s.warning) lines.push(`\n*⚠ ${s.warning}*`);
    lines.push("");
  }
  lines.push(`## Verification (heuristic)\n\nScore: **${result.verification.score} / 100** — ${result.verification.passed ? "Passed" : "Did not pass"}\n\n${result.verification.summary}\n`);
  if (result.verification.vulnerabilities.length) {
    lines.push(`### Issues\n`);
    for (const v of result.verification.vulnerabilities) {
      lines.push(`- Step ${v.step} (${v.severity}): ${v.issue}`);
    }
  }
  return lines.join("\n");
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
