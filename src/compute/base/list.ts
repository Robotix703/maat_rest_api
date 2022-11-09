import { IDeleteOne, IUpdateOne } from '../../models/mongoose';
import List, { IList } from '../../models/list'

export namespace baseList {
        
    export async function getAllLists() : Promise<IList[]> {
        return List.find();
    }

    export async function getListById(listId: string): Promise<IList> {
        return List.findById(listId);
    }

    export async function register(
        name: string, 
        main: boolean, 
        balance1: number,
        balance2: number, 
        merged: boolean
    ) : Promise<any> {
        const list = new List({
            name: name,
            main: main,
            balance1: balance1,
            balance2: balance2,
            merged: merged
        });

        return await list.save()
        .then((result: any) => {
            return { id: result._id, list: list };
        })
        .catch((error: Error) => {
            return { error: error };
        });
    }
    
    export async function update(
        _id : string, 
        name : string, 
        main : boolean, 
        balance1 : number, 
        balance2 : number, 
        merged : boolean
    ) : Promise<IUpdateOne> {
        let elementToUpdate : any = { _id: _id };
    
        if(name) elementToUpdate.name = name;
        if(main) elementToUpdate.main = main;
        if(balance1) elementToUpdate.balance1 = balance1;
        if(balance2) elementToUpdate.balance2 = balance2;
        if(merged) elementToUpdate.merged = merged;
    
        return List.updateOne({ _id: _id }, elementToUpdate);
    }
    
    export async function count() : Promise<number> {
        return List.count();
    }

    export async function deleteOne(id : string) : Promise<IDeleteOne> {
        return List.deleteOne({ _id: id })
    }
}