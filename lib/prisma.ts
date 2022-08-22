import { PrismaClient } from '@prisma/client'

interface CustomNodeGlobal {
    prisma: PrismaClient
}

declare const global: CustomNodeGlobal;

const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") global.prisma = prisma

export default prisma