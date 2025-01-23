import React from "react";
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar collapseOnSelect expand="md" variant="dark">
            <Navbar.Brand>
                <img src={sdrsLogo} alt="logo" width={60} />
                SDRS
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="/tickets">Ticket</Nav.Link>
                    <Nav.Link href="/">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;
