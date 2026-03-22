import OpenAI from "openai";
import { ProofResult } from "@/types/proof";
import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt";

export async function rewriteProof(
  informalProof: string,
  apiKey: string
): Promise<ProofResult> {
  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 4096,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: buildUserPrompt(informalProof) },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  const cleaned = content
    .replace(/```json\s*/g, "")
    .replace(/```\s*/g, "")
    .trim();

  const parsed: ProofResult = JSON.parse(cleaned);

  if (!parsed.polishedProof || !Array.isArray(parsed.steps)) {
    throw new Error("Invalid response structure from model");
  }

  return parsed;
}
