import React from "react";
import { useLocation } from "react-router-dom";
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import notificationIcon from "../../assets/icons/notification-bell-icon.svg";
import { Navbar, Nav } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";

const Header = () => {
    const location = useLocation();

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
            <div className="d-none d-md-block">
                <PageBreadcrumb page={location.pathname} />
            </div>
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
