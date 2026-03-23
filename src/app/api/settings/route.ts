import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureSettings } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  await ensureSettings();
  const settings = await prisma.userSettings.findUnique({
    where: { id: "default" },
  });
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  try {
    await ensureSettings();
    const body = await req.json();

    const data: { archiveRetentionDays?: number } = {};
    if (typeof body.archiveRetentionDays === "number") {
      data.archiveRetentionDays = body.archiveRetentionDays;
    }

    const settings = await prisma.userSettings.update({
      where: { id: "default" },
      data,
    });

    return NextResponse.json(settings);
  } catch (e) {
    console.error("Settings PATCH error:", e);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
