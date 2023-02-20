import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useContext, useState } from "react";
import { Card, Container, Button } from "react-bootstrap";

export default function CurrentUSerJobs(props) {
    const { currentUser } = useContext(CurrentAccount);
    const [userJobs, setUserJobs] = useState([]);
    useEffect(() => {
        const handleFetch = async () => {
            const response = await fetch(
                `http://localhost:5050/jobs/postedBy/${currentUser._id}`
            );
            const data = await response.json();
            setUserJobs(data);
            console.log(data);
        };
        handleFetch();
    }, []);

    const RenderJobs = () => {
        console.log(userJobs);
        return userJobs.map((job, i) => {
            <Container>
                <Card>
                    <Card.Title>{job.category}</Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Button href="/jobRequests">View Requests</Button>
                </Card>
            </Container>;
        });
    };

    return (
        <div>
            <RenderJobs />
        </div>
    );
}
