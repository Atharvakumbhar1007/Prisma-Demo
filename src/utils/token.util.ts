import { Role } from "../generated/prisma/enums.js";
import jwt, {type SignOptions} from "jsonwebtoken"
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
//! -> assertion operator -> i guarntee 
const ACCESS_EXPIRES_IN = process.env.JWT_REFRESH_SECRET;

export interface AccessTokenPayload{
    sub:number;
    role:Role;
}

export function signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(
        payload,
        ACCESS_SECRET,
        {
            expiresIn: ACCESS_EXPIRES_IN,
        } as SignOptions
    );
}

export function verifyAccessToken(token:string):AccessTokenPayload{
    return jwt.verify(token, ACCESS_SECRET) as unknown as AccessTokenPayload;
}