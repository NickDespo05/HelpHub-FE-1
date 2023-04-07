import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Footer(props) {
    return (
        <footer id="footer">
            <Navbar bg="light" md="auto" id="footerNavBar">
                <Nav>
                    <Nav.Link href="">About Us and How we Work</Nav.Link>
                </Nav>
            </Navbar>
        </footer>
    );
}
