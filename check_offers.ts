import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const offers = await prisma.offer.findMany();
  console.log(offers.map(o => ({id: o.id, title: o.title, image: o.image.slice(0, 50)})));
}
main().catch(console.error);
