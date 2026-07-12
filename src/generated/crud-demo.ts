import { prisma } from "../generated/prisma.js";

async function crudDemo() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: "atharva@123.gmail.com",
      },
    });

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          email: "atharva@123.gmail.com",
          name: "Atharva",
          posts: {
            create: {
              title: "Hello from Prisma",
              content: "My first post",
              published: true,
              status: "PUBLISHED",
            },
          },
        },
        include: {
          posts: true,
        },
      });

      console.log(newUser);
    } else {
      console.log("User already exists");
      console.log(existingUser);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

crudDemo();