import React, { useState, useContext } from 'react';
import './Login.css';
import { auth } from '../App/firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../App/logo.png';
import { UserContext } from '../App/useUser';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password)
            setUser(userCredential);
            console.log(userCredential);
        } catch (e) { 
            setError(e.message) 
        }
    }

    return (
        <div className="text-center login-wrapper">
            <Form className="form-signin" onSubmit={handleSubmit}>
                <img className="mb-4" src={logo} alt="" width="120"></img>
                <h1 className="h3 mb-3 font-weight-normal">Create account</h1>
                <Form.Group controlId="inputEmail">
                    <Form.Label className="sr-only">Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                    <Form.Text className="text-danger">
                        {error}
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="inputPassword">
                    <Form.Label className="sr-only">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button className="btn btn-lg btn-primary btn-block" type="submit">
                    Sign up
                </Button>
                {/* <Button className="btn btn-lg btn-secondary btn-block"> */}
                <Link className="nav-link" to="/login">Log in</Link>
                {/* </Button> */}
            </Form>
        </div>
    )
}
