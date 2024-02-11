import {PrismaClient} from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// takes care of hot reloading where prisma will not initiate new sessions
const prismadb = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
    global.prisma = prismadb;
}

export default prismadb;