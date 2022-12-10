require('dotenv').config();

import { baseList } from "./compute/base/list";
import { baseUser } from "./compute/base/user";
import bcrypt from "bcrypt";

export async function createUserIfNeeded(): Promise<null>{
    const userNumber = await baseUser.count();

    if(userNumber && userNumber == 2){ return; } 
    else if(userNumber && userNumber > 0) {
        await baseUser.deleteAll();
    }

    const password1 = await bcrypt.hash(process.env.PASSWORD1, 10);
    const password2 = await bcrypt.hash(process.env.PASSWORD2, 10);

    await baseUser.register(process.env.USERNAME1, password1, 0);
    await baseUser.register(process.env.USERNAME2, password2, 1);
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