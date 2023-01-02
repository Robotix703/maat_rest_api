import { baseUser } from "./compute/base/user";

const {randomBytes} = require('crypto');

export function generateKey(size = 32, format = 'base64') {
  const buffer = randomBytes(size);
  return buffer.toString(format);
}

export async function fetchCorrectAPIKey() : Promise<string[]>{
    let users = await baseUser.getAllUser();
    if(!users) return;

    return users.map(e => e.api_key);
}