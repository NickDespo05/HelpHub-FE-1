import React, { useState, useEffect, useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { CurrentAccount } from "../context/CurrentAccount";
export default function PayPalButton(props) {
    const { setCurrentUser } = useContext(CurrentAccount);
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState("");

    const handleApprove = async (order) => {
        const response = await fetch(
            `http://localhost:5050/my-server/capture-paypal-order`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID: order }),
            }
        );
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

    return (
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
                            description: props.description,
                            amount: {
                                value: props.price,
                            },
                        },
                    ],
                });
            }}
            onApprove={async (data, actions) => {
                const order = await actions.order.capture();
                console.log(order);
                handleApprove(data.orderID);
            }}
            onError={(err) => {
                setError(err);
                console.log("Paypal Error: ", error);
            }}
            onClick={(data, actions) => {
                //  const
            }}
        />
    );
}
