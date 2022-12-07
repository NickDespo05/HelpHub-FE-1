import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import React, { useEffect, useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Button } from "react-bootstrap";
import "../navbar.css";

export default function Navbar(props) {
    const { setCurrentUser } = useContext(CurrentUser);
    const { currentUser } = useContext(CurrentUser);
    const [signInState, setSignInState] = useState();

    useEffect(() => {
        const dynamicRender = () => {
            if (!currentUser) {
                return (
                    <>
                        <Nav.Link href="#">Sign In</Nav.Link>
                        <Nav.Link href="#">Sign Up</Nav.Link>
                    </>
                );
            } else {
                return (
                    <div>
                        <h1>signed in</h1>
                    </div>
                );
            }
        };
        setSignInState(dynamicRender);
    }, []);

    return (
        <div className="navbar-container">
            <Nav gap={3}>
                {/* <Nav.Brand>
                    <img />
                </Nav.Brand> */}
                <Nav.Link href="#">Look for a job</Nav.Link>
                <Nav.Link href="#">Post a Job</Nav.Link>
                <Nav.Link href="#">Chats</Nav.Link>
                <Nav.Link href="#">Completed Jobs</Nav.Link>
                {signInState}
            </Nav>
        </div>
    );
}
