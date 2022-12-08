import React, { useContext, useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { CurrentUser } from "../context/CurrentUser";

export default function GeneralForm(props) {
    const setCurrentUser = useContext(CurrentUser);
    const currentUser = useContext(CurrentUser);
    const [infoSignIn, setInfoSignIn] = useState({
        email: "",
        password: "",
    });

    const userExist = () => {
        if (!currentUser) {
            return null;
        } else {
            return currentUser._id;
        }
    };

    const [newJob, setNewJob] = useState({
        name: "",
        location: "",
        postedBy: userExist,
        category: "",
        status: "posted",
    });

    const [infoSignUp, setInfoSignUp] = useState({
        email: "",
        password: "",
        location: "",
        name: "",
        age: Number,
    });

    if (props.purpose === "sign in") {
        const handleSignIn = async (e) => {
            e.preventDefault();
            const response = await fetch(
                `http://localhost:5050/memberAccounts/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(infoSignIn),
                }
            );
            const data = await response.json();
            if (response.status === 200) {
                setCurrentUser(data.user);
                localStorage.setItem("token", data.token);
                console.log(data.user, " working");
                console.log(currentUser);
            } else {
                console.log(data);
            }
        };
        return (
            <div>
                <Container>
                    <Form onSubmit={handleSignIn}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                value={infoSignIn.email}
                                name="email"
                                onChange={(e) => {
                                    setInfoSignIn({
                                        ...infoSignIn,
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formGroupPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="password"
                                value={infoSignIn.password}
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setInfoSignIn({
                                        ...infoSignIn,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Sign In
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    } else if (props.purpose === "sign up") {
        const handleSignUp = async (e) => {
            e.preventDefault();

            const response = await fetch(
                `http://localhost:5050/memberAccounts`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(infoSignUp),
                }
            );
            const data = await response.json();

            if (response.status === 200) setCurrentUser(data);
        };
        return (
            <div>
                <Container>
                    <Form onSubmit={handleSignUp}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="name"
                                value={infoSignUp.name}
                                placeholder="Enter your Name"
                                onChange={(e) => {
                                    setInfoSignUp({
                                        ...infoSignUp,
                                        name: e.target.value,
                                    });
                                }}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                value={infoSignUp.email}
                                name="email"
                                onChange={(e) => {
                                    setInfoSignUp({
                                        ...infoSignUp,
                                        email: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formGroupPassword"
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                name="password"
                                value={infoSignUp.password}
                                placeholder="Enter your password"
                                onChange={(e) => {
                                    setInfoSignUp({
                                        ...infoSignUp,
                                        password: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="formGroupPassword"
                        >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                name="location"
                                value={infoSignUp.location}
                                placeholder="Enter your Address"
                                onChange={(e) => {
                                    setInfoSignUp({
                                        ...infoSignUp,
                                        location: e.target.value,
                                    });
                                }}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    } else if (props.purpose === "new job") {
        const handleNewJob = async (e) => {
            e.preventDefault();

            const response = await fetch(`http://localhost:5050/jobs`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newJob),
            });
            const data = await response.json();
            console.log(data);
        };
        return (
            <div>
                <Form onSubmit={handleNewJob}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            name="location"
                            value={newJob.name}
                            placeholder="Enter the job title..."
                            onChange={(e) => {
                                setNewJob({ ...newJob, name: e.target.value });
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            name="location"
                            value={newJob.location}
                            placeholder="Enter the job title..."
                            onChange={(e) => {
                                setNewJob({
                                    ...newJob,
                                    location: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            onChange={(e) => {
                                setNewJob({
                                    ...newJob,
                                    category: e.target.value,
                                });
                            }}
                        >
                            <option>Select a Category</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="petCare">Pet Care</option>
                            <option value="movingHelp">Moving Help</option>
                            <option value="homeCleaning">Home Cleaning</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Post Job
                    </Button>
                </Form>
            </div>
        );
    }
}
