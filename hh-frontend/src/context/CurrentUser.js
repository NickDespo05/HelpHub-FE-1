import React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getLogin = async () => {
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
        };
        getLogin();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}
export default CurrentUserProvider;
