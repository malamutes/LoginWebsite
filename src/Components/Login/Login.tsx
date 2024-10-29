import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, LinkProps } from 'react-router-dom'

function Login() {

    return (
        <Form>
            <Form.Group className='mb-3' controlId='EnterUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter username' />
            </Form.Group>

            <Form.Group className='mb-3' controlId='EnterPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' />
            </Form.Group>


            <Link to="/UserScreen" className='me-3'>
                <Button variant='primary'>
                    Login
                </Button>
            </Link>

            <Link to="/CreateUser">
                <Button variant='primary'>
                    Create User!
                </Button>
            </Link>
        </Form>
    )
};

export default Login
