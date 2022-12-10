import React, { useEffect, useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Card, Container } from "react-bootstrap";

function Chats() {
    const currentUser = useContext(CurrentUser);
    const [chats, setChats] = useState([]);
    let children;

    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch(
                `http://localhost:5050/chats/account/${currentUser._id}`,
                {
                    method: "GET",
                }
            );
            const data = await response.json();
            console.log(data);

            setChats(data);
        };
        fetchChats();
    }, []);
    console.log(chats);

    if (chats === []) {
        console.log("here 29");
        return <h1>No Chats</h1>;
    } else {
        console.log("hello 32");
        // console.log(chats[0].bothParties);
        children = chats.map((chat, i) => {
            return (
                <div key={i}>
                    <Container>
                        <Card>
                            <Card.Body>
                                <Card.Title>{chat.bothParties[0]}</Card.Title>
                                <Card.Text>
                                    {chat.messages[0].message}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            );
        });
    }

    return (
        <div>
            <h1>Chats</h1>
            <div>{children}</div>
        </div>
    );
}

export default Chats;
