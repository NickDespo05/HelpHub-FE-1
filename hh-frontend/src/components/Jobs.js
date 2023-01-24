import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";

export default function Jobs() {
    const [category, setCategory] = useState();
    const [jobs, setJobs] = useState([]);
    const display = [];
    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch(`http://localhost:5050/jobs/`);
            const data = await response.json();
            setJobs(data);
        };
        fetchJobs();
    }, []);

    const DisplayJobs = () => {
        if (jobs.length > 0) {
            return jobs.map((job, i) => (
                <Col>
                    <div className="job">
                        <Container md="auto" sm={8}>
                            <Card>
                                <Card.Title>{job.name} </Card.Title>
                                <Card.Text>{job.description}</Card.Text>
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

    const NewDisplay = () => {
        const jobsDisplay = DisplayJobs();

        for (let i = 0; i < jobsDisplay.length; i += 1) {
            display.push(<Row sm={4}>{jobsDisplay[i]}</Row>);
        }
        return display;
    };

    console.log(DisplayJobs());

    const fetchJobsCategory = async (category) => {
        const response = await fetch(
            `http://localhost:5050/jobs/category/` + category
        );
        const data = response.json();
        setJobs(data);
        console.log("24");
    };

    return (
        <div className="jobsContainer">
            <NewDisplay />
        </div>
    );
}
