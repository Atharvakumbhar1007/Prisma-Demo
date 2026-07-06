import { Prisma } from "../prisma.js";

async function crudDemo() {
    const existingUser = await Prisma.user.findUnique({
        where: {
            email: "atharva@123.gmail.com",
        },
    });
    if (!existingUser) {
        const newUser = await Prisma.user.create({
            data:{
                name: "Atharva",
                posts: {
                    create: {title: "Hello from prisma", published: true}
                }
            }
        });
    }
}