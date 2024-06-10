import React, { useState, useContext } from 'react';
import { UserContext } from '../App/useUser';
import './Login.css';
import { auth } from '../App/firebase';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import logo from '../App/logo.png';
import { Link } from 'react-router-dom';


export default function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    await auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <div className="text-center login-wrapper">
        <Form className="form-signin" onSubmit={handleSubmit}>
          <img className="mb-4" src={logo} alt="" width="120"></img>
          <h1 className="h3 mb-3 font-weight-normal">Авторизация</h1>
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
            Log in
          </Button>
          {/* <Button className="btn btn-lg btn-secondary btn-block"  onClick={() => window.open("https://chocolatefiesta.ru/cloud/", '_blank')}>
            Получить доступ
          </Button> */}
          <Link className="nav-link" to="/signup">Create account</Link>
        </Form>
    </div>
  )
}
