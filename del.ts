import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.offer.delete({where: {id: 'cmpwzass80001pk0ck40fo2a9'}});
}
main().catch(console.error);
