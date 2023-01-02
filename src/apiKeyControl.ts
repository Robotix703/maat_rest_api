import { baseUser } from "./compute/base/user";

export async function fetchCorrectAPIKey() : Promise<string[]>{
    let users = await baseUser.getAllUser();
    if(!users) return;

    return users.map(e => e.api_key);
}