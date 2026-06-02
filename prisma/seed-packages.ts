import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const destinations = [
  {
    name: 'Addis Ababa',
    description: 'Gateway to Africa',
    price: 'From $300',
    image: '/assets/flight1.jpg',
  },
  {
    name: 'Dubai',
    description: 'Luxury & Commerce',
    price: 'From $450',
    image: '/assets/flight2.jpg',
  },
  {
    name: 'Paris',
    description: 'City of Light',
    price: 'From $650',
    image: '/assets/flight3.jpg',
  },
  {
    name: 'Cape Town',
    description: 'South African Beauty',
    price: 'From $500',
    image: '/assets/flight4.jpg',
  },
  {
    name: 'Zanzibar',
    description: 'Tropical Paradise',
    price: 'From $350',
    image: '/assets/flight5.jpg',
  },
  {
    name: 'Serengeti',
    description: 'Ultimate Safari',
    price: 'From $800',
    image: '/assets/flight6.jpg',
  },
];

async function main() {
  console.log('Seeding packages...');
  for (const dest of destinations) {
    await prisma.package.create({
      data: {
        name: dest.name,
        description: dest.description,
        price: dest.price,
        image: dest.image,
        status: 'PUBLISHED',
      },
    });
    console.log(`Created package: ${dest.name}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
