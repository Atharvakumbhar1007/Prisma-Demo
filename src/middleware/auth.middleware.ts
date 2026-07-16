import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/token.util.js";
import { Role } from "../generated/prisma/enums.js";
//TOKEN
//Authorization: Bearer 
export function requireAuth(req:Request, res:Response, next:NextFunction){
    const header = req.headers.authorization;

    if(!header?.startsWith("Bearer")){
        return res.status(401).json({message:"Missing bearer token"});
    }
    const token = header.slice(7);

    try{
        const payload = verifyAccessToken(token);
        req.user= {id:payload.sub, role:payload.role};

        next();
    }
    catch{
        return res.status(401).json({message:"Invalid or expired token"});
    }
}

export function requireRole(...roles: Role[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Insufficient permission",
            });
        }
        next();
    };
}