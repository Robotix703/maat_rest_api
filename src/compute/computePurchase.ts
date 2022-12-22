import { baseList } from "./base/list";
import { baseUser } from "./base/user";
import { basePurchase } from "./base/purchase";

import { IPrettyPurchase, IPrettyUpdatePurchase, IPurchase, ISendPurchaseData, IUserID, IUserName } from "../models/purchase";
import { IStatus, IUpdateOne } from "../models/mongoose";
import { IPrettyUser } from "../models/user";
import { IList } from "../models/list";

export namespace computePurchase {

    interface IBalance {
        balance0: number
        balance1: number
    }

    interface ITotals {
        total0: number
        total1: number
    }

    export function UserNameToUserId(user : IUserName, users: IPrettyUser[]): IUserID {
        return (user === users[0].name) ? users[0].id : users[1].id;
    }

    export function UserIdToUserName(user : IUserID, users: IPrettyUser[]): IUserName {
        return (user === users[0].id) ? users[0].name : users[1].name;
    }

    export function attribute(from: IUserName, users: IPrettyUser[], amount: number) : ITotals {
        let result : ITotals = {total0: 0, total1: 0};

        (from === users[0].name.toString()) ? result.total0 = amount : result.total1 = amount;
        return result;
    }

    export function divide(buyTo: IUserName[], from: IUserName, amount: number, users: IPrettyUser[]) : IBalance | null {
        let result : IBalance = {balance0: 0, balance1: 0};
        if(buyTo.length == 1){
            //Buy for himself
            if(buyTo[0] === from) return null;
            //Buy for the seconde one
            else
            {
                //Balance
                result.balance0 = (from === users[0].name.toString()) ? amount : -amount;
                result.balance1 = (from === users[1].name.toString()) ? amount : -amount;
            }
        }
        //Divide
        else
        {
            //Balance
            result.balance0 = (from === users[0].name.toString()) ? amount / 2 : -amount / 2;
            result.balance1 = (from === users[1].name.toString()) ? amount / 2 : -amount / 2;
        }
        return result;
    }

    export async function add(data: ISendPurchaseData) : Promise<IStatus | Error>{
        //Compute purchase
        const purchase = await computePurchase(data);
        if(!purchase) return new Error("Error with purchase");

        //List
        let list = await baseList.getListById(data.listId);
        if(!list) return new Error("Error with list");
        
        //Update list
        list.balance0 += purchase.balance0;
        list.balance1 += purchase.balance1;
        list.total0 += purchase.total0;
        list.total1 += purchase.total1;

        //Register purchase
        const purchaseRegistered = await basePurchase.register(
            purchase.title,
            purchase.amount,
            purchase.date,
            purchase.buyTo,
            purchase.from,
            purchase.listId,
            purchase.total0,
            purchase.total1,
            purchase.balance0,
            purchase.balance1
        )
        .catch((error: Error) => {
            throw error;
        });
        if(!purchaseRegistered) throw new Error("Purchase not registered");

        //Update List
        return baseList.updateTotalAndBalance(
            data.listId,
            list.total0,
            list.total1,
            list.balance0,
            list.balance1
        )
        .then((result: IUpdateOne) => {
            if (result.modifiedCount > 0) return {status: "OK"};
            else return new Error("Error when updating list");
        })
        .catch((error: Error) => {
            throw error;
        });
    }

    export async function computePurchase(data: ISendPurchaseData) : Promise<IPurchase | null> {
        const prettyUser: IPrettyUser[] | void = await baseUser.getPrettyUsers();
        if(!prettyUser) throw new Error("Users not found");

        const convertedFrom = UserIdToUserName(data.from, prettyUser);
        const convertedBuyTo = 
            (data.buyTo.length == 1) ?
            [UserIdToUserName(data.buyTo[0], prettyUser)] :
            [UserIdToUserName(data.buyTo[0], prettyUser), UserIdToUserName(data.buyTo[1], prettyUser)];
        let totals: ITotals = attribute(convertedFrom, prettyUser, data.amount);
        let balance: IBalance = divide(convertedBuyTo, convertedFrom, data.amount, prettyUser);
        if(!balance) throw new Error("From is buyTo");

        return {
            _id: '',
            title: data.title,
            amount: data.amount,
            date: new Date,
            buyTo: convertedBuyTo,
            from: convertedFrom,
            listId: data.listId,
            total0: totals.total0,
            total1: totals.total1,
            balance0: balance.balance0,
            balance1: balance.balance1
        };
    }

    export async function getPurchasesByListId(listId: string) : Promise<IPrettyPurchase[]>{
        const purchases: IPurchase[] | void = await basePurchase.getPurchasesByListId(listId);
        if(!purchases) throw new Error("Purchases not found");

        const list: IList | void = await baseList.getListById(listId);
        if(!list) throw new Error("List not found");

        const users: IPrettyUser[] | void = await baseUser.getPrettyUsers();
        if(!users) throw new Error("Users not found");

        let prettyPurchases : IPrettyPurchase[] = [];

        for(let purchase of purchases){
            let prettyBuyTo : string[] = [];
            for(let user of purchase.buyTo){
                prettyBuyTo.push(
                    (users[0].id == user) ? users[0].name : users[1].name
                );
            }

            prettyPurchases.push({
                _id: purchase._id,
                title: purchase.title,
                list: list,
                amount: purchase.amount,
                date: purchase.date,
                buyTo: prettyBuyTo,
                from: (users[0].id == purchase.from) ? users[0].name : users[1].name,
                user0: (users[0].number == 0) ? users[0] : users[1],
                user1: (users[0].number == 0) ? users[0] : users[1],
                total0: purchase.total0,
                total1: purchase.total1,
                balance0: purchase.balance0,
                balance1: purchase.balance1
            });
        }

        return prettyPurchases;
    }

    export async function getPurchasesByPurchaseId(purchaseId: string) : Promise<IPrettyPurchase>{
        const purchase: IPurchase | void = await basePurchase.getPurchase(purchaseId);
        if(!purchase) throw new Error("Purchases not found");

        const list: IList | void = await baseList.getListById(purchase.listId);
        if(!list) throw new Error("List not found");

        const users: IPrettyUser[] | void = await baseUser.getPrettyUsers();
        if(!users) throw new Error("Users not found");

        let prettyBuyTo : string[] = [];
        for(let user of purchase.buyTo){
            prettyBuyTo.push(
                (users[0].id == user) ? users[0].name : users[1].name
            );
        }

        let prettyPurchases : IPrettyPurchase = {
            _id: purchase._id,
            title: purchase.title,
            list: list,
            amount: purchase.amount,
            date: purchase.date,
            buyTo: prettyBuyTo,
            from: (users[0].id == purchase.from) ? users[0].name : users[1].name,
            user0: (users[0].number == 0) ? users[0] : users[1],
            user1: (users[1].number == 1) ? users[1] : users[0],
            total0: purchase.total0,
            total1: purchase.total1,
            balance0: purchase.balance0,
            balance1: purchase.balance1
        };
        return prettyPurchases;
    }

    export async function updatePrettyPurchase(data: IPrettyUpdatePurchase) : Promise<IUpdateOne>{
        //Get Purchase
        const oldPurchase: IPurchase = await basePurchase.getPurchase(data.id);
        if(!oldPurchase) throw new Error("Old Purchase not found");

        //Revert purchase inside List
        let list: IList = await baseList.getListById(oldPurchase.listId);
        if(!list) throw new Error("List not found");
        
        list.balance0 -= oldPurchase.balance0;
        list.balance1 -= oldPurchase.balance1;
        list.total0 -= oldPurchase.total0;
        list.total1 -= oldPurchase.total1;

        //Compute new purchase
        const prettyUser: IPrettyUser[] | void = await baseUser.getPrettyUsers();
        if(!prettyUser) throw new Error("Users not found");
        
        const totals: ITotals = attribute(data.from, prettyUser, data.amount);
        const balance: IBalance = divide(data.buyTo, data.from, data.amount, prettyUser);
        if(!balance) throw new Error("From is buyTo");

        //Register new purchase
        let update = await basePurchase.update(
            data.id,
            data.title,
            data.amount,
            oldPurchase.date,
            data.buyTo,
            data.from,
            oldPurchase.listId,
            totals.total0,
            totals.total1,
            balance.balance0,
            balance.balance1
        );
        if(!update.acknowledged) throw new Error("Update went wrong");

        //Apply new purchase on list
        return baseList.update(
            list._id,
            list.name,
            list.main,
            list.total0,
            list.total1,
            list.balance0,
            list.balance1,
            list.merged
        )
        .then((result: IUpdateOne) => {
            return result;
        })
        .catch((error: Error) => {
            throw error;
        });
    }
}