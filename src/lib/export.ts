import { ProofResult } from "@/types/proof";

export function proofToMarkdown(result: ProofResult): string {
  const lines: string[] = [];

  lines.push("# Proof\n");

  lines.push("## Assumptions\n");
  result.assumptions.forEach((a) => lines.push(`- ${a}`));
  lines.push("");

  lines.push("## Proof\n");
  lines.push(result.polishedProof);
  lines.push("");

  lines.push("## Steps\n");
  result.steps.forEach((step) => {
    const warn = step.hasWarning ? ` ⚠️ ${step.warning}` : "";
    lines.push(`**Step ${step.number}.** ${step.statement}`);
    lines.push(`  *Justification:* ${step.justification}${warn}\n`);
  });

  lines.push("## Conclusion\n");
  lines.push(result.conclusion);
  lines.push("");

  return lines.join("\n");
}

export function proofToPlainText(result: ProofResult): string {
  const lines: string[] = [];

  lines.push("ASSUMPTIONS:");
  result.assumptions.forEach((a) => lines.push(`  • ${a}`));
  lines.push("");

  lines.push("PROOF:");
  lines.push(result.polishedProof);
  lines.push("");

  lines.push("STEPS:");
  result.steps.forEach((step) => {
    const warn = step.hasWarning ? ` [WARNING: ${step.warning}]` : "";
    lines.push(`  ${step.number}. ${step.statement}`);
    lines.push(`     Justification: ${step.justification}${warn}`);
  });
  lines.push("");

  lines.push("CONCLUSION:");
  lines.push(result.conclusion);

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

export function downloadAsFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
