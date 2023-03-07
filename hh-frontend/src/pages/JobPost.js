import { CurrentAccount } from "../context/CurrentAccount";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";

export default function JobPost() {
    const { currentUser } = useContext(CurrentAccount);
    const [info, setInfo] = useState({
        category: "",
        postedBy: "",
        description: "",
        address: "",
        image: "",
        state: "",
        price: 20,
    });
    const navigate = useNavigate();

    const [postedJobs, setPostedJobs] = useState({
        completedJob: "",
    });

    useEffect(() => {
        const setUp = () => {
            console.log(info);

            console.log(currentUser);

            console.log(info.state, info.postedBy);
        };
        setUp();
    }, []);

    const handleStatus = (res) => {
        if (res.status !== 200) {
            console.log("#2");
            handleSubmit();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setInfo({
                ...info,
            });
            console.log(info);
            const response = await fetch(`http://localhost:5050/jobs`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });
            console.log("56");
            console.log(response);

            handleStatus(response);

            const data = await response.json();
            console.log(data._id, " : data id");
            setPostedJobs({ completedJob: data._id });
            const response2 = await fetch(
                `http://localhost:5050/memberAccounts/addJob/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({completedJob: data._id}),
                }
            );
            const data2 = await response2.json();
            setInfo(data);
            console.log(data, " data");
            console.log(data2, " data2");
            // navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className="Spacer2"></div>
            <h1>Post a Job</h1>
            <div className="jobPostForm">
                <Form onSubmit={handleSubmit}>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Job Category</Form.Label>
                        <Form.Select
                            value={info.category}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    category: e.target.value,
                                    state: currentUser.location,
                                    postedBy: currentUser._id,
                                });
                            }}
                        >
                            <option>Select a Category</option>
                            <option value="landscaping">Landscaping</option>
                            <option value="homeCleaning">Home Cleaning</option>
                            <option value="petCare">Pet Care</option>
                            <option value="movingHelp">Moving Help</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="file"
                            value={info.image}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    image: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <div className="Spacer"></div>
                    <Form.Group>
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            value={info.address}
                            type="text"
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    address: e.target.value,
                                });
                            }}
                        />
                        <Form.Text>The specific address of the Job.</Form.Text>
                    </Form.Group>
                    <div className="Spacer"></div>
                    <div id="priceInput">
                        <Form.Group>
                            <div id="priceLabel">
                                <Form.Label>Price</Form.Label>
                            </div>
                            <p id="dolla">$</p>
                            <div id="priceControl">
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    onChange={(e) => {
                                        setInfo({
                                            ...info,
                                            price: e.target.value,
                                        });
                                    }}
                                    value={info.price}
                                />
                            </div>
                        </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={info.description}
                            type="text"
                            placeholder="Description of Job"
                            as="textarea"
                            rows={4}
                            onChange={(e) => {
                                setInfo({
                                    ...info,
                                    description: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>

                    <div className="Spacer"></div>
                    <Button variant="primary" type="submit">
                        Post
                    </Button>
                    <div></div>
                </Form>
            </div>
        </div>
    );
}
