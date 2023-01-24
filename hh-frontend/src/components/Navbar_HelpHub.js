import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../navbar.css";
import logo from "./helphub-logo.png";

export default function NavbarHelpHub() {
    return (
        <div className="navbarContainer">
            <Navbar bg="light" md="auto">
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
                        <Nav.Link href="/signup">Sign Up</Nav.Link>
                    </div>
                    <div className="navLinks">
                        {" "}
                        <Nav.Link href="/signIn">Sign In</Nav.Link>
                    </div>
                    <div className="navLinks">
                        <Nav.Link href="/post">Post a Job</Nav.Link>
                    </div>
                    <div className="navLinks">
                        <Nav.Link href="/search">Search</Nav.Link>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}
