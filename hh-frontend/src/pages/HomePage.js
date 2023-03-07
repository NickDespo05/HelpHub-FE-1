import { CurrentAccount } from "../context/CurrentAccount";
import React, { useEffect, useState, useContext } from "react";
import Jobs from "../components/Jobs";
import CurrentUserJobs from "../components/CurrentUserJobs";
import PostedJobs from "../components/PostedJobs";

export default function HomePage() {
    const { currentUser } = useContext(CurrentAccount);
    const [display, setDisplay] = useState("");
    useEffect(() => {
        if (currentUser == undefined && currentUser != "") {
            HandleDisplay();
        } else {
            HandleDisplay();
        }
        console.log(display);
    }, [currentUser]);

    const HandleDisplay = () => {
        if (currentUser == undefined || currentUser == "") {
            setDisplay(
                <div className="loginMessage">
                    <h1>
                        Welcome to HelpHub! Please Login or Sign up using the
                        Navigation bar Above
                    </h1>
                </div>
            );
        } else {
            if (currentUser.accountType == "provider") {
                setDisplay(
                    <div>
                        <Jobs />
                    </div>
                );
            } else {
                setDisplay(
                    <div>
                        <CurrentUserJobs />
                    </div>
                );
            }
        }
    };
    return (
        <div>
            <div className="jobsDiv">{display}</div>
        </div>
    );
}
