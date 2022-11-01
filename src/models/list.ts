export interface IList {
    _id: string
    name: string
    main: boolean
    balance1: number
    balance2: number
    merged: boolean
}
  
const mongoose = require('mongoose');
  
export const listSchema = mongoose.Schema({
    name: { type: String, required: true },
    main: { type: Boolean, required:true },
    balance1: { type: Number, required: true },
    balance2: { type: Number, required: true },
    merged: { type: Number, required:true }
});
  
const List = mongoose.model('List', listSchema);
export default List;