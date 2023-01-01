export interface IUser {
    _id: string
    name: string
    password: string
    number: number
    api_key: string
}

export interface IPrettyUser {
    name: string,
    id: string,
    number: number
}
  
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
  
export const userSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
    api_key: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
export default User;