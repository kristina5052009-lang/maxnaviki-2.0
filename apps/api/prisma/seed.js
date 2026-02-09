import bcrypt from "bcryptjs";
import prisma from "../src/lib/db.js";

async function main() {
  const passwordHash = await bcrypt.hash("Demo1234", 10);

  await prisma.user.upsert({
    where: { email: "demo@example.ru" },
    update: {},
    create: {
      name: "Демо Пользователь",
      email: "demo@example.ru",
      passwordHash,
      level: "BASIC"
    }
  });

  console.log("Seed: создан демо-пользователь demo@example.ru / Demo1234");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
