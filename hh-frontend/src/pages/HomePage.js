import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useState, useContext } from "react";
import Jobs from "../components/Jobs";
import CurrentUserJobs from "../components/CurrentUserJobs";

export default function HomePage() {
    const { currentUser } = useContext(CurrentAccount);
    useEffect(() => {
        console.log(currentUser);
    }, []);

    const HandleDisplay = () => {
        if (currentUser === undefined) {
            return (
                <div className="loginMessage">
                    <h1>
                        Welcome to HelpHub! Please Login or Sign up using the
                        Navigation bar Above
                    </h1>
                </div>
            );
        } else {
            if (currentUser.accountType == "provider") {
                return (
                    <div>
                        <Jobs />
                    </div>
                );
            } else {
                return (
                    <div>
                        <CurrentUserJobs />
                    </div>
                );
            }
        }
    };
    return (
        <div>
            <div className="jobsDiv">
                <HandleDisplay />
            </div>
        </div>
    );
}
