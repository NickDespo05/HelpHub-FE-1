import React, { useEffect, useContext, useState } from "react";
import { CurrentUser } from "../context/CurrentUser";
import { Card, Container } from "react-bootstrap";
import "react-router-dom";

function Chats() {
    const currentUser = useContext(CurrentUser);
    const [chats, setChats] = useState([]);
    const [children, setChildren] = useState();
    let resName;

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

    async function fetchName(id) {
        const response = await fetch(
            `http://localhost:5050/memberAccounts/${id}`,
            {
                method: "GET",
            }
        );
        const data = await response.json();
        const name = JSON.stringify(data.name);
        console.log(data.name);
        return name;
    }

    if (chats === []) {
        console.log("here 29");
        return <h1>No Chats</h1>;
    } else {
        console.log("hello 32");
        // console.log(chats[0].bothParties);
        setChildren(
            chats.map(async (chat, i) => {
                // const id =(currentUser._id == chat.bothParties[0]) ? chat.bothParties[1]: chat.bothParties[0];
                // const name = fetchName(id);
                // resName = name;
                return (
                    <div key={i}>
                        <Container>
                            <Card>
                                <Card.Body>
                                    <Card.Title>hello</Card.Title>
                                    <Card.Text>Hi</Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    </div>
                );
            })
        );
    }

    return (
        <div>
            <h1>Chats</h1>
            <div>{children}</div>
        </div>
    );
}

export default Chats;
