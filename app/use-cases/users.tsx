import { createUser, getUserByEmail } from "@/data-access/user"
import type { PasswordUser } from "./types"
import { hashPassword } from "@/utils/auth"



export const createPasswordUserUseCase = async (passwordUser: PasswordUser) => {
    let existingUser = await getUserByEmail(passwordUser.email)

    if (!existingUser) {
        const passHash = await hashPassword(passwordUser.password)
        existingUser = await createUser(passwordUser.email, passHash)
    }

    return existingUser;
}