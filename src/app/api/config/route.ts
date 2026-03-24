import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json({
    demoModeAvailable: true,
    liveModeAvailable: !!process.env.OPENAI_API_KEY,
  });
}
