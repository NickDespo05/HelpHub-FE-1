import React, { useState, useEffect, createContext } from "react";

export const CurrentAccount = createContext();

export default function CurrentAccountProvider({ children }) {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        const logIn = async () => {
            const response = await fetch(
                `http://localhost:5050/memberAccounts/memberAccount`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            let user = await response.json();
            setCurrent(user);
        };
        logIn();
    }, []);

    return (
        <CurrentAccount.Provider value={{ current, setCurrent }}>
            {children}
        </CurrentAccount.Provider>
    );
}
