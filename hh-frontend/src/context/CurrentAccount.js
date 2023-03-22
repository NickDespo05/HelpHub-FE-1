import React, { useState, useEffect, createContext } from "react";

export const CurrentAccount = createContext();

function CurrentAccountProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const logIn = async () => {
            ("getting user");

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
            let data = await response2.json();
            setCurrentUser(data);
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
