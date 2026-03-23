import { NextResponse } from "next/server";
import { prisma, ensureSettings } from "@/lib/db";

export async function POST() {
  try {
    await ensureSettings();

    const settings = await prisma.userSettings.findUnique({
      where: { id: "default" },
    });

    const retentionDays = settings?.archiveRetentionDays ?? 30;

    if (retentionDays <= 0) {
      return NextResponse.json({ deleted: 0, message: "Retention is set to forever" });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - retentionDays);

    const result = await prisma.archivedProof.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });

    return NextResponse.json({ deleted: result.count });
  } catch (e) {
    console.error("Cleanup error:", e);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}
