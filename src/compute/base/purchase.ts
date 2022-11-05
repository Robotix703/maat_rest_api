import Purchase, { IPurchase } from '../../models/purchase';
import { IDeleteOne, IUpdateOne } from '../../models/mongoose';


export namespace basePurchase {
        
    export async function getPurchasesByListId(listId: string) : Promise<IPurchase[]> {
        return Purchase.find({listId: listId});
    }

    export async function register(
        title: string,
        amount: number,
        date: Date,
        to: string,
        from: string,
        listId: string,
        balance1: string,
        balance2: string
    ) : Promise<any> {
        const purchase = new Purchase({
            title: title,
            amount: amount,
            date: date,
            to: to,
            from: from,
            listId: listId,
            balance1: balance1,
            balance2: balance2
        });

        return await purchase.save()
        .then((result: any) => {
            return { id: result._id, purchase: purchase };
        })
        .catch((error: Error) => {
            return { error: error };
        });
    }
    
    export async function update(
        _id : string, 
        title: string,
        amount: number,
        date: Date,
        to: string[],
        from: string,
        listId: string,
        balance1: string,
        balance2: string
    ) : Promise<IUpdateOne> {
        let elementToUpdate : any = { _id: _id };

        if(title) elementToUpdate.title = title;
        if(amount) elementToUpdate.amount = amount;
        if(date) elementToUpdate.date = date;
        if(to) elementToUpdate.to = to;
        if(from) elementToUpdate.from = from;
        if(listId) elementToUpdate.listId = listId;
        if(balance1) elementToUpdate.balance1 = balance1;
        if(balance2) elementToUpdate.balance2 = balance2;
    
        return Purchase.updateOne({ _id: _id }, elementToUpdate);
    }
    
    export async function count() : Promise<number> {
        return Purchase.count();
    }

    export async function deleteOne(id : string) : Promise<IDeleteOne> {
        return Purchase.deleteOne({ _id: id })
    }
}