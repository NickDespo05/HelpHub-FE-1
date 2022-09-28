import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TasksDisplay from "./components/TasksDisplay";
import Navbar from "./components/Navbar";
import React, { useState } from "react";

function App() {
    const [accountType, setAccountType] = useState(null);
    const [accountId, setAccountTId] = useState(null);
    const [signiInStatus, setSignInStatus] = useState(false);
    const [data, setData] = useState("default");

    switch (signiInStatus) {
        case "loggedInConsumer":
            return (
                <div className="App">
                    <Navbar />
                    <TasksDisplay />
                </div>
            );
        case "loggedInProvider":
            return (
                <div className="App">
                    <Navbar />
                    <TasksDisplay />
                </div>
            );
        case "notLoggedIn":
            return (
                <div className="App">
                    <Navbar />
                    <TasksDisplay />
                </div>
            );
    }
}

export default App;
