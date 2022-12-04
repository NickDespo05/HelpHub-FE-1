import TasksDisplay from "./components/TasksDisplay";

import React, { useState } from "react";
import CurrentUserProvider from "./context/CurrentUser";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    const [accountType, setAccountType] = useState(null);
    const [accountId, setAccountTId] = useState(null);
    const [signInStatus, setSignInStatus] = useState(false);
    const [data, setData] = useState("default");

    return (
        <CurrentUserProvider>
            <div className="App">
                <NavBar />
                <TasksDisplay />
            </div>
        </CurrentUserProvider>
    );
}

export default App;
