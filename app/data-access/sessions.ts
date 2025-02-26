import { database } from "@/db";
import type { UserId } from "@/use-cases/types";
import { eq } from "drizzle-orm";
import { sessions } from 'drizzle/schema'
import type { Session, SessionId } from "drizzle/types";


export const createSession = async (id: string, userId: UserId, expiresAt: Date) => {
    await database.insert(sessions).values({ id, userId, expiresAt })
}

export const getSession = async (id: string) => {
    const user = await database.query.sessions.findFirst({
        where: eq(sessions.id, id)
    });

    return user;
}

export const updateSessionExpiration = async (id: string, expiresAt: Date) => {
    await database.update(sessions).set({expiresAt}).where(eq(sessions.id, id))
}

export const deleteSessionForUser = async (userId: number) => {
    await database.delete(sessions).where(eq(sessions.userId, userId));
}


export const deleteSession = async (sessionId: SessionId) => {
    await database.delete(sessions).where(eq(sessions.id, sessionId));
}