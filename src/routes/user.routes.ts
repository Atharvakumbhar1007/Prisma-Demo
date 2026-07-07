import {Router, type Request, type Response} from "express";
import {prisma} from "../generated/prisma.js";

const router = Router();
router.get("/", async function(req: Request, res:Response) {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.get("/:id", async function(req: Request, res:Response) {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
        where: {id}
    });

    if (!user) {
        return res.sendStatus(404).json({
            message:"User not found"
        });
    }
    return res.json(user);
});
router.post("/", async function(req: Request, res:Response){
    const {name, email} = req.body;
    const user = await prisma.user.create({
        data: {
            name,
            email
        }
    });
    res.status(201).json(user);
}); 

router.put("/:id", async function(req: Request, res:Response){
    const id = Number(req.params.id);
    const {name, email} = req.body;
    const user = await prisma.user.update({
        where: {id},
        data: {
            name,email
        }
    });
    res.json(user);
});

router.delete("/:id", async function(req: Request, res:Response){
    const id = Number(req.params.id);
    const user = await prisma.user.delete({
        where: {id}
    });
    res.json({
        message:"User Deleted"
    });
});

export default router;