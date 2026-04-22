import { PrismaClient } from "@prisma/client/extension";

 

 const prisma = new PrismaClient({
    datasiurceUrl: process.env.DATABASE_URL,
 });
export default prisma;