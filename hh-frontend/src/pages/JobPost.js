import { CurrentAccount } from "../context/CurrentAccount";
import { JobInfo } from "../context/JobInfo";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PayPalButton from "../components/PayPalButton";

export default function JobPost() {
    const { currentUser } = useContext(CurrentAccount);
    const { jobInfo, setJobInfo } = useContext(JobInfo);
    const [info, setInfo] = useState({
        category: "",
        postedBy: "",
        description: "",
        address: "",
        state: "",
        price: "",
    });

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(CurrentAccount);
    const [paidFor, setPaidFor] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(info).indexOf("" > -1)) {
            setJobInfo(info);
            navigate("/jobPost2");
        } else {
            alert("Please enter in all values.");
        }
    };

    return (
        <div>
            <div className="Spacer2"></div>
            <h1>Post a Job</h1>
            <div className="jobPostForm">
                <Form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
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
                            <Form.Text>Minimum $20.00</Form.Text>
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
                    <Button
                        onClick={() => {
                            console.log(info);
                        }}
                    >
                        Log info
                    </Button>
                    <div className="Spacer"></div>
                    <Button variant="primary" type="submit">
                        Post
                    </Button>
                </Form>
            </div>
        </div>
    );
}
