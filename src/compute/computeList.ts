import { IPrettyList } from "../models/list";
import { baseList } from "./base/list";
import { baseUser } from "./base/user";

export namespace computeList {
    export async function getPrettyListById(listId: string) : Promise<IPrettyList | Error> {
        const prettyUsers = await baseUser.getPrettyUsers();
        if(!prettyUsers) throw new Error("Users not found");

        const list = await baseList.getListById(listId);
        if(!list) throw new Error("List not found");

        return {
            _id: list._id,
            name: list.name,
            main: list.main,
            user0: (prettyUsers[0].number == 0) ? prettyUsers[0] : prettyUsers[1],
            user1: (prettyUsers[1].number == 1) ? prettyUsers[1] : prettyUsers[0],
            total0: list.total0,
            total1: list.total1,
            balance0: list.balance0,
            balance1: list.balance1,
            merged: list.merged
        }
    }
}