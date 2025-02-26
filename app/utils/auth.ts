import { createSession, deleteSession, getSession, updateSessionExpiration } from "@/data-access/sessions";
import { getUserById } from "@/data-access/user";
import type { UserId } from "@/use-cases/types";
import { clearSession, useSession } from '@tanstack/start/server'
import type { User } from 'drizzle/types'

type SessionUser = {
    userEmail: User['email']
}
const SESSION_COOKIE_NAME = 'APP_Cookie';
const SESSION_REFRESH_INTERVAL_MS = 15 * 24 * 60 * 60 * 1000;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;


export const createAppSession = async (userId?: UserId) => {
    // create a session
    const session = await useSession<SessionUser>({
        name: SESSION_COOKIE_NAME,
        password: 'vj5x@Msr^k9uuVvrhFt2&rhogB^%23jqCkV8qgTCqNvtq@nEi9Ehce896nbi#wsFh',
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            // 1y
            maxAge: 365 * 24 * 60 * 60,
            path: '/'
        }
    })

    // store the session
    if (userId && session.id) {
        const expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
        await createSession(session.id, userId, expiresAt)
    }

    return session
}


export const verifyPassword = async (password: string, hash: string) => {
    // algorithm is inferred from the hash by Bun
    const verified = Bun.password.verify(password, hash)

    return verified;
}

export const hashPassword = async (password: string) => {
    return Bun.password.hash(password, "bcrypt")
}

export const validateRequest = async () => {
    const sessionManager = await createAppSession()

    if (!sessionManager.id) {
        return { session: null, user: null };
    }

    return await validateSessionToken(sessionManager.id) 
}

export const clearCookie = async () => {
    const sessionManager = await createAppSession()
    sessionManager.clear(); 
}

export const validateSessionToken = async (token: string) => {
    const sessionInDb = await getSession(token);
    if (!sessionInDb || !sessionInDb.userId) {
        return { session: null, user: null };
    }
    if (Date.now() >= sessionInDb.expiresAt.getTime()) {
        return { session: null, user: null };
    }

    const user = await getUserById(sessionInDb.userId)
    if (!user) {
        await deleteSession(token)
        return { session: null, user: null };
    }

    if (Date.now() >= sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
        sessionInDb.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS)
        await updateSessionExpiration(sessionInDb.id, sessionInDb.expiresAt)
    }

    return { session: sessionInDb, user };
}

export const invalidateSession = async () => {
    const {session} = await validateRequest()

    if (!session) {
        return
    }

    await deleteSession(session.id)
    await clearCookie()
}

