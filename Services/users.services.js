import {db} from "../DB/index.js";
import {usersTable} from "../Model/index.js";
import {eq} from "drizzle-orm";

export async function getUserByEmail(email) {
    const [user] = await db
        .select(
            {
                id: usersTable.id,
                firstname: usersTable.firstname,
                lastname: usersTable.lastname,
                email: usersTable.email,
                password: usersTable.password,
                salt: usersTable.salt
            }
        )
        .from(usersTable)
        .where(eq(usersTable.email, email));
    return user;
}