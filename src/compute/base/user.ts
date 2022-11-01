import User, { IUser } from "../../models/user";

export namespace baseUser {
    export async function register(name: string, password: string) : Promise<any> {
        const user = new User({
            name: name,
            password: password
        });

        return user.save()
        .then((result: any) => {
            return { id: result._id, user: user };
        })
        .catch((error: Error) => {
            return { error: error };
        });
    }

    export async function getByName(name : string) : Promise<IUser> {
        return User.findOne({ name: name });
    }
}