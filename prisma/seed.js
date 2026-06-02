const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const email = 'tesfatravels@gmail.com';
  
  // Upsert to ensure it doesn't fail if the user already exists
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      password: 'tesfa@2026', // In production, we would hash this with bcrypt
      role: 'ADMIN',
    },
    create: {
      email,
      password: 'tesfa@2026',
      role: 'ADMIN',
    },
  });

  console.log('Seeded admin user:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
