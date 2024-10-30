import { createContext, Dispatch, SetStateAction } from "react";
import { UserInterface } from "../DatabaseLogic/User";

interface CurrentUserContextType {
    currentUser: UserInterface;
    setCurrentUser: Dispatch<SetStateAction<UserInterface>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: { username: "", password: "" },
    setCurrentUser: () => { }
});