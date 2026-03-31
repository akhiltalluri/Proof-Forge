import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function ensureDatabaseSchema() {
  await prisma.$connect();
}

export async function ensureSettings() {
  await ensureDatabaseSchema();
  await prisma.userSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
}
