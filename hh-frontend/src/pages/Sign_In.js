import React from "react";
import { Container, Button, Form } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";

export default function Sign_In() {
    return (
        <div>
            <NavbarHelpHub />
            <div className="formContainer">
                <Form md="auto">
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}
