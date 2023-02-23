import React from "react";
import { CurrentAccount } from "../context/CurrentAccount";
import { Form, Button } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);

    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        accountType: "",
        age: "",
        location: "",
    });

    const [loginInfo, setLoginInfo] = useState({
        email: info.email,
        password: info.password,
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

    const stateSelections = states.map((stateCode, i) => {
        return (
            <option value={stateCode} key={i}>
                {stateCode}
            </option>
        );
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:5050/memberAccounts/`, {
            method: `POST`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(info),
        });

        setLoginInfo({
            ...loginInfo,
            email: info.email,
            password: info.password,
        });
        console.log(loginInfo);
        const loginRes = await fetch(
            `http://localhost:5050/memberAccounts/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginInfo),
            }
        );
        const loginData = await loginRes.json();

        if (loginRes.status == 200) {
            setCurrentUser(loginData.user);
            console.log(loginData.user);
            localStorage.setItem("token", loginData.token);
            navigate("/");
        } else {
            console.log(loginData.message);
        }
        navigate("/");
    };

    return (
        <div>
            <div className="formContainer">
                <h1>Sign Up</h1>
                <div className="Spacer2"></div>
                <Form md="auto" onSubmit={handleSubmit}>
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
                            placeholder="Password"
                            onChange={(e) =>
                                setInfo({ ...info, password: e.target.value })
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
                            <option value="provider">Provider</option>
                            <option value="consumer">Consumer</option>
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
        </div>
    );
}
