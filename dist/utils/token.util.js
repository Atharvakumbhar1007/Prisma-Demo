import jwt from "jsonwebtoken";
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
//! -> assertion operator -> i guarntee 
const ACCESS_EXPIRES_IN = process.env.JWT_REFRESH_SECRET;
export function signAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, {
        expiresIn: ACCESS_EXPIRES_IN,
    });
}
export function verifyAccessToken(token) {
    return jwt.verify(token, ACCESS_SECRET);
}
//# sourceMappingURL=token.util.js.map