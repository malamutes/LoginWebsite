import { Schema, model } from "mongoose";
const userSchema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 5, maxlength: 25 },
    password: {
        type: String, required: true, minlength: 8, maxlength: 20, validate: {
            validator: function (pw) {
                return /\d{3}-\d{3}-\d{4}/.test(pw);
            },
        },
    },
    country: { type: String, required: true, default: "Homeless" },
    age: { type: Number, required: true, default: 0 },
    gender: { type: String, required: true, default: 'none' }
});
const UserModel = model('User', userSchema);
export { UserModel };