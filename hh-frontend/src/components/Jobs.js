import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

export default function Jobs() {
    const { currentUser } = useContext(CurrentAccount);
    const [category, setCategory] = useState("");
    const [jobs, setJobs] = useState([]);
    const [provider, setProvider] = useState({
        providerId: "",
    });
    const display = [];

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

    const handleProviderRequest = (e, id) => {
        let request = id;
        e.preventDefault();

        fetch(`http://localhost:5050/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ providerId: currentUser._id }),
        });
        console.log(id);
        fetch(
            `http://localhost:5050/memberAccounts/addRequest/${currentUser._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jobRequest: request }),
            }
        );
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

    const DisplayJobs = () => {
        if (jobs.length > 0) {
            return jobs.map((job, i) => (
                <Col key={i}>
                    <div className="job">
                        <Container md="auto" sm={8}>
                            <Card>
                                <HandleName job={job} />
                                <Card.Text>{job.description}</Card.Text>
                                <Button
                                    onClick={(e) => {
                                        handleProviderRequest(e, job._id);
                                    }}
                                >
                                    Request
                                </Button>
                            </Card>
                        </Container>
                    </div>
                </Col>
            ));
        } else {
            return (
                <div>
                    <h1>No jobs found (Try changing your source)</h1>
                </div>
            );
        }
    };

    console.log(DisplayJobs());

    const fetchJobsCategory = async (category) => {
        const response = await fetch(
            `http://localhost:5050/jobs/category/` + category
        );
        const data = await response.json();
        console.log(data);
        setJobs(data);
    };

    return (
        <div className="jobsContainer">
            <CategoryFetch />
            <DisplayJobs />
        </div>
    );
}
