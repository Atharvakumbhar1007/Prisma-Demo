import bcrypt from "bcrypt";
const SALT_ROUNDS = 12
//This will be encryptes 2^12 times

export function hashPassword(plain:string):Promise<string>{
    return bcrypt.hash(plain, SALT_ROUNDS);
}

export function verifyPassword(plain:string, hash:string):Promise<boolean>{
    return bcrypt.compare(plain, hash);
}