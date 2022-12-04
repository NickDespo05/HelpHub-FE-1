import React from "react";
import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("");
    useEffect(() => {
        const getLoggedInUser = async () => {
            await fetch(`http://localhost:5050/memberAccounts/memberAccount`, {
                header: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }).then((data) => {
                let user = data.json();
                setCurrentUser(user);
            });
        };
        getLoggedInUser();
    }, []);
    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}
export default CurrentUserProvider;
