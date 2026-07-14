import { Router, type Request, type Response } from "express";
import { prisma } from "../generated/prisma.js";

const router = Router();

// Get all profiles
router.get("/", async (req: Request, res: Response) => {
  const profiles = await prisma.profile.findMany();

  res.json(profiles);
});

// Get profile by ID
router.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const profile = await prisma.profile.findUnique({
    where: { id },
  });

  if (!profile) {
    return res.status(404).json({
      message: "Profile not found",
    });
  }

  res.json(profile);
});

// Create profile
router.post("/", async (req: Request, res: Response) => {
  const { bio, avatarUrl, website, score } = req.body;

  const profile = await prisma.profile.create({
    data: {
      bio,
      avatarUrl,
      website,
      score,
    },
  });

  res.status(201).json(profile);
});

// Update profile
router.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { bio, avatarUrl, website, score } = req.body;

  const profile = await prisma.profile.update({
    where: { id },
    data: {
      bio,
      avatarUrl,
      website,
      score,
    },
  });

  res.json(profile);
});

// Delete profile
router.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await prisma.profile.delete({
    where: { id },
  });

  res.json({
    message: "Profile deleted successfully",
  });
});

export default router;