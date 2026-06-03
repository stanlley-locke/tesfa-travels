import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const offers = await prisma.offer.findMany();
  for (const o of offers) {
    if (o.image.length > 5000) {
      await prisma.offer.delete({where: {id: o.id}});
      console.log('Deleted huge offer', o.id);
    }
  }
}
main().catch(console.error);
