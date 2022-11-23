import { baseList } from "./base/list";
import { baseUser } from "./base/user";
import { basePurchase } from "./base/purchase";

import { IPurchase, ISendPurchaseData } from "../models/purchase";
import { IUpdateOne } from "../models/mongoose";
import { IPrettyUser } from "../models/user";

export namespace computePurchase {

    export async function add(data: ISendPurchaseData){

        //Compute purchase
        let purchase = await computePurchase(data);
        if(!purchase){
            return new Error("Error with purchase");
        }

        //List
        let list = await baseList.getListById(data.listId);

        //Update list
        list.balance0 += purchase.balance0;
        list.balance1 += purchase.balance1;
        list.total0 += purchase.total0;
        list.total1 += purchase.total1;

        //Register purchase
        return basePurchase.register(
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
        .then((result: any) => {
            //Update List
            return baseList.updateTotalAndBalance(
                data.listId,
                list.total0,
                list.total1,
                list.balance0,
                list.balance1
            )
            .then((result: IUpdateOne) => {
                if (result.modifiedCount > 0) {
                  return {status: "OK"};
                } else {
                  return new Error("Error when updating list");
                }
            })
            .catch((error: Error) => {
                return error;
            });
        })
        .catch((error: Error) => {
            return error;
        });
    }

    export async function computePurchase(data: ISendPurchaseData) : Promise<IPurchase | null> {

        const prettyUser: IPrettyUser[] | void = await baseUser.getPrettyUsers();
        if(!prettyUser) throw new Error("Users not found");

        let total0 = 0;
        let total1 = 0;
        let balance0 = 0;
        let balance1 = 0;

        //Alone
        if(data.buyTo.length == 1){
            //Buy for himself
            if(data.buyTo[0] === data.from){
                //Do nothing
                return null;
            }
            //Buy for the seconde one
            else
            {
                //Balance
                balance0 = (data.from === prettyUser[0].id.toString()) ? data.amount : -data.amount;
                balance1 = (data.from === prettyUser[1].id.toString()) ? data.amount : -data.amount;
            }
        }
        //Divide
        else
        {
            //Balance
            balance0 = (data.from === prettyUser[0].id.toString()) ? data.amount / 2 : -data.amount / 2;
            balance1 = (data.from === prettyUser[1].id.toString()) ? data.amount / 2 : -data.amount / 2;
        }

        //Total
        (data.from === prettyUser[0].id.toString()) ? total0 = data.amount : total1 = data.amount;

        const newPurchase: IPurchase = {
            _id: '',
            title: data.title,
            amount: data.amount,
            date: new Date,
            buyTo: data.buyTo,
            from: data.from,
            listId: data.listId,
            total0: total0,
            total1: total1,
            balance0: balance0,
            balance1: balance1
        }

        return newPurchase;
    }
}