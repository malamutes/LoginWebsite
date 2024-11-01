import { useEffect, useState } from "react";
import { UserInterface } from "../../../server/DatabaseLogic/User";
import { Button, Card } from 'react-bootstrap'
import { Link } from "react-router-dom";


export default function UserScreen() {
    const [userData, setUserData] = useState<UserInterface>({ username: "", password: "", country: "", age: 0, gender: "" });
    const [dataLoaded, setDataLoaded] = useState(false);

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

            let result = await fetch("https://loginwebsitebackend.onrender.com/GetCurrentUser", {
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
                setDataLoaded(true);

            }
        };


        getUserData();

    }, [])

    const message = `You are from ${userData.country}, a ${userData.gender} and you are ${userData.age} years old.`

    return (
        <>
            <Card style={{ width: '25rem' }} className="mb-3">
                <Card.Body>
                    <Card.Title>{userData.username}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">PASSWORD HIDDEN</Card.Subtitle>
                    <Card.Text>
                        {dataLoaded ? message : "Loading..."};
                    </Card.Text>
                </Card.Body>
            </Card>

            <Link to={"/"}>
                <Button >
                    BACK BUTTON!
                </Button>
            </Link>

        </>

    )
}