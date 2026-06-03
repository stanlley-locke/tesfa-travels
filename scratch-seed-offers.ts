import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const offers = [
  {
    title: 'Dubai Luxury Getaway',
    description: 'Experience 5-star luxury in the heart of Dubai with exclusive corporate rates.',
    price: 'From $450/person',
    image: '/assets/pexels-zakh-36720392.jpg',
    isActive: true,
  },
  {
    title: 'Zanzibar Summer Deal',
    description: 'Pristine beaches and all-inclusive resorts for a perfect retreat.',
    price: 'From $350/person',
    image: '/assets/flight5.jpg',
    isActive: true,
  },
  {
    title: 'Paris Romance Package',
    description: 'A luxurious week in the city of lights. Flights and hotel included.',
    price: 'From $650/person',
    image: '/assets/flight3.jpg',
    isActive: true,
  }
];

async function main() {
  console.log('Seeding offers...');
  for (const offer of offers) {
    await prisma.offer.create({ data: offer });
  }
  console.log('Done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
