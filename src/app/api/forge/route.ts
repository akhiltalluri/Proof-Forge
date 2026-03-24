import { NextRequest, NextResponse } from "next/server";
import { forgeProof } from "@/lib/openai";
import { getDemoResult, getMockDemoResult } from "@/lib/demo-fixtures";
import { DemoFixtureId, ForgeMode } from "@/types/proof";
import { normalizeProofType } from "@/lib/proof-taxonomy";

export async function POST(req: NextRequest) {
  try {
    const { proof, apiKey, proofType, demo, demoFixture, mode } =
      await req.json();
    const requestedMode: ForgeMode | undefined =
      mode === "demo" || mode === "live" ? mode : undefined;

    if (demo === true) {
      const fixtureId = (demoFixture || "direct") as DemoFixtureId;
      return NextResponse.json({
        success: true,
        data: getDemoResult(fixtureId),
        demo: true,
        demoKind: "fixture",
      });
    }

    if (!proof || typeof proof !== "string" || proof.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a proof to forge." },
        { status: 400 }
      );
    }

    const key = apiKey || process.env.OPENAI_API_KEY;
    if (requestedMode === "demo") {
      return NextResponse.json({
        success: true,
        data: getMockDemoResult(
          proof.trim(),
          proofType ? normalizeProofType(proofType) : undefined
        ),
        demo: true,
        demoKind: "mock",
      });
    }

    if (requestedMode === "live" && !key) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Live mode needs an OpenAI API key. Add one in the settings panel or configure OPENAI_API_KEY on the server.",
        },
        { status: 401 }
      );
    }

    if (!key) {
      return NextResponse.json({
        success: true,
        data: getMockDemoResult(
          proof.trim(),
          proofType ? normalizeProofType(proofType) : undefined
        ),
        demo: true,
        demoKind: "mock",
      });
    }

    const result = await forgeProof(
      proof.trim(),
      key,
      proofType ? normalizeProofType(proofType) : undefined
    );
    return NextResponse.json({ success: true, data: result });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    const status = (err as { status?: number })?.status;
    const lowerMessage = message.toLowerCase();

    if (message.includes("Incorrect API key")) {
      return NextResponse.json(
        { success: false, error: "Invalid OpenAI API key." },
        { status: 401 }
      );
    }

    if (status === 429 || message.includes("quota") || message.includes("rate limit")) {
      const isQuota = message.toLowerCase().includes("quota");
      return NextResponse.json(
        {
          success: false,
          error: isQuota
            ? "Your OpenAI API key has exceeded its quota. Check your billing at https://platform.openai.com/settings/organization/billing"
            : "Rate limited by OpenAI. Wait a moment and try again.",
        },
        { status: 429 }
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

    if (message.includes("JSON")) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse the model response. Please try again.",
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
