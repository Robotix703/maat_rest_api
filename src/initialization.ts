require('dotenv').config();

import { baseList } from "./compute/base/list";
import { baseUser } from "./compute/base/user";
import { generateKey } from "./apiKeyControl";

export async function createUserIfNeeded(): Promise<null>{
    const userNumber = await baseUser.count();

    if(userNumber && userNumber == 2){ return; } 
    else if(userNumber && userNumber > 0) {
        await baseUser.deleteAll();
    }

    await baseUser.register(process.env.USERNAME1, 0, generateKey());
    await baseUser.register(process.env.USERNAME2, 1, generateKey());
    return;
}

export async function createMainListIfNeeded(): Promise<null>{
    const mainList = await baseList.getMainList();

    if(mainList) { return; }

    await baseList.register(
        "Principale",
        true,
        0,
        0,
        0,
        0,
        false
    );
    return;
}