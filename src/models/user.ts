export interface IUser {
    _id: string
    name: string
    password: string
}
  
const mongoose = require('mongoose');
  
export const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required:true }
});

const User = mongoose.model('User', userSchema);
export default User;