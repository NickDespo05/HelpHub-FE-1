import React, { useState, useContext, useEffect } from "react";
import { JobInfo } from "../context/JobInfo";
import { PayPalButtons } from "@paypal/react-paypal.js";
import { CurrentAccount } from "../context/CurrentAccount";
import { Card, ListGroup } from "react-bootstrap";

export default function JobPost2() {
    const { jobInfo } = useContext(JobInfo);
    const { currentUser } = useContext(CurrentAccount);

    const handleCapture = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: jobInfo.description,
                    amount: {
                        value: jobInfo.price,
                    },
                },
            ],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setInfo({
                ...info,
            });

            const response = await fetch(`http://localhost:5050/jobs`, {
                method: `POST`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            handleStatus(response);

            const data = await response.json();

            setPostedJobs({ completedJob: data._id });
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
            <h1>Pay for your Job and then it will be posted!</h1>
            <Card>
                <HandleName job={jobInfo} />
                <ListGroup>
                    <ListGroup.Item>Address: {jobInfo.address}</ListGroup.Item>
                    <ListGroup.Item>Price: ${jobInfo.price}</ListGroup.Item>
                </ListGroup>
            </Card>
            <PayPalButtons
                style={{
                    color: "silver",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill",
                }}
                createOrder={(data, actions) => {
                    handleCapture(data, actions);
                    console.log(handleCapture(data, actions));
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    handleApprove(data.orderID);
                }}
                onError={(err) => {
                    console.log("Paypal Error: ", err);
                }}
                onClick={(data, actions) => {
                    setPayPalInfo({
                        ...payPalInfo,
                        description: info.description,
                        price: info.price,
                    });
                    console.log(info.price, info.description);
                }}
            />
        </div>
    );
}
