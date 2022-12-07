import Purchase, { IPurchase } from '../../models/purchase';
import { IDeleteOne, IUpdateOne } from '../../models/mongoose';


export namespace basePurchase {
        
    export async function getPurchasesByListId(listId: string) : Promise<IPurchase[] | null> {
        return Purchase.find({listId: listId});
    }

    export async function getPurchase(purchaseId: string) : Promise<IPurchase | null>{
        return Purchase.findOne({_id: purchaseId});
    }

    export async function register(
        title: string,
        amount: number,
        date: Date,
        buyTo: string[],
        from: string,
        listId: string,
        total0: number,
        total1: number,
        balance0: number,
        balance1: number
    ) : Promise<IPurchase | Error> {
        const purchase = new Purchase({
            title: title,
            amount: amount,
            date: date,
            buyTo: buyTo,
            from: from,
            listId: listId,
            total0: total0,
            total1: total1,
            balance0: balance0,
            balance1: balance1
        });
        return await purchase.save()
        .then((result: IPurchase) => {
            return { result };
        })
        .catch((error: Error) => {
            return { error };
        });
    }
    
    export async function update(
        _id : string, 
        title: string,
        amount: number,
        date: Date,
        buyTo: string[],
        from: string,
        listId: string,
        total0: number,
        total1: number,
        balance0: number,
        balance1: number
    ) : Promise<IUpdateOne> {
        let elementToUpdate : any = { _id: _id };

        if(title) elementToUpdate.title = title;
        if(amount) elementToUpdate.amount = amount;
        if(date) elementToUpdate.date = date;
        if(buyTo) elementToUpdate.buyTo = buyTo;
        if(from) elementToUpdate.from = from;
        if(listId) elementToUpdate.listId = listId;
        if(total0) elementToUpdate.total0 = total0;
        if(total1) elementToUpdate.total1 = total1;
        if(balance0) elementToUpdate.balance0 = balance0;
        if(balance1) elementToUpdate.balance1 = balance1;
    
        return Purchase.updateOne({ _id: _id }, elementToUpdate);
    }
    
    export async function count() : Promise<number | null> {
        return Purchase.count();
    }

    export async function deleteOne(id : string) : Promise<IDeleteOne | null> {
        return Purchase.deleteOne({ _id: id })
    }
}