import { IList } from "./list"
import { IPrettyUser } from "./user"

export interface IPurchase {
    _id: string
    title: string
    amount: number
    date: Date
    buyTo: string[]
    from: string
    listId: string
    total0: number
    total1: number
    balance0: number
    balance1: number
}

export interface ISendPurchaseData {
    title: string
    amount: number
    buyTo: string[]
    from: string
    listId: string
}

export interface IPrettyPurchase {
    _id: string
    title: string
    list: IList
    amount: number
    date: Date
    buyTo: string[]
    from: string
    user0: IPrettyUser
    user1: IPrettyUser
    total0: number
    total1: number
    balance0: number
    balance1: number
}

const mongoose = require('mongoose');
  
export const purchaseSchema = mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    buyTo: { type: [String], required:true },
    from: { type: String, required:true },
    listId: { type: String, required: true },
    total0: { type: Number, required: true },
    total1: { type: Number, required: true },
    balance0: { type: Number, required: true },
    balance1: { type: Number, required: true }
});
  
const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;