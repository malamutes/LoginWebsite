import { Button, Form } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../GlobalStates/GlobalUserState';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [isSuccessful, setIsSuccessful] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let result = await fetch("http://localhost:5000/CreateUser", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result, "HELLO");
        if (result) {
            console.log("Data saved succesfully");
            setCurrentUser({ username: username, password: password });
            setIsSuccessful(true);
            setUserName("");
            setPassword("");
            console.log(currentUser, "NEWUSER");
        }
    };

    useEffect(() => {
        if (isSuccessful) {
            navigate("/UserScreen"); // Navigate when successful
        }
    }, [isSuccessful, navigate]);

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='CreateUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
                }
                    type='text' placeholder='Create username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='CreatePassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
                }
                    type='password' placeholder='Create password' />
            </Form.Group>

            <Button type="submit" variant='primary'>
                Create!
            </Button>

        </Form >
    )
};

export default CreateUser
