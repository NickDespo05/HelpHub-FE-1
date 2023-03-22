import React, { useState, useEffect, useContext } from "react";
import { CurrentAccount } from "../context/CurrentAccount";
import { useNavigate } from "react-router-dom";
import { Card, Container, ListGroup, Button, Badge } from "react-bootstrap";

export default function InProgress() {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [job, setJob] = useState({});
    const [postedBy, setPostedBy] = useState("");
    const [clickCheck, setClickCheck] = useState(0);
    var timer;
    const navigate = useNavigate();
    const getJob = async () => {
        currentUser;

        if (
            currentUser != undefined &&
            currentUser != "" &&
            currentUser.currentJob != ""
        ) {
            currentUser.currentJob;
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
                data, "data";
                setJob(data);
                job, "job";
            } catch (err) {
                err;
            }
        } else {
        }
    };

    useEffect(() => {
        const getCurrentAgain = async () => {
            let response2 = await fetch(
                `http://localhost:5050/memberAccounts/memberAccount`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            let data = await response2.json();
            setCurrentUser(data);
        };
        getCurrentAgain();
    }, []);

    useEffect(() => {
        getJob();
    }, [currentUser]);

    useEffect(() => {
        job;
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
                data;
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

    const handleJobCancel = async () => {
        job;
        if (job._id != "" && job._id != undefined) {
            const response = await fetch(
                `http://localhost:5050/memberAccounts/cancelJob/${currentUser._id}/${job._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ currentJob: "" }),
                }
            );

            navigate("/");
        } else {
            job;
            currentUser;
            getJob();
        }
    };

    var seconds = 0;
    var minutes = 0;
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         (sec)
    //         setSec(sec + 1);
    //         // if (sec == 59) {
    //         //     setMin(min + 1);
    //         //     setSec(0);
    //         // }
    //         (sec);
    //         // if (min == 45) {
    //         //     clearInterval(timer);
    //         // }
    //     }, 1000);
    //     return () => clearInterval(timer);
    // }, [clickCheck]);

    // const Timer = () => {
    //     if (clickCheck != 0) {
    //         return (
    //             <Container>
    //                 <Badge variant="secondary">
    //                     {sec}:{min}
    //                 </Badge>
    //             </Container>
    //         );
    //     }
    // };

    const handleArrived = async (e) => {
        e.preventDefault();
        setClickCheck(1);
        const response = await fetch(`http://localhost:5050/jobs/${job._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "arrived",
            }),
        });
        const data = await response.json();
        data;
    };

    const handleCompletion = async () => {
        const response = await fetch(
            `http://localhost:5050/memberAccounts/completeJob/${currentUser._id}/${job.postedBy}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({ job: job._id }),
            }
        );
        const data = await response.json();
        data;
        if (response.status == 200) {
            navigate("/");
        } else {
            response;
        }
    };

    const HandleStatus = () => {
        if (clickCheck > 0) {
            return (
                <div>
                    <Button
                        onClick={() => {
                            handleCompletion();
                        }}
                        variant="success"
                    >
                        Completed
                    </Button>
                    <p>
                        A job cannot be canceled a job if you have arrived. If
                        you have a problem please contact helphub@helphub.com or
                        call 610-716-9658
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <Button
                        variant="warning"
                        onClick={(e) => {
                            handleArrived(e);
                        }}
                    >
                        Arrived
                    </Button>
                    <Button variant="danger" onClick={handleJobCancel}>
                        Cancel
                    </Button>
                </div>
            );
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

                <HandleStatus />
            </div>
        </div>
    );
}
//need timer for arrived and completed
