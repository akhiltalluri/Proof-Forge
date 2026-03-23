export function titleFromProof(proof: string): string {
  const cleaned = proof.replace(/\s+/g, " ").trim();
  if (!cleaned) return "Untitled proof";
  return cleaned.slice(0, 72) + (cleaned.length > 72 ? "..." : "");
}
