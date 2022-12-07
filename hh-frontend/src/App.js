import TasksDisplay from "./components/TasksDisplay";
import Chats from "./pages/Chats";
import React, { useState } from "react";
import CurrentUserProvider from "./context/CurrentUser";
import NavBar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneralForm from "./components/GeneralForm";

function App() {
    return (
        <CurrentUserProvider>
            <div className="App">
                <NavBar />
            </div>
        </CurrentUserProvider>
    );
}

export default App;
