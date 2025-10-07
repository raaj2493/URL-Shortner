import { createHmac, randomBytes } from "crypto";

export function hashPassword(password, userSalt = null) {
    const salt = userSalt ??  randomBytes(16).toString("hex");
    const hashedpassword = createHmac("sha256", salt).update(password).digest("hex");
    return { salt, password: hashedpassword };
}