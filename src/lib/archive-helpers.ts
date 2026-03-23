/** Short label for archive list from informal proof text */
export function titleFromProof(text: string, maxLen = 80): string {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= maxLen) return t || "Untitled proof";
  return `${t.slice(0, maxLen - 3)}...`;
}
