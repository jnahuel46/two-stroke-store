import { PrismaClient } from "@prisma/client";

// Asegurarse de que Prisma sea un singleton
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Asignar la instancia de Prisma a la variable global solo en desarrollo
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;