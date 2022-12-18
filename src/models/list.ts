import { IPrettyUser } from "./user"

export interface IList {
    _id: string
    name: string
    main: boolean
    total0: number
    total1: number
    balance0: number
    balance1: number
    merged: boolean
}

export interface IPrettyList {
    _id: string
    name: string
    main: boolean
    user0: IPrettyUser
    user1: IPrettyUser
    total0: number
    total1: number
    balance0: number
    balance1: number
    merged: boolean
}
  
const mongoose = require('mongoose');
  
export const listSchema = mongoose.Schema({
    name: { type: String, required: true },
    main: { type: Boolean, required:true },
    total0: { type: Number, required: true },
    total1: { type: Number, required: true },
    balance0: { type: Number, required: true },
    balance1: { type: Number, required: true },
    merged: { type: Boolean, required:true }
});
  
const List = mongoose.model('List', listSchema);
export default List;