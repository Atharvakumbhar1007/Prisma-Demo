import { Router, type Request, type Response } from "express";
import { prisma } from "../generated/prisma.js";
import { CreateUserDto } from "../dto/create-user.dto.js";

const router = Router();

// Get all users
router.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(user);
});

// Create multiple users
router.post(
  "/multiple",
  async (
    req: Request<{}, {}, CreateUserDto[]>,
    res: Response
  ) => {
    const data = req.body;

    const result = await prisma.user.createMany({
      data,
     // skipDuplicates: true,
    });

    return res.status(201).json(result);
  }
);

// Create one user
router.post("/", async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).json(user);
});

// Update user
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });

  res.json(user);
});

// Delete user
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: { id },
  });

  res.json({
    message: "User Deleted",
  });
});

export default router;