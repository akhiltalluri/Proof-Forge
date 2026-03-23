-- RedefineTable
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ArchivedProof" (
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
);
INSERT INTO "new_ArchivedProof" ("id", "informalProof", "polishedProof", "proofType", "score", "passed", "stepsJson", "assumptionsJson", "conclusion", "verificationJson", "suggestionsJson", "createdAt")
SELECT "id", "informalProof", "polishedProof", "proofType", "score", "passed", "stepsJson", "assumptionsJson", "conclusion", "verificationJson", "suggestionsJson", "createdAt" FROM "ArchivedProof";
DROP TABLE "ArchivedProof";
ALTER TABLE "new_ArchivedProof" RENAME TO "ArchivedProof";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
