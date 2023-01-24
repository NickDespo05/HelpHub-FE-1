import React, { useEffect, useState } from "react";
import { Container, Card, ThemeProvider } from "react-bootstrap";
import NavbarHelpHub from "../components/Navbar_HelpHub";
import Jobs from "../components/Jobs";

export default function HomePage() {
    return (
        <div>
            <NavbarHelpHub />
            <div className="jobsDiv">
                <Jobs />
            </div>
        </div>
    );
}
