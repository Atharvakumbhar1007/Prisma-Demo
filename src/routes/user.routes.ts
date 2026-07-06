import {Router, type Request, type Response} from "express";
import {prisma} from "../prisma.js";

const router = Router();
router.get("/", async function(req: Request, res:Response) {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get("/:id", async function(req: Request, res:Response) {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnnique({
        where: {id}
    });

    if (!user) {
        return res.sendStatus(404).json({
            message:"User not found"
        });
    }
    return res.json(user);
});