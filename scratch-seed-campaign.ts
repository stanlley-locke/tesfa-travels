import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding campaigns...');

  const campaign = {
    name: 'Summer Safari Special',
    description: 'Book your adventure before August 31st and receive a complimentary hot air balloon ride over the Serengeti.',
    image: '/assets/pexels-harvey-3136450.jpg', // Existing asset or similar
    discountCode: 'SUMMERSAFARI26',
    isActive: true,
    validUntil: new Date('2026-08-31T23:59:59Z'),
  };

  await prisma.campaign.upsert({
    where: { discountCode: campaign.discountCode },
    update: campaign,
    create: campaign,
  });

  console.log('Successfully seeded campaign!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
