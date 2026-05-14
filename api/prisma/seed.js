import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const hashedPassword = await bcrypt.hash("password123", 10);

  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      username: "john_doe",
      password: hashedPassword,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      username: "jane_doe",
      password: hashedPassword,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
  });

  // Create posts with details
  await prisma.post.create({
    data: {
      title: "Modern Apartment in Downtown",
      price: 1200,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      ],
      address: "123 Main Street",
      city: "New York",
      bedroom: 2,
      bathroom: 1,
      latitude: "40.7128",
      longitude: "-74.0060",
      type: "rent",
      property: "apartment",
      userId: user1.id,
      postDetail: {
        create: {
          desc: "Beautiful modern apartment in the heart of downtown. Fully furnished with all amenities.",
          utilities: "Owner pays water and trash",
          pet: "Allowed with deposit",
          income: "3x monthly rent required",
          size: 850,
          school: 500,
          bus: 200,
          restaurant: 100,
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Spacious Family House",
      price: 450000,
      images: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
      ],
      address: "456 Oak Avenue",
      city: "Los Angeles",
      bedroom: 4,
      bathroom: 3,
      latitude: "34.0522",
      longitude: "-118.2437",
      type: "buy",
      property: "house",
      userId: user1.id,
      postDetail: {
        create: {
          desc: "Spacious family home with a large backyard and modern kitchen. Great neighborhood.",
          utilities: "Tenant pays all utilities",
          pet: "Not allowed",
          income: "Proof of funds required",
          size: 2200,
          school: 300,
          bus: 800,
          restaurant: 600,
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Cozy Condo Near Beach",
      price: 2500,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
      ],
      address: "789 Beach Blvd",
      city: "Miami",
      bedroom: 1,
      bathroom: 1,
      latitude: "25.7617",
      longitude: "-80.1918",
      type: "rent",
      property: "condo",
      userId: user2.id,
      postDetail: {
        create: {
          desc: "Stunning condo just steps from the beach. Perfect for singles or couples.",
          utilities: "All inclusive",
          pet: "Small pets allowed",
          income: "2.5x monthly rent",
          size: 650,
          school: 1200,
          bus: 400,
          restaurant: 150,
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title: "Land Plot for Development",
      price: 95000,
      images: [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      ],
      address: "Rural Route 5",
      city: "Austin",
      bedroom: 0,
      bathroom: 0,
      latitude: "30.2672",
      longitude: "-97.7431",
      type: "buy",
      property: "land",
      userId: user2.id,
      postDetail: {
        create: {
          desc: "Prime land plot ready for residential or commercial development.",
          size: 5000,
          school: 3000,
          bus: 2500,
          restaurant: 2000,
        },
      },
    },
  });

  console.log("✅ Seed data inserted successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
