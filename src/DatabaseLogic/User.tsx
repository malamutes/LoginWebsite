import { Schema, model, connect } from "mongoose";

export interface UserInterface {
    username: string,
    password: string,

}

export interface CurrentUserInterface {
    currentusername: string,
}

const userSchema = new Schema<UserInterface>(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },

    }
)

const currentUserSchema = new Schema<CurrentUserInterface>(
    {
        currentusername: { type: String, required: true, unique: true },
    }
)

const UserModel = model<UserInterface>('User', userSchema);
const CurrentUserModel = model<CurrentUserInterface>('CurrentUser', currentUserSchema, 'CurrentUser');

export { UserModel, CurrentUserModel };