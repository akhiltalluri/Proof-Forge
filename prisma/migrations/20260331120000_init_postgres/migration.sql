-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "ArchivedProof" (
    "id" TEXT NOT NULL,
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArchivedProof_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "archiveRetentionDays" INTEGER NOT NULL DEFAULT 30,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);
