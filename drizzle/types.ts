import { users, sessions } from './schema'

export type User = typeof users.$inferSelect;
export type UserId = User["id"]

export type Session = typeof sessions.$inferSelect
export type SessionId = Session["id"]