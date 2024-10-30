import React from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { Link, LinkProps } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../GlobalStates/GlobalUserState';

function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [firstAttempt, setFirstAttempt] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log(isSuccessful);
        event.preventDefault();
        let result = await fetch("http://localhost:5000/UserLogin", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const success: { success: Boolean } = await result.json();
        console.log(success);
        if (success.success === true) {
            console.log("User Verified succesfully");
            setIsSuccessful(true);
            setCurrentUser({ username: username, password: password });
            setErrorMessage("");
        }
        else if (success.success === false) {
            setErrorMessage("Incorrect username or password");
        }
        setFirstAttempt(false);

    };


    useEffect(() => {
        if (isSuccessful) {
            navigate("/UserScreen"); // Navigate when successful
            console.log(currentUser);
        }
    }, [isSuccessful]);


    return (
        <Form onSubmit={handleSubmit}>
            <InputGroup hasValidation>
                <Form.Group className='mb-3' controlId='EnterUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)
                    }
                        type='text' placeholder='Enter username' required isInvalid={!firstAttempt} />

                    <Form.Control.Feedback type="invalid">
                        {errorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </InputGroup>

            <InputGroup hasValidation>
                <Form.Group className='mb-3' controlId='EnterPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)
                    }
                        type='password' placeholder='Enter password' required isInvalid={!firstAttempt} />

                    <Form.Control.Feedback type="invalid">
                        {errorMessage}
                    </Form.Control.Feedback>
                </Form.Group>
            </InputGroup>


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
