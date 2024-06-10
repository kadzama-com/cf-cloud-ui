import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Header() {
    return (
        <>
            <div>
                <Navbar bg="dark" variant="dark" className="justify-content-center">
                    <Navbar.Brand href="/">
                        Chocolate Fiesta Draw
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/draw-print">Перейти к печати</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}
