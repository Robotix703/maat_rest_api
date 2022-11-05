export interface IPurchase {
    _id: string
    title: string
    amount: number
    date: Date
    To: string[]
    from: string
    listId: string
    balance1: string
    balance2: string
}
  
const mongoose = require('mongoose');
  
export const purchaseSchema = mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    To: { type: [String], required:true },
    from: { type: String, required:true },
    listId: { type: String, required: true },
    balance1: { type: Number, required: true },
    balance2: { type: Number, required: true }
});
  
const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;