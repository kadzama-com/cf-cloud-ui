import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserContext } from '../App/useUser';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
    wrapper: {
        padding: [15],
    }
});

export default function Navigation() {
    const classes = useStyles();
    const { user, removeUser } = useContext(UserContext);

    return (
        <div className={classes.wrapper}>
            <Navbar className="justify-content-between" expand="lg">
                <Navbar.Brand>
                    <Link className="navbar-brand" to="/">Chocolate Fiesta Cloud β</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/library">Models Library</Link>
                        <Link className="nav-link" to="/draw-print">Drawing Print</Link>
                        <Link className="nav-link" to="/stl-generator">3D Text Generator</Link>
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link disabled={true}>You are logged in as {user.user.email}</Nav.Link>
                        <Nav.Link onClick={removeUser}>Log out</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}