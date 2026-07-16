import { signAccessToken } from "../utils/token.util.js";
import { hashPassword, verifyPassword } from "../utils/password.util.js";
import { prisma } from "../generated/prisma.js";
function issueToken(userId, role) {
    const accessToken = signAccessToken({ sub: userId, role: role });
    return accessToken;
}
export async function registerUser(req, res) {
    const { email, password, name } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ message: "Email already in use" });
    }
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
        data: { email, name, passwordHash },
        select: { id: true, name: true, createdAt: true, email: true, role: true, },
    });
    //Since we are issuing a token, the user gets 
    // loggen in as soon as he registers
    const token = await issueToken(user.id, user.role);
    return res.status(201).json({ token, user });
}
export async function login(req, res) {
    const { email, password } = req.body;
    const u = await prisma.user.findUnique({ where: { email }, select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            passwordHash: true,
        },
    });
    if (!u || !(await verifyPassword(password, u.passwordHash))) {
        return res.status(401).json("Invalid email or password");
    }
    const token = await issueToken(u.id, u.role);
    return res.json({ token, user: { id: u.id, email: u.email, role: u.role } });
}
//# sourceMappingURL=user.controller.js.map