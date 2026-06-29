import jwt from "jsonwebtoken";

export function signToken(payload){
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRE_IN || "7d";
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
}