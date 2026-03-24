import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    demoMode: process.env.DEMO_MODE === "true",
    liveModeAvailable: !!process.env.OPENAI_API_KEY,
  });
}
