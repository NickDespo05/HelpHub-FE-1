import React, { createContext, useState, useEffect } from "react";

export const JobInfo = createContext();

export default function JobInfoProvider({ children }) {
    const [jobInfo, setJobInfo] = useState({
        category: "",
        postedBy: "",
        description: "",
        address: "",
        image: "",
        state: "",
        price: "",
    });

    return (
        <JobInfo.Provider value={{ jobInfo, setJobInfo }}>
            {children}
        </JobInfo.Provider>
    );
}
