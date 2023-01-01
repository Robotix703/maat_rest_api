import { IDeleteOne } from "../../models/mongoose";
import User, { IPrettyUser, IUser } from "../../models/user";

export namespace baseUser {
    export async function register(name: string, password: string, number: number, api_key: string) : Promise<IUser | Error> {
        if(number < 0 || number > 1) return new Error("Wrong number");

        const user = new User({
            name: name,
            password: password,
            number: number,
            api_key: api_key
        });
        return user.save();
    }

    export async function getByName(name : string) : Promise<IUser | null> {
        return User.findOne({ name: name });
    }

    export async function getAllUser(): Promise<IUser[] | null>{
        return User.find();
    }

    export async function count(): Promise<number | null>{
        return User.count();
    }

    export async function getPrettyUsers(): Promise<IPrettyUser[] | null>{
        const users = await getAllUser();
        if(!users) return;

        const prettyUsers: IPrettyUser[] = [
            {
              name: users[0].name,
              id: users[0]._id,
              number: users[0].number
            },
            {
              name: users[1].name,
              id: users[1]._id,
              number: users[1].number
            }
        ];
        return prettyUsers;
    }

    export async function deleteAll(): Promise<IDeleteOne>{
        return User.deleteMany({});
    }
}