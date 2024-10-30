import { useContext, useEffect, useState } from "react";
import { UserInterface } from "../../DatabaseLogic/User";
import { CurrentUserContext } from "../../GlobalStates/GlobalUserState";

export default function UserScreen() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [userData, setUserData] = useState<UserInterface>({ username: "", password: "" });

    useEffect(() => {
        const getUserData = async () => {
            let result = await fetch("http://localhost:5000/UserPage", {
                method: "post",
                //sending sensitive data so hide it in req body
                body: JSON.stringify(currentUser),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data: UserInterface = await result.json();
            console.log(data, "Got some output!");
            if (data) {
                console.log("GOT USER");
                setUserData(data);
                console.log(userData);
            }
        };

        getUserData();
    }, []
    )


    return (
        <p> Welcome {userData.username}, your password is {userData.password} </p>
    )
}