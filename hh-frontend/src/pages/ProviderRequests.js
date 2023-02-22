import { CurrentAccount } from "../context/CurrentAccount";
import React, { useContext, useEffect, useState } from "react";

export default function ProviderRequests() {
    const { currentUser } = useContext(CurrentAccount);
    const [requests, setRequests] = useState([]);
    const fetchJobs = () => {
        currentUser.requests.forEach((req, i) => {
            fetch(`http://localhost:5050/jobs/${req}`);
        });
    };
    useEffect(() => {
        if (currentUser != undefined || currentUser != "") {
            // const reqs = () => {
            //     return currentUser.requests.map((req, i) => (
            //         <div className="request">{req}</div>
            //     ));
            // };
            console.log(currentUser);
            setRequests();
        } else {
        }
    }, [currentUser]);

    return (
        <div>
            <h1>Requests Page</h1>
        </div>
    );
}
