import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, LinkProps } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../GlobalStates/GlobalUserState';

function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let result = await fetch("http://localhost:5000/UserLogin", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const success: { success: Boolean } = await result.json();
        console.log(result);
        if (success.success === true) {
            console.log("User Verified succesfully");
            setIsSuccessful(true);
            setCurrentUser({ username: username, password: password });
        }
    };

    useEffect(() => {
        if (isSuccessful) {
            navigate("/UserScreen"); // Navigate when successful
        }
    }, [isSuccessful, navigate]);


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='EnterUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control value={username} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
                }
                    type='text' placeholder='Enter username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='EnterPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={
                    (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
                }
                    type='password' placeholder='Enter password' />
            </Form.Group>

            <Button type="submit" variant='primary' className='me-3'>
                Login
            </Button>

            <Link to="/CreateUser">
                <Button variant='primary'>
                    Create User!
                </Button>
            </Link>
        </Form>
    )
};

export default Login
