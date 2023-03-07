import React, { useState, useContext, useEffect } from "react";
import {
    Card,
    Col,
    Row,
    ListGroup,
    Container,
    Nav,
    Button,
} from "react-bootstrap";
import { CurrentAccount } from "../context/CurrentAccount";

export default function NewProviderRequests() {
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [jobs, setJobs] = useState([]);
    const [reqs, setReqs] = useState([]);
    const [count, setCount] = useState(0);

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
    };

    const handleRemove = async (e, id) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:5050/memberAccounts/removeRequest/${currentUser._id}/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ job: id, accountId: currentUser._id }),
            }
        );
        const data = await response.json();
        setCurrentUser(data);
    };

    const HandleStatus = (props) => {
        if (props.status == "posted") {
            return (
                <Container>
                    <Nav md="auto" className="justify-content-center">
                        <ListGroup.Item>Posted</ListGroup.Item>
                        <div className="sideSpace"></div>
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
                    <ListGroup.Item>
                        Sorry, you were not accepted for the job.
                    </ListGroup.Item>
                    <Button>Remove</Button>
                </Container>
            );
        }
    };

    const RenderJobs = () => {
        //   console.log(jobs);
        return jobs.map((job, i) => (
            <div className="job" key={i}>
                <Card>
                    <Card.Title>
                        <HandleName category={job.category} />
                    </Card.Title>
                    <Card.Text>{job.description}</Card.Text>
                    <Card.Text>
                        <HandleStatus status={job.status} />
                    </Card.Text>
                </Card>
            </div>
        ));
    };

    return (
        <div id="consumerJobs">
            <h1 id="consumerJobsTitle">Your Requested jobs</h1>
            <RenderJobs />
        </div>
    );
}
