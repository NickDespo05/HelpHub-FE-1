import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { CurrentUser } from "../context/CurrentUser";

export default function TasksDisplay(props) {
    const [tasks, setTasks] = useState([]);
    const { currentUser } = useContext(CurrentUser);
    useEffect(() => {
        if (!currentUser) {
            const fetchJobs = async () => {
                const response = await fetch(`http://localhost:5050/jobs`);
                const data = await response.json();
                console.log(data);
                setTasks(data);
                console.log(response);
            };
            // } else {
            //     const response = await fetch(
            //         `${process.env.BACKEND_URL}/jobs/location`,
            //         {
            //             method: "GET",
            //             headers: { "Content-Type": "application/json" },
            //             body: currentUser.location,
            //         }
            //     );
            //     const data = await response.json();
            //     setJobs(data);
            // }
            fetchJobs();
        }
    }, []);

    if (tasks.length > 0) {
        const children = tasks.map((job, i) => {
            return (
                <div>
                    <Container fluid="md">
                        <Row>
                            <Col>
                                <Card>
                                    <div>
                                        <Card.Text>{job.name}</Card.Text>
                                        <Card.Text>
                                            Category: {job.category}
                                        </Card.Text>
                                        <Card.Text>{job.description}</Card.Text>
                                        <Card.Text>
                                            Location: {job.location}
                                        </Card.Text>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        });
        return <>{children}</>;
    }
    }
    

/*
    once the backend has been created make one card and map through the data given 
    through the properties 

*/
