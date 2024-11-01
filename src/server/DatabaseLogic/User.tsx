import { Schema, model } from "mongoose";

export interface UserInterface {
    username: string,
    password: string,
    country: string,
    age: number,
    gender: string,

}

export interface CurrentUserInterface {
    currentusername: string,
}

const userSchema = new Schema<UserInterface>(
    {
        username: { type: String, required: true, unique: true, minlength: 5, maxlength: 25 },
        password: {
            type: String, required: true, minlength: 8, maxlength: 20, validate: {
                validator: function (pw: string) {
                    return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/.test(pw);
                },
            },
        },
        country: { type: String, required: true, default: "Homeless" },
        age: { type: Number, required: true, default: 0 },
        gender: { type: String, required: true, default: 'none' }

    }
)

const UserModel = model<UserInterface>('User', userSchema);

export { UserModel };