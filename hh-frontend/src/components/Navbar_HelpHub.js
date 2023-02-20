import { CurrentAccount } from "../context/CurrentAccount";
import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../navbar.css";
import logo from "./helphub-logo.png";

export default function NavbarHelpHub() {
    const { currentUser } = useContext(CurrentAccount);

    const UserRender = () => {
        if (currentUser == null) {
            return (
                <div className="notLoggedIn">
                    <div className="navLinks" id="signUpLink">
                        <Nav.Link href="/signUp">
                            <p className="navLink">Sign Up</p>
                        </Nav.Link>
                    </div>

                    <div className="navLinks" id="signInLink">
                        {" "}
                        <Nav.Link href="/signIn">
                            <p className="navLink">Sign In</p>
                        </Nav.Link>
                    </div>
                </div>
            );
        } else {
            if (currentUser.accountType == "provider") {
                return (
                    <div className="loggedIn">
                        <div className="navLinks">
                            <Nav.Link id="viewRequestsLink">
                                <p className="navLink">View Requests</p>
                            </Nav.Link>
                        </div>
                        <div className="navLinks">
                            <Nav.Link id="userNameLink" href="/profile">
                                <p className="userName">
                                    Signed in as: {currentUser.name}
                                </p>
                            </Nav.Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="loggedIn">
                        <div className="navLinks">
                            <Nav.Link href="/postJob" id="postJobLink">
                                <p className="navLink">Post a Job</p>
                            </Nav.Link>
                        </div>
                        <div className="navLinks">
                            <Nav.Link href="/search" id="searchLink">
                                <p className="navLink">Search</p>
                            </Nav.Link>
                        </div>
                        <div className="navLinks" id="loggedInLink">
                            <Nav.Link href="/profile">
                                <p className="userName">
                                    Signed in as: {currentUser.name}
                                </p>
                            </Nav.Link>
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div className="navbarContainer">
            <Navbar bg="bg-*" md="auto">
                <Container sm={8}>
                    <Navbar.Brand>
                        <img src={logo} alt="HelpHub" id="logoPic" />
                    </Navbar.Brand>
                    <UserRender />
                </Container>
            </Navbar>
        </div>
    );
}
