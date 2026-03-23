import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const skip = (page - 1) * limit;

  const [proofs, total] = await Promise.all([
    prisma.archivedProof.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.archivedProof.count(),
  ]);

  return NextResponse.json({ proofs, total, page, limit });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { proof: informalProof, result } = body;

    if (!informalProof || !result) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const archived = await prisma.archivedProof.create({
      data: {
        informalProof,
        polishedProof: result.polishedProof || "",
        proofType: result.proofType || "unknown",
        score: result.verification?.score ?? 0,
        passed: result.verification?.passed ?? false,
        stepsJson: JSON.stringify(result.steps || []),
        assumptionsJson: JSON.stringify(result.assumptions || []),
        conclusion: result.conclusion || "",
        verificationJson: JSON.stringify(result.verification || {}),
        suggestionsJson: result.suggestions ? JSON.stringify(result.suggestions) : null,
      },
    });

    return NextResponse.json({ success: true, id: archived.id });
  } catch (e) {
    console.error("Archive POST error:", e);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
