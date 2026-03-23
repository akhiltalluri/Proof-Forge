import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { titleFromProof } from "@/lib/archive-helpers";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "100", 10), 200);
  const skip = (page - 1) * limit;
  const qRaw = (url.searchParams.get("q") || "").trim();
  const domain = (url.searchParams.get("domain") || "").trim();
  const proofType = (url.searchParams.get("proofType") || "").trim();

  const andClause: object[] = [];
  if (qRaw) {
    andClause.push({
      OR: [
        { informalProof: { contains: qRaw } },
        { polishedProof: { contains: qRaw } },
        { title: { contains: qRaw } },
      ],
    });
  }
  if (domain) andClause.push({ mathDomain: domain });
  if (proofType) andClause.push({ proofType });

  const filter = andClause.length ? { AND: andClause } : {};

  const [proofs, total] = await Promise.all([
    prisma.archivedProof.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.archivedProof.count({ where: filter }),
  ]);

  return NextResponse.json({ proofs, total, page, limit });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { proof: informalProof, result, title: clientTitle } = body;

    if (!informalProof || !result) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const title =
      typeof clientTitle === "string" && clientTitle.trim()
        ? clientTitle.trim()
        : titleFromProof(informalProof);
    const mathDomain =
      typeof result.mathDomain === "string" ? result.mathDomain : "";

    const archived = await prisma.archivedProof.create({
      data: {
        title,
        mathDomain,
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

/** Clear entire archive (used by Archive UI). */
export async function DELETE() {
  try {
    const r = await prisma.archivedProof.deleteMany();
    return NextResponse.json({ deleted: r.count });
  } catch (e) {
    console.error("Archive DELETE error:", e);
    return NextResponse.json({ error: "Failed to clear" }, { status: 500 });
  }
}
