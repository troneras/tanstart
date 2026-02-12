import { getSiteConfig } from "./app/data-access/config";
import { type FragmentOf } from "@/lib/graphql";
import { getGlobalTranslations, translationsTypesFragment } from "./app/data-access/translations";
import { readFragment } from "gql.tada";

// const result = await getGlobalTranslations(["en"])
// if (!result) throw new Error("No translations found")
// const translations = readFragment(translationsTypesFragment, result)

// console.log(translations.searchGames);

const result = await getSiteConfig("brand_alpha")
if (!result) throw new Error("No config found")

console.log(result);

process.exit(0);



import { createUser, deleteUser, getUserByEmail, updateUser, verifyEmail } from "./app/data-access/user";

// const user = await createUser("test@test.com", await Bun.password.hash("password", "bcrypt"));



const foundUser = await getUserByEmail("test@test.com");
if (!foundUser) throw new Error("User not found");
await verifyEmail(foundUser!.id);

console.log(console.log(await getUserByEmail("test@test.com")));


console.log("match", await Bun.password.verify("password", foundUser.password!))

// process.exit(0);


const updatedId = await updateUser(foundUser.id, { email: 'fasdfasd@test.com' })


console.log("updated id: ", updatedId)

console.log(await getUserByEmail("fasdfasd@test.com"));

await deleteUser(foundUser.id);



console.log(await getUserByEmail("test@test.com"));