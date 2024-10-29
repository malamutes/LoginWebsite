import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import mongoose, { mongo } from 'mongoose'

const MongoDbUrl: string = "mongodb+srv://pavan192004:2mT9wlZpJ338zKzQ@cluster0.rdm1aur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

function CreateUser() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);

    const handleSubmit = async () => {
        let result = await fetch("http://localhost:5000/CreateUser", {
            method: "post",
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setUserName("");
            setPassword("");
        }
    };

    return (
        <Form>
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

            <Link>
                <Button variant='primary' onClick={handleSubmit}>
                    Create!
                </Button>
            </Link>

        </Form>
    )
};

export default CreateUser
