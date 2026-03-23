-- CreateTable
CREATE TABLE "ArchivedProof" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "archiveRetentionDays" INTEGER NOT NULL DEFAULT 30,
    "updatedAt" DATETIME NOT NULL
);
