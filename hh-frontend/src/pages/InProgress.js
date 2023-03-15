import React, { useState, useEffect, useContext } from "react";
import { CurrentAccount } from "../context/CurrentAccount";
import { useNavigate } from "react-router-dom";
import { Card, Container, ListGroup, Button } from "react-bootstrap";

export default function InProgress() {
    const { currentUser } = useContext(CurrentAccount);
    const [job, setJob] = useState({});
    const [postedBy, setPostedBy] = useState("");

    useEffect(() => {
        console.log(currentUser);
        const getJob = async () => {
            if (currentUser != undefined && currentUser != "") {
                try {
                    const response = await fetch(
                        `http://localhost:5050/jobs/${currentUser.currentJob}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    const data = await response.json();
                    setJob(data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        getJob();
    }, [currentUser]);

    useEffect(() => {
        console.log(job);
        const getPosted = async () => {
            if (job !== {}) {
                const response = await fetch(
                    `http://localhost:5050/memberAccounts/${job.postedBy}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                setPostedBy(data[0].name);
            }
        };
        getPosted();
    }, [job]);

    const HandleName = (props) => {
        switch (props.job.category) {
            case "petCare":
                return <Card.Title>Pet Care</Card.Title>;

            case "landscaping":
                return <Card.Title>Landscaping</Card.Title>;

            case "movingHelp":
                return <Card.Title>Help Moving</Card.Title>;

            case "miscellaneous":
                return <Card.Title>Misc</Card.Title>;

            case "homeCleaning":
                return <Card.Title>Home Cleaning</Card.Title>;
            default:
                return <Card.Title>Error in Name/Category</Card.Title>;
        }
    };

    return (
        <div>
            <h1 id="inProgressHeader">Job in Progress</h1>
            <div id="inProgress">
                <Card>
                    <Card.Title>
                        <HandleName job={job} />
                    </Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <ListGroup>
                        <ListGroup.Item>Posted By: {postedBy}</ListGroup.Item>
                        <ListGroup.Item>${job.price}</ListGroup.Item>
                        <ListGroup.Item>Address: {job.address}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <Button variant="primary">Arrived</Button>
                <Button variant="danger">Cancel</Button>
                <Button variant="warning">Completed</Button>
            </div>
        </div>
    );
}
//need timer for arrived and completed
