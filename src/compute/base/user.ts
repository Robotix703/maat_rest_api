import User, { IUser } from "../../models/user";

export namespace baseUser {
    export async function register(name: string, password: string, number: number) : Promise<any> {

        if(number < 0 || number > 1){
            return {errors: "Wrong number"};
        }

        const user = new User({
            name: name,
            password: password,
            number: number
        })

        return user.save();
    }

    export async function getByName(name : string) : Promise<IUser> {
        return User.findOne({ name: name });
    }

    export async function getAllUser(): Promise<IUser[]>{
        return User.find();
    }
}