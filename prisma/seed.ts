import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const destinations = [
  {
    name: 'Addis Ababa',
    description: 'Gateway to Africa. Rich in history, coffee culture, and diplomatic heritage.',
    price: 'From $300',
    image: '/assets/flight1.jpg',
  },
  {
    name: 'Dubai',
    description: 'Luxury shopping, ultramodern architecture and a lively nightlife scene.',
    price: 'From $450',
    image: '/assets/flight2.jpg',
  },
  {
    name: 'Paris',
    description: 'The City of Light. World-class art, fashion, gastronomy and culture.',
    price: 'From $650',
    image: '/assets/flight3.jpg',
  },
  {
    name: 'Cape Town',
    description: 'A stunning coastal city crowned by the magnificent Table Mountain.',
    price: 'From $500',
    image: '/assets/flight4.jpg',
  },
  {
    name: 'Zanzibar',
    description: 'Pristine white sand beaches, spice farms, and the historic Stone Town.',
    price: 'From $350',
    image: '/assets/flight5.jpg',
  },
  {
    name: 'Serengeti',
    description: 'Witness the Great Migration in one of the world\'s most famous wildlife reserves.',
    price: 'From $800',
    image: '/assets/flight6.jpg',
  },
];

async function main() {
  console.log('Seeding admin user...');
  await prisma.adminUser.upsert({
    where: { email: 'admin@tesfatravels.com' },
    update: {},
    create: {
      email: 'admin@tesfatravels.com',
      password: 'password123',
      role: 'ADMIN',
    },
  });

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
