import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function ensureSettings() {
  const existing = await prisma.userSettings.findUnique({
    where: { id: "default" },
  });
  if (!existing) {
    await prisma.userSettings.create({ data: { id: "default" } });
  }
}
