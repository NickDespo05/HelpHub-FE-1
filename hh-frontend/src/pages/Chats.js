import React, { useEffect, useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Card, Container } from "react-bootstrap";

export default function Chats() {
    const { currentUser } = useContext(CurrentUser);
    const [renderedChats, setRenderedChats] = useState(null);

    useEffect(() => {
        setRenderedChats(async () => {
            if (!currentUser) {
                console.log("here");
                return (
                    <div>
                        {/* <Card>
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Card.Text>
                                    Please login so you can view your account
                                    chats, or sign up i you are new to HelpHub.
                                </Card.Text>
                            </Card.Body>
                        </Card> */}
                        <h1>Damn</h1>
                    </div>
                );
            } else {
                const response = await fetch(
                    `http://localhost:5050/chats/account/${currentUser._id}`
                );
                const data = await response.json();
                const length = await data.messages.length;
                if (response != null) {
                    console.log("here 32");
                    data.map((chat, i) => {
                        return (
                            <div key={i}>
                                <Container>
                                    <Card>
                                        <Card.Title>
                                            {chat.bothMembers[1]}
                                        </Card.Title>
                                        <Card.Text>
                                            {chat.messages[length]}
                                        </Card.Text>
                                    </Card>
                                </Container>
                            </div>
                        );
                    });
                } else {
                    console.log("Here 48");
                    return (
                        <Container>
                            <h1>No Chats yet!</h1>
                            <p>
                                start chatting with some people and the messages
                                will show up here
                            </p>
                        </Container>
                    );
                }
            }
        });
    }, []);

    return (
        <div>
            <h1>Chats</h1>
            {renderedChats}
        </div>
    );
}
