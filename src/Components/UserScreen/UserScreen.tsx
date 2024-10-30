import { useContext, useEffect, useState } from "react";
import { UserInterface } from "../../DatabaseLogic/User";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";

export default function UserScreen() {
    const [userData, setUserData] = useState<UserInterface>({ username: "", password: "" });
    const [gettingData, setGettingData] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            let result = await fetch("http://localhost:5000/GetCurrentUser", {
                method: "get"
            });
            const data: UserInterface = await result.json();
            console.log(data, "Got some output!");
            if (data) {
                console.log("GOT USER");
                setUserData(data);
                console.log(data, "DATA");
                setGettingData(true);
            }
        };

        getUserData();
    }, [])

    const displayText = `Welcome ${userData.username}, your password is ${userData.password}`

    return (
        <>
            <p> {`${gettingData ? displayText : "Loading..."}`} </p>
            <Link to={"/"}>
                <Button >
                    BACK BUTTON!
                </Button>
            </Link>

        </>

    )
}