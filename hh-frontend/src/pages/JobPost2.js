import React, { useState, useContext, useEffect } from "react";
import { JobInfo } from "../context/JobInfo";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CurrentAccount } from "../context/CurrentAccount";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function JobPost2() {
    const { jobInfo } = useContext(JobInfo);
    const { currentUser, setCurrentUser } = useContext(CurrentAccount);
    const [info, setInfo] = useState(jobInfo);
    const [error, setError] = useState("");
    const [paidFor, setPaidFor] = useState(false);
    const navigate = useNavigate();
    const price = jobInfo.price;
    const description = jobInfo.description;
    const handleCapture = (data, actions) => {
        console.log(price, description);
        const response = actions.order.create({
            purchase_units: [
                {
                    description: description,
                    amount: {
                        value: price,
                    },
                },
            ],
        });
        console.log(response);
        return response;
    };

    const handleApprove = async (order) => {
        const response = await fetch(`http://localhost:5050/logPayPalInfo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ order: order }),
        });
        if (response.status == 200) {
            setPaidFor(true);
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
            let data2 = await response2.json();
            setCurrentUser(data2);
            console.log(currentUser);
        } else {
            setError(response.err);
        }
    };

    if (error) {
        alert(error);
    }
    if (paidFor) {
        alert(
            "Your Purchase Was Approved. Now wait for a provider to take the job and once they do you will be notified via email and they will be on their way!"
        );
    }

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5050/jobs`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            const data = await response.json();

            const response2 = await fetch(
                `http://localhost:5050/memberAccounts/addJob/${currentUser._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ completedJob: data._id }),
                }
            );
            const data2 = await response2.json();
            setInfo(data);

            navigate("/");
        } catch (err) {}
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

    return (
        <div>
            <div id="payForJob">
                <h1>Pay for your Job and then it will be posted!</h1>
                <div className="Spacer"></div>
                <Card>
                    <HandleName job={jobInfo} />
                    <ListGroup>
                        <ListGroup.Item>
                            Address: {jobInfo.address}
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${jobInfo.price}</ListGroup.Item>
                    </ListGroup>
                </Card>
                <div className="Spacer"></div>
                <div className="Spacer"></div>

                <PayPalButtons
                    style={{
                        color: "silver",
                        layout: "horizontal",
                        height: 48,
                        tagline: false,
                        shape: "pill",
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: description,
                                    amount: {
                                        value: price,
                                    },
                                },
                            ],
                        });
                        console.log("142");
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log(data, " : data");
                        console.log(order, " : order");
                        handleApprove(data.orderID);
                        handleSubmit();
                    }}
                    onError={(err) => {
                        console.log("Paypal Error: ", err);
                    }}
                    onClick={(data, actions) => {}}
                />
            </div>
        </div>
    );
}
