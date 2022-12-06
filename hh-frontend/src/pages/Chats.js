import React, { useEffect, useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Card } from "react-bootstrap";

export default function Chats() {
    const { currentUser } = useContext(CurrentUser);
    const [renderedChats, setRenderedChats] = useState();

    useEffect(() => {
        var handleInitialRender = () => {
            if (!currentUser) {
                return (
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title>Please Login</Card.Title>
                                <Card.Text>
                                    Please login so you can view your account
                                    chats, or sign up i you are new to HelpHub.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                );
            } else {
                //TBD
            }
        };
        setRenderedChats(handleInitialRender());
    }, []);

    return (
        <div>
            <h1>Chats</h1>
            {renderedChats}
        </div>
    );
}
