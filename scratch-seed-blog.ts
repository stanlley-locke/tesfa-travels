import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding blog posts...');

  const posts = [
    {
      title: 'A Guide to Exploring the Serengeti',
      slug: 'guide-exploring-serengeti',
      content: `The Serengeti is one of the most famous wildlife sanctuaries in the world, renowned for its vast open plains and the greatest wildlife spectacle on earth: the Great Migration.

## When to Visit

The best time to visit the Serengeti depends entirely on what you want to see. If your goal is to witness the Great Migration, timing is everything. From December to March, the herds congregate in the southern plains. By May, they start moving north, crossing the Grumeti River in June and July, and the Mara River in August and September.

## What to Pack

- **Lightweight, neutral-colored clothing:** Avoid bright colors and dark blues/blacks which attract tsetse flies.
- **Layers:** Early morning game drives can be quite chilly.
- **Good binoculars:** Essential for spotting wildlife in the distance.
- **Sun protection:** Sunscreen, a wide-brimmed hat, and sunglasses are a must.

### Key Wildlife to Spot

While the migration is the main event, the Serengeti is home to a staggering array of wildlife year-round. Keep your eyes peeled for the Big Five (lion, leopard, elephant, buffalo, and rhino), as well as cheetahs, giraffes, hippos, and over 500 species of birds.

Prepare yourself for early mornings, breathtaking sunsets, and the sheer, raw beauty of nature in its purest form.`,
      image: '/assets/serengeti.jpg',
      published: true,
      authorName: 'Elias T.',
    },
    {
      title: 'Hidden Gems of Zanzibar',
      slug: 'hidden-gems-zanzibar',
      content: `Zanzibar is famous for its pristine beaches and historic Stone Town, but beyond the well-trodden tourist paths lie hidden gems waiting to be discovered.

## Beyond Stone Town

While wandering the labyrinthine alleys of Stone Town is a must, venture out to the lesser-known villages. Jambiani, on the southeast coast, offers a more authentic experience where you can witness local seaweed farming and enjoy miles of unspoiled white sand.

## Culinary Delights

Zanzibar is the Spice Island. A spice tour is obligatory, but the real magic happens in the local markets. Don't miss the Forodhani Gardens night market for a taste of Zanzibar pizza—a savory or sweet stuffed crepe that is uniquely Zanzibari.

### Secret Beaches

Skip the crowded northern beaches of Nungwi and head south to Kizimkazi. Not only is it quieter, but it's also one of the best places for ethical dolphin watching. Just remember to respect their space!

Zanzibar's true charm lies in its slow pace, its rich cultural tapestry, and the warmth of its people.`,
      image: '/assets/zanzibar.jpg',
      published: true,
      authorName: 'Sarah K.',
    },
    {
      title: 'The Ultimate Paris Romantic Getaway',
      slug: 'ultimate-paris-getaway',
      content: `Paris. The City of Light. The capital of romance. Whether it's your first time or your fiftieth, Paris always finds a way to steal your heart.

## Morning Strolls

Start your day early. Grab a fresh croissant from a local boulangerie and take a walk along the Seine before the city fully wakes up. The morning light hitting the Notre-Dame Cathedral is truly a sight to behold.

## Art Beyond the Louvre

Yes, the Louvre is incredible, but it can also be overwhelming. For a more intimate art experience, visit the Musée de l'Orangerie to see Monet's Water Lilies in their stunning oval rooms, or the Musée Rodin with its beautiful sculpture garden.

### Dining Like a Parisian

Avoid the tourist traps near major landmarks. Instead, head to the Le Marais district or Canal Saint-Martin for trendy bistros and natural wine bars. Always remember to greet the shopkeeper with a cheerful "Bonjour!" when entering.

A romantic getaway in Paris isn't about rushing from one monument to the next; it's about slowing down and enjoying the art of living.`,
      image: '/assets/paris.jpg',
      published: true,
      authorName: 'Tesfa Team',
    }
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }

  console.log('Successfully seeded blog posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
