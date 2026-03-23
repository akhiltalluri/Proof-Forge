import { NextRequest, NextResponse } from "next/server";
import { ensureDatabaseSchema, prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureDatabaseSchema();
  const { id } = await params;
  const proof = await prisma.archivedProof.findUnique({ where: { id } });
  if (!proof) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(proof);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await ensureDatabaseSchema();
  const { id } = await params;
  try {
    await prisma.archivedProof.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
