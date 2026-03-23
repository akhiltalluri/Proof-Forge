import { NextRequest, NextResponse } from "next/server";
import { forgeProof } from "@/lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { proof, apiKey } = await req.json();

    if (!proof || typeof proof !== "string" || proof.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a proof." },
        { status: 400 }
      );
    }

    const key = apiKey || process.env.OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No API key found. Set OPENAI_API_KEY in .env.local or provide one in the settings panel.",
        },
        { status: 401 }
      );
    }

    const result = await forgeProof(proof.trim(), key);
    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    const lowerMessage = message.toLowerCase();

    if (message.includes("Incorrect API key")) {
      return NextResponse.json(
        { success: false, error: "Invalid OpenAI API key." },
        { status: 401 }
      );
    }

    if (
      lowerMessage.includes("fetch failed") ||
      lowerMessage.includes("connection error") ||
      lowerMessage.includes("api connection") ||
      lowerMessage.includes("network")
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Failed to reach OpenAI. Check your internet connection and try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
