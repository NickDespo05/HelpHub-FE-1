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

export default function CurrentUserJobs(props) {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [jobs, setJobs] = useState([]);
    const [providerNames, setProviderNames] = useState([]);
    const [reqs, setReqs] = useState([]);
    const [count, setCount] = useState(0);
    const [reqDisplay, setReqDisplay] = useState("");
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
        }
    };
    useEffect(() => {
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
                    return <p className="smallCategory"> Home Cleaning</p>;
                default:
                    return (
                        <p className="smallCategory">Error in Name/Category</p>
                    );
            }
        }
    };

    const getProviders = async () => {
        jobs.forEach(async (job, i) => {
            if (job.provider) {
                const response = await fetch(
                    `http://localhost:5050/memberAccounts/${job.provider}`
                );
                const data = await response.json();

                setProviderNames((names) => [...names, data[0].name]);
            } else {
                setProviderNames((names) => [...names, ""]);
            }
        });
    };

    useEffect(() => {
        getProviders();
    }, [jobs]);

    const HandleStatus = (props) => {
        if (props.status == "posted") {
            return (
                <Container>
                    <Nav md="auto" className="justify-content-center">
                        <Badge bg="light" text="dark">
                            <p className="postedTag">Status: </p>
                            <p className="postedTag">Posted </p>
                        </Badge>
                    </Nav>
                </Container>
            );
        } else if (
            props.status == "in progress" &&
            props.provider != currentUser._id
        ) {
            return (
                <Badge bg="light" text="dark">
                    <p className="postedTag">Status: </p>
                    <p className="postedTag">In progress </p>
                </Badge>
            );
        } else if (props.status == "completed") {
            return (
                <Badge bg="success" text="dark">
                    <p className="postedTag">Status: </p>
                    <p className="postedTag">Completed</p>
                </Badge>
            );
        }
    };

    const HandleProviderName = (props) => {
        if (props.job.provider && props.job.provider != "") {
            return (
                <Badge>
                    <p className="postedTag">Provider Name: </p>
                    <p className="postedTag">{providerNames[props.i]} </p>
                </Badge>
            );
        }
    };

    const RenderJobs = () => {
        try {
            if (jobs.length > 0) {
                return jobs.map((job, i) => (
                    <div className="job" key={i}>
                        <Card>
                            <Card.Title>
                                <HandleName
                                    category={job.category}
                                    type={"title"}
                                />
                            </Card.Title>
                            <Card.Text>Desc: {job.description}</Card.Text>
                            <Card.Text>Address: {job.address}</Card.Text>

                            <Card.Text>
                                <Nav className="justify-content-center">
                                    <Nav.Item>
                                        <HandleStatus
                                            status={job.status}
                                            id={job._id}
                                            category={job.category}
                                        />
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Badge bg="light" text="dark">
                                            <p className="postedTag">Price: </p>
                                            <p className="postedTag">
                                                ${job.price}
                                            </p>
                                        </Badge>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <HandleProviderName job={job} i={i} />
                                    </Nav.Item>
                                </Nav>
                            </Card.Text>
                        </Card>
                    </div>
                ));
            } else if (jobs == [] || jobs.length == 0) {
                return (
                    <h1 id="noJobsText">
                        No jobs yet! Post one to get started
                    </h1>
                );
            }
        } catch (err) {}
    };

    if (props.type == "profilePage") {
        return (
            <div className="consumerJobs">
                <h1 id="consumerJobsTitle2">Your Posted Jobs</h1>
                <RenderJobs />
            </div>
        );
    }
    return (
        <div className="consumerJobs">
            <h1 id="consumerJobsTitle">Your Posted Jobs</h1>
            <RenderJobs />
        </div>
    );
}
