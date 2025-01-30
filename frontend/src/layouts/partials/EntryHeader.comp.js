import React from "react";
import upangLogo from "../../assets/images/upang-logo.png"
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import notificationIcon from "../../assets/icons/notification-bell-icon.svg";
import { Navbar, Nav } from "react-bootstrap";

const EntryHeader = () => {
    return (
        <Navbar bg="white" variant="white" className="shadow-sm px-3">
            <Navbar.Brand className="d-flex align-items-center" style={{ marginLeft: "30px" }}>
                <img src={upangLogo} alt="logo" width={50} className="me-2" />
                <img src={sdrsLogo} alt="logo" width={50} className="me-2" />
                <span
                    className="fw-bold"
                    style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "15px",
                    }}
                >
                    UPang Online Helpdesk
                </span>
            </Navbar.Brand>
            <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link
                href="/"
                style={{
                    marginRight: "15px",
                    color: "#FFD000",
                    fontSize: "18px",
                    //fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif", 
                }}
            >
                Home
            </Nav.Link>
            <Nav.Link
                href="/login"
                style={{
                    fontSize: "18px",
                    color: "#333", 
                    //fontWeight: "bold",
                    fontFamily: "'Trebuchet MS', sans-serif", 
                    marginRight: "30px" 
                }}
            >
                Login
            </Nav.Link>
        </Nav>
        </Navbar>
    );
};

export default EntryHeader;
