import "dotenv/config";
import { prisma } from "./generated/prisma.js";
//Prisma -> You have no need to connect, when you query the database,
//connection will occur.
import express from "express";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

const server = app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});

async function shutdown(){
    server.close();
    await prisma.$disconnect();
    console.log("Exiting");
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);    
//whenever the app closes oor you press Ctrl + c
//async function main(){}