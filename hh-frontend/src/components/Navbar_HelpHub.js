import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../navbar.css";
import logo from "./helphub-logo.png";

export default function NavbarHelpHub() {
    return (
        <div className="navbarContainer">
            <Navbar bg="bg-*" md="auto">
                <Container sm={8}>
                    <Navbar.Brand>
                        <img
                            src={logo}
                            alt="HelpHub"
                            id="logoPic"
                            className="w-5 p-1"
                        />
                    </Navbar.Brand>
                    <div className="navLinks">
                        <Nav.Link href="/signUp">
                            <p className="navLink">Sign Up</p>
                        </Nav.Link>
                    </div>

                    <div className="navLinks">
                        {" "}
                        <Nav.Link href="/signIn">
                            <p className="navLink">Sign In</p>
                        </Nav.Link>
                    </div>
                    <div className="navLinks">
                        <Nav.Link href="/postJob">
                            <p className="navLink">Post a Job</p>
                        </Nav.Link>
                    </div>
                    <div className="navLinks">
                        <Nav.Link href="/search">
                            <p className="navLink">Search</p>
                        </Nav.Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}
