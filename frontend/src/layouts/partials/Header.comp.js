import React from "react";
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import notificationIcon from "../../assets/icons/notification-bell-icon.svg";
import { Navbar, Nav } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="white" variant="white" className="shadow-sm px-3">
            <Navbar.Brand className="d-flex align-items-center">
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
                    href="/notifications"
                    className="text-dark position-relative"
                    style={{ marginRight: "10px" }}
                >
                    <img
                        src={notificationIcon}
                        alt="Notifications"
                        width={25}
                        height={25}
                    />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
