import React, { useContext, useEffect, useState } from "react";
import { CurrentAccount } from "../context/CurrentAccount";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

export default function PostedJobs() {
    const { currentUser } = useContext(CurrentAccount);
    const [jobs, setJobs] = useState([]);
    const postedJobs = async () => {
        const arr = [];
        for (let i = 0; i < currentUser.postedJobs.length; i++) {
            const response = await fetch(
                `http://localhost:5050/jobs/${currentUser.postedJobs[i]}`
            );

            arr.push(await response.json());
        }
        setJobs(arr);
    };

    useEffect(() => {
        if (currentUser != null) {
            postedJobs();
            console.log(jobs);
        }
    }, [currentUser]);

    const HandleRender = () => {
        if (currentUser != null) {
            if (currentUser.postedJobs.length > 0) {
                return jobs.map((job, i) => (
                    <div className="postedJobsProfile" key={i}>
                        <a>
                            <Card.Title>{job.category}</Card.Title>
                            <Card.Text>{job.description}</Card.Text>
                        </a>
                    </div>
                ));
            } else {
                return (
                    <div>
                        <h1>
                            Your posted Jobs will be shown here. Post a job to
                            get started!
                        </h1>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <h1>Please sign in</h1>
                </div>
            );
        }
    };

    return (
        <div className="sideScrollPostedJobs">
            <HandleRender />
        </div>
    );
}
