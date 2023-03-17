import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useState, useContext } from "react";
import Jobs from "../components/Jobs";
import CurrentUserJobs from "../components/CurrentUserJobs";
import PostedJobs from "../components/PostedJobs";

export default function HomePage() {
    const { currentUser } = useContext(CurrentAccount);
    const [Display, setDisplay] = useState({});
    useEffect(() => {
        if (currentUser == undefined && currentUser != "") {
            HandleDisplay();
        } else {
            HandleDisplay();
        }
    }, [currentUser]);

    const HandleDisplay = () => {
        if (currentUser == undefined || currentUser == "") {
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
