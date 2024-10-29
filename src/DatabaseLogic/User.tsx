import { Schema, model, connect } from "mongoose";

export interface UserInterface {
    username: string,
    password: string
}

const userSchema = new Schema<UserInterface>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }
)

const User = model<UserInterface>('User', userSchema);

export { User };