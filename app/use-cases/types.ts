import type { UserId as DrizzleUserId} from "drizzle/types";

export type UserId = DrizzleUserId;


export type PasswordUser = {
    email: string;
    password: string;
}
