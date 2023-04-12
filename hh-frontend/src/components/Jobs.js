import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useState, useContext } from "react";
import {
    Container,
    Card,
    Row,
    Col,
    Form,
    Button,
    ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [category, setCategory] = useState("");
    const [jobs, setJobs] = useState([]);
    const [provider, setProvider] = useState({
        providerId: "",
    });
    const [numJobs, setNumJobs] = useState(0);
    const [count, setCount] = useState({});

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:5050/jobs/`);
            const data = await response.json();
            setJobs(data);
        };
        fetchJobs();
    }, []);

    const handleCategory = (e) => {
        e.preventDefault();
        fetchJobsCategory(category);
    };

    const handleProviderRequest = async (e, i) => {
        e.preventDefault();

        const response2 = await fetch(
            `http://localhost:5050/jobs/${jobs[i]._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ providerId: currentUser._id }),
            }
        );

        const response = await fetch(
            `http://localhost:5050/memberAccounts/setCurrentJob/${currentUser._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentJob: jobs[i]._id }),
            }
        );
        const data = await response.json();
        setCurrentUser(data);

        if (response.status == 200 && response2.status == 200) {
            navigate("/inProgress");
        }
    };

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

    const CategoryFetch = () => {
        return (
            <div className="categorySelect">
                <Form onSubmit={handleCategory}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            value={category}
                        >
                            <option value="landscaping">Landscaping</option>
                            <option value="homeCleaning">Home Cleaning</option>
                            <option value="movingHelp">Help Moving</option>
                            <option value="petCare">Pet Care</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                        Search
                    </Button>
                </Form>
            </div>
        );
    };

    const HandleJob = (props) => {
        if (props.job.status == "posted") {
            return (
                <Col key={props.i}>
                    <div className="job">
                        <Container md="auto" sm={8}>
                            <Card>
                                <HandleName job={props.job} />
                                <Card.Text>{props.job.description}</Card.Text>
                                <Card.Text>
                                    Price: {parseInt(props.job.price) * 0.9}
                                </Card.Text>
                                <HandleExtras job={props.job} />
                                <Button
                                    onClick={(e) => {
                                        handleProviderRequest(e, props.i);
                                    }}
                                >
                                    Request
                                </Button>
                            </Card>
                        </Container>
                    </div>
                </Col>
            );
        }
    };

    const HandleExtras = (props) => {
        if (props.job.extraInfo) {
            switch (props.job.category) {
                case "petCare":
                    return (
                        <ListGroup>
                            <ListGroup.Item>
                                Pet: {props.job.extraInfo.pet}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Weight: {props.job.extraInfo.petWeight} lbs
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Temper {props.job.extraInfo.temper}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Equipment{props.job.extraInfo.equipment}
                            </ListGroup.Item>
                        </ListGroup>
                    );
                case "landscaping":
                    return (
                        <ListGroup>
                            <ListGroup.Item>
                                Estimated Time:{" "}
                                {props.job.extraInfo.estimatedTime}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Home Type: {props.job.extraInfo.homeType} lbs
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Equipment{props.job.extraInfo.equipment}
                            </ListGroup.Item>
                        </ListGroup>
                    );
                case "homeCleaning":
                    return (
                        <ListGroup>
                            <ListGroup.Item>
                                Estimated Time:{" "}
                                {props.job.extraInfo.estimatedTime}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Home Type: {props.job.extraInfo.numOfRooms} lbs
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Sq Ft: {props.job.extraInfo.numSqFt}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Equipment{props.job.extraInfo.equipment}
                            </ListGroup.Item>
                        </ListGroup>
                    );
                case "movingHelp":
                    return (
                        <ListGroup>
                            <ListGroup.Item>
                                Estimated Time:{" "}
                                {props.job.extraInfo.estimatedTime}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Max Item Weight: {props.job.extraInfo.maxWeight}
                            </ListGroup.Item>
                        </ListGroup>
                    );
            }
        }
    };

    const DisplayJobs = () => {
        if (jobs.length > 0) {
            return jobs.map((job, i) => <HandleJob job={job} i={i} />);
        } else if (jobs.length == 0) {
            return (
                <div>
                    <h1 id="noJobsTextHome">
                        No jobs found (Try changing your source)
                    </h1>
                </div>
            );
        }
    };

    const fetchJobsCategory = async (category) => {
        const response = await fetch(
            `http://localhost:5050/jobs/category/` + category
        );
        const data = await response.json();

        setJobs(data);
    };

    return (
        <div className="jobsContainer">
            <CategoryFetch />
            <DisplayJobs />
        </div>
    );
}
