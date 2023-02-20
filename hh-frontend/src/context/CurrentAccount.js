import React, { useState, useEffect, createContext } from "react";

export const CurrentAccount = createContext();

function CurrentAccountProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const logIn = async () => {
            console.log("getting user");

            let response = await fetch(
                `http://localhost:5050/memberAccounts/memberAccount`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            let data = await response.json();
            setCurrentUser(data);
            console.log(currentUser);
        };
        logIn();
    }, []);

    return (
        <CurrentAccount.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentAccount.Provider>
    );
}

export default CurrentAccountProvider;
