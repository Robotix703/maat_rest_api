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
        total0: number,
        total1: number,
        balance0: number,
        balance1: number, 
        merged: boolean
    ) : Promise<any> {
        const list = new List({
            name: name,
            main: main,
            total0: total0,
            total1: total1,
            balance0: balance0,
            balance1: balance1,
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
        total0: number,
        total1: number,
        balance0 : number, 
        balance1 : number, 
        merged : boolean
    ) : Promise<IUpdateOne> {
        let elementToUpdate : any = { _id: _id };
    
        if(name) elementToUpdate.name = name;
        if(main) elementToUpdate.main = main;
        if(total0) elementToUpdate.total0 = total0;
        if(total1) elementToUpdate.total1 = total1;
        if(balance0) elementToUpdate.balance0 = balance0;
        if(balance1) elementToUpdate.balance1 = balance1;
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