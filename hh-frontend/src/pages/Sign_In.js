import React, { useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import { CurrentAccount } from "../context/CurrentAccount";

export default function Sign_In() {
    const navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    const { setCurrent } = useContext(CurrentAccount);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:5050/memberAccounts/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            }
        );
        const data = await response.json();

        if (response.status == 200) {
            setCurrent(data.user);
            console.log(data.user);
            localStorage.getItem("token");
            navigate("/");
        } else {
            console.log(data.message);
        }
    };

    return (
        <div>
            <NavbarHelpHub />
            <div className="formContainer">
                <Form md="auto" onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={loginInfo.email}
                            onChange={(e) => {
                                setLoginInfo({
                                    ...loginInfo,
                                    email: e.target.value,
                                });
                            }}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={loginInfo.password}
                            onChange={(e) => {
                                setLoginInfo({
                                    ...loginInfo,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}
