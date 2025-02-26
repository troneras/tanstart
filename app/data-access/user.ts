import { database } from "@/db";
import { eq } from "drizzle-orm";
import type { User, UserId } from "drizzle/types";
import { users } from "drizzle/schema";

export const createUser = async (email: string, password?: string) => {
    const [user] = await database.insert(users).values({ email, password }).returning();
    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await database.query.users.findFirst({
        where: eq(users.email, email)
    });

    return user;
}

export const getUserById = async (userId: UserId) => {
    const user = await database.query.users.findFirst({
        where: eq(users.id, userId)
    });

    return user;
}


export const verifyEmail = async (userId: number) => {
    await database.update(users).set({
        emailVerified: new Date(),
    }).where(eq(users.id, userId))
}

export const deleteUser = async (userId: number) => {
    await database.delete(users).where(eq(users.id, userId))
}

export const updateUser = async (userId: number, updatedUser: Partial<User>) => {
    const updatedId = await database.update(users).set(updatedUser).where(eq(users.id, userId)).returning({ updatedId: users.id })

    return updatedId;
}