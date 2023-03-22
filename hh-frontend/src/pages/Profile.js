import React, { useState, useContext, useEffect } from "react";
import { CurrentAccount } from "../context/CurrentAccount";
import {
    Button,
    Row,
    Card,
    Container,
    ListGroup,
    Placeholder,
    Image,
} from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import PostedJobs from "../components/PostedJobs";
import { useNavigate } from "react-router-dom";
import CurrentUserJobs from "../components/CurrentUserJobs";

export default function Profile() {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [info, setInfo] = useState({});
    const navigate = useNavigate();
    const [edit, setEdit] = useState(currentUser);
    const [editing, setEditing] = useState(false);

    const handleEdit = async () => {
        const response = await fetch(
            `http://localhost:5050/memberAccounts/${currentUser._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(edit),
            }
        );
        const data = await response.json();
        setCurrentUser(data);
    };

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    };

    const Render = () => {
        if (currentUser == null) {
            return (
                <Container>
                    <h1>Please Sign in</h1>
                </Container>
            );
        } else {
            if (currentUser.accountType == "provider") {
                return (
                    <div>
                        <Container>
                            <div className="profileCard">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                    />
                                    <Card.Title>{currentUser.name}</Card.Title>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            Email: {currentUser.email}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Location: {currentUser.location}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Age: {currentUser.age}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                        </Container>
                    </div>
                );
            } else {
                return (
                    <div>
                        <div className="Spacer"></div>
                        <Container>
                            <div className="profileCard">
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                                    />
                                    <Card.Title>{currentUser.name}</Card.Title>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            Email: {currentUser.email}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Location: {currentUser.location}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Age: {currentUser.age}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                        </Container>
                        <div id="profileJobs">
                            <CurrentUserJobs type={"profilePage"} />
                        </div>
                    </div>
                );
            }
        }
    };

    return (
        <div id="profileDiv">
            <Render />
            <div className="Spacer"></div>

            <Button id="editProfileButton" href="/editProfile">
                Edit Profile
            </Button>
            <Button
                id="logoutButton"
                variant="danger"
                onClick={() => {
                    logOut();
                }}
            >
                Log Out
            </Button>
        </div>
    );
}
