import React, { useState, useContext, useEffect } from "react";
import {
    Card,
    Col,
    Row,
    ListGroup,
    Container,
    Nav,
    Button,
    Modal,
    Accordion,
    Badge,
} from "react-bootstrap";
import { CurrentAccount } from "../context/CurrentAccount";

export default function NewProviderRequests() {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [jobs, setJobs] = useState([]);
    const [reqs, setReqs] = useState([]);
    const [count, setCount] = useState(0);
    const [reqDisplay, setReqDisplay] = useState("");

    useEffect(() => {
        const getRequests = async () => {
            if (currentUser != undefined && currentUser != "") {
                const response = await fetch(
                    `http://localhost:5050/jobs/postedBy/${currentUser._id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const resData = await response.json();
                setJobs(resData);
                console.log(jobs);
            }
        };
        getRequests();
    }, [currentUser]);

    const HandleName = (props) => {
        if (props.type == "title") {
            switch (props.category) {
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
        } else {
            switch (props.category) {
                case "petCare":
                    return <p className="smallCategory">Pet Care</p>;

                case "landscaping":
                    return <p className="smallCategory">Landscaping</p>;

                case "movingHelp":
                    return <p className="smallCategory">Help Moving</p>;

                case "miscellaneous":
                    return <p className="smallCategory">Misc</p>;

                case "homeCleaning":
                    console.log(props.type);
                    return <p className="smallCategory"> Home Cleaning</p>;
                default:
                    return (
                        <p className="smallCategory">Error in Name/Category</p>
                    );
            }
        }
    };

    const handleRemove = async (e, id) => {
        const response = await fetch(
            `http://localhost:5050/memberAccounts/removeJob/${currentUser._id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({ job: id }),
            }
        );
        const data = await response.json();
        const res2 = await fetch(`http://localhost:5050/jobs/${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
        });
        const data2 = await res2.json();
        console.log(data);
        console.log(data2, "data 2");
        reload();
    };

    const RequestsDisplay = (props) => {
        try {
            const accounts = [];
            const run = async () => {
                console.log(props.id);
                const response = await fetch(
                    `http://localhost:5050/jobs/requests/${props.id}`
                );
                const data = await response.json();
                console.log(data);
                if (data != []) {
                    data.default.forEach(async (job, i) => {
                        const res2 = await fetch(
                            `http://localhost:5050/memberAccounts/${job}`
                        );
                        const data2 = await res2.json();
                        accounts.push(data2);
                    });
                }
            };
            run();

            if (accounts.length) {
                try {
                    return accounts.map((acc, i) => (
                        <Modal>
                            <Modal.Header closeButton>
                                Requests for{" "}
                                <HandleName
                                    category={props.category}
                                    type="small"
                                />
                            </Modal.Header>
                            <Modal.Body>
                                <div className="jobRequestsList">
                                    <Card>
                                        <Card.Title>{acc.name}</Card.Title>
                                        <Card.Text>{acc.description}</Card.Text>
                                        <Card.Text>
                                            {acc.accountStatus}
                                        </Card.Text>
                                    </Card>
                                </div>
                            </Modal.Body>
                        </Modal>
                    ));
                } catch (err) {
                    console.log(err);
                }
            } else {
                try {
                    return (
                        <Card>
                            <Card.Title closeButton>
                                Requests for{" "}
                                <HandleName
                                    category={props.category}
                                    type={"small"}
                                />
                            </Card.Title>
                            <Card.Body>
                                <div className="jobRequestsList">
                                    <h1>No Requests Yet!</h1>
                                </div>
                            </Card.Body>
                        </Card>
                    );
                } catch (err) {
                    console.log(err);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const HandleStatus = (props) => {
        if (props.status == "posted") {
            return (
                <Container>
                    <Nav md="auto" className="justify-content-center">
                        <Badge bg="light" text="dark">
                            <p className="postedTag">Status: </p>
                            <p className="postedTag">Posted </p>
                        </Badge>

                        <Button
                            variant="danger"
                            onClick={(e) => {
                                handleRemove(e, props.id);
                            }}
                        >
                            Remove
                        </Button>
                    </Nav>
                </Container>
            );
        } else if (
            props.status != "posted" &&
            props.provider != currentUser._id
        ) {
            return (
                <Container>
                    <ListGroup.Item>In Progress</ListGroup.Item>
                </Container>
            );
        }
    };

    const RenderJobs = () => {
        console.log(jobs);
        try {
            return jobs.map((job, i) => (
                <div className="job" key={i}>
                    <Card>
                        <Card.Title>
                            <HandleName
                                category={job.category}
                                type={"title"}
                            />
                        </Card.Title>
                        <Card.Text>{job.description}</Card.Text>
                        <Card.Text>
                            <HandleStatus
                                status={job.status}
                                id={job._id}
                                category={job.category}
                            />
                        </Card.Text>
                        <Accordion>
                            <Accordion.Header>
                                Requests for{" "}
                                <HandleName category={job.category} />
                            </Accordion.Header>
                            <Accordion.Body>
                                <RequestsDisplay
                                    category={job.category}
                                    id={job._id}
                                />
                            </Accordion.Body>
                        </Accordion>
                    </Card>
                </div>
            ));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="consumerJobs">
            <h1 id="consumerJobsTitle">Your Posted jobs</h1>
            <RenderJobs />
        </div>
    );
}
