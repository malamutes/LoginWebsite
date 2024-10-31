import { useContext, useEffect, useState } from "react";
import { UserInterface } from "../../DatabaseLogic/User";
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";


export default function UserScreen() {
    const [userData, setUserData] = useState<UserInterface>({ username: "", password: "" });
    const [gettingData, setGettingData] = useState(false);

    useEffect(() => {
        const getUserData = async () => {

            const storedUser = sessionStorage.getItem('currentuser');
            let currUser = null;
            let currUsername: string = "asdsasad";
            if (storedUser) {
                currUser = JSON.parse(storedUser);
                currUsername = currUser.currentusername;
            }
            console.log(currUsername);

            let result = await fetch("http://localhost:5000/GetCurrentUser", {
                method: "post",
                body: JSON.stringify({ currentusername: currUsername }),
                headers: {
                    'Content-type': 'application/json'
                }
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