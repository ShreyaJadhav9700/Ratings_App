
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { prisma } from "./config";

async function main() {
  // Create Admin
  const adminEmail = "admin@dinerate.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: await bcrypt.hash("Admin@123", 10),
        role: "ADMIN"
      }
    });
    console.log("✅ Admin created:", adminEmail, "password: Admin@123");
  }

  // Create an Owner
  const ownerEmail = "owner@dinerate.com";
  let owner = await prisma.user.findUnique({ where: { email: ownerEmail } });
  if (!owner) {
    owner = await prisma.user.create({
      data: {
        name: "Owner One",
        email: ownerEmail,
        password: await bcrypt.hash("Owner@123", 10),
        role: "OWNER"
      }
    });
    console.log("✅ Owner created:", ownerEmail, "password: Owner@123");
  }

  // Sample stores
  const count = await prisma.store.count();
  if (count === 0) {
    await prisma.store.createMany({
      data: [
        { name: "Bella Roma", address: "Downtown", ownerId: owner!.id },
        { name: "Tokyo Sushi", address: "Midtown", ownerId: owner!.id },
        { name: "La Casa Mexicana", address: "South District", ownerId: owner!.id }
      ]
    });
    console.log("✅ Sample stores added");
  }

  console.log("🌱 Seeding done");
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});
