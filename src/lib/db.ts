import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

let schemaReadyPromise: Promise<void> | null = null;

async function ensureArchivedProofSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "ArchivedProof" (
      "id" TEXT NOT NULL PRIMARY KEY,
      "title" TEXT NOT NULL DEFAULT '',
      "mathDomain" TEXT NOT NULL DEFAULT '',
      "informalProof" TEXT NOT NULL,
      "polishedProof" TEXT NOT NULL,
      "proofType" TEXT NOT NULL,
      "score" INTEGER NOT NULL,
      "passed" BOOLEAN NOT NULL,
      "stepsJson" TEXT NOT NULL,
      "assumptionsJson" TEXT NOT NULL,
      "conclusion" TEXT NOT NULL,
      "verificationJson" TEXT NOT NULL,
      "suggestionsJson" TEXT,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const columns = (await prisma.$queryRawUnsafe(`
    PRAGMA table_info("ArchivedProof")
  `)) as Array<{ name: string }>;
  const names = new Set(columns.map((column) => column.name));

  if (!names.has("title")) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ArchivedProof" ADD COLUMN "title" TEXT NOT NULL DEFAULT ''`
    );
  }

  if (!names.has("mathDomain")) {
    await prisma.$executeRawUnsafe(
      `ALTER TABLE "ArchivedProof" ADD COLUMN "mathDomain" TEXT NOT NULL DEFAULT ''`
    );
  }
}

async function ensureUserSettingsSchema() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "UserSettings" (
      "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
      "archiveRetentionDays" INTEGER NOT NULL DEFAULT 30,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function ensureDatabaseSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await ensureArchivedProofSchema();
      await ensureUserSettingsSchema();
    })().catch((error) => {
      schemaReadyPromise = null;
      throw error;
    });
  }

  await schemaReadyPromise;
}

export async function ensureSettings() {
  await ensureDatabaseSchema();
  const existing = await prisma.userSettings.findUnique({
    where: { id: "default" },
  });
  if (!existing) {
    await prisma.userSettings.create({ data: { id: "default" } });
  }
}
