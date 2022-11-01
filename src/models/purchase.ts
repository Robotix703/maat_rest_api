export interface IPurchase {
    _id: string
    title: string
    amount: number
    date: Date
    for: string[]
    from: string
}
  
const mongoose = require('mongoose');
  
export const purchaseSchema = mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    for: { type: [String], required:true },
    from: { type: String, required:true }
});
  
const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;