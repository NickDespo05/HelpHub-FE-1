import React, { useState, useContext, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CurrentAccount } from "../context/CurrentAccount";

export default function EditProfile() {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
        location: "",
        age: 0,
        accountType: "",
    });
    const states = [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
    ];

    useEffect(() => {
        if (currentUser != undefined) {
            setInfo({
                ...info,
                name: currentUser.name,
                email: currentUser.email,

                location: currentUser.location,
                age: currentUser.age,
                accountType: currentUser.accountType,
            });
        } else {
        }
    }, [currentUser]);

    const stateSelections = states.map((stateCode, i) => {
        return (
            <option value={stateCode} key={i}>
                {stateCode}
            </option>
        );
    });

    const checkStatus = async (res) => {
        if (res.status != 200) {
            return (
                <div>
                    <h3>Wrong password</h3>
                </div>
            );
        } else {
            const data = await res.json();
            setCurrentUser(data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:5050/memberAccounts/${currentUser._id}/`,
            {
                method: `PUT`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            }
        );

        checkStatus(response);
    };

    return (
        <div className="formContainer">
            <h1>Edit Profile</h1>
            <p>Enter what you want to change about your profile: </p>
            <div className="Spacer2"></div>
            <Form
                md="auto"
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        value={info.name}
                        onChange={(e) =>
                            setInfo({ ...info, name: e.target.value })
                        }
                    />
                </Form.Group>
                <div className="Spacer"></div>

                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={info.email}
                        onChange={(e) =>
                            setInfo({ ...info, email: e.target.value })
                        }
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <div className="Spacer"></div>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={info.password}
                        placeholder="Required to change information"
                        onChange={(e) =>
                            setInfo({ ...info, password: e.target.value })
                        }
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={info.newPassword}
                        placeholder="New Password"
                        onChange={(e) =>
                            setInfo({ ...info, newPassword: e.target.value })
                        }
                    />
                </Form.Group>
                <div className="Spacer"></div>

                <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            setInfo({
                                ...info,
                                location: e.target.value,
                            });
                        }}
                        value={info.location}
                    >
                        <option>Select Location</option>
                        {stateSelections}
                    </Form.Select>
                </Form.Group>
                <div className="Spacer"></div>

                <Form.Group>
                    <Form.Label>Account Type</Form.Label>
                    <Form.Select
                        onChange={(e) =>
                            setInfo({
                                ...info,
                                accountType: e.target.value,
                            })
                        }
                    >
                        <option>Provider</option>
                        <option>Consumer</option>
                    </Form.Select>
                </Form.Group>
                <div className="Spacer"></div>
                <div id="ageContainer">
                    <Form.Group>
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="input"
                            size="sm"
                            placeholder="age"
                            value={info.age}
                            onChange={(e) => {
                                setInfo({ ...info, age: e.target.value });
                            }}
                        />
                    </Form.Group>
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}
