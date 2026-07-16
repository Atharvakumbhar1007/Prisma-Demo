import bcrypt from "bcrypt";
const SALT_ROUNDS = 12;
//This will be encryptes 2^12 times
export function hashPassword(plain) {
    return bcrypt.hash(plain, SALT_ROUNDS);
}
export function verifyPassword(plain, hash) {
    return bcrypt.compare(plain, hash);
}
//# sourceMappingURL=password.util.js.map