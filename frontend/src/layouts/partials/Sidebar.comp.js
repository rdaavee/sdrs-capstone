import React, { useState } from "react";
import { Nav, Offcanvas, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import dashboardIconDark from "../../assets/icons/dashboard-icon-dark.svg";
import createTicketIconDark from "../../assets/icons/create-ticket-icon-dark.svg";
import ticketStatusIconDark from "../../assets/icons/ticket-status-icon-dark.svg";

import dashboardIconLight from "../../assets/icons/dashboard-icon.svg";
import createTicketIconLight from "../../assets/icons/create-ticket-icon.svg";
import ticketStatusIconLight from "../../assets/icons/ticket-status-icon.svg";

import "../../assets/fonts/fonts.css";
import "../sidebar.style.css";

const Sidebar = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [showHamburger, setShowHamburger] = useState(true);

    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 80 });

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleOpenSidebar = () => {
        setShowSidebar(true);
        setShowHamburger(false);
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false);
    };

    const handleSidebarExited = () => {
        setShowHamburger(true);
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        const offsetX = e.clientX - position.x;
        const offsetY = e.clientY - position.y;

        const handleMouseMove = (e) => {
            if (isDragging) {
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                setPosition({ x: newX, y: newY });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <div className="d-flex" style={{ minHeight: "92vh" }}>
            <div
                className="bg-white p-3 d-none d-md-block sidebar-bg"
                style={{ width: "270px", minHeight: "80vh" }}
            >
                <Nav
                    className="flex-column fw-semibold"
                    style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "13px",
                    }}
                >
                    <Nav.Link
                        href="/dashboard"
                        className={`mb-3 d-flex align-items-center ${
                            isActive("/dashboard")
                                ? "active-link rounded"
                                : "text-dark"
                        }`}
                        style={{ padding: "10px" }}
                    >
                        <img
                            src={
                                isActive("/dashboard")
                                    ? dashboardIconLight
                                    : dashboardIconDark
                            }
                            alt="Dashboard Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        href="/add-ticket"
                        className={`mb-3 d-flex align-items-center ${
                            isActive("/add-ticket")
                                ? "active-link rounded"
                                : "text-dark"
                        }`}
                        style={{ padding: "10px" }}
                    >
                        <img
                            src={
                                isActive("/add-ticket")
                                    ? createTicketIconLight
                                    : createTicketIconDark
                            }
                            alt="Create Ticket Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        Create New Ticket
                    </Nav.Link>
                    <Nav.Link
                        href="/tickets"
                        className={`mb-3 d-flex align-items-center ${
                            isActive("/tickets")
                                ? "active-link rounded"
                                : "text-dark"
                        }`}
                        style={{ padding: "10px" }}
                    >
                        <img
                            src={
                                isActive("/tickets")
                                    ? ticketStatusIconLight
                                    : ticketStatusIconDark
                            }
                            alt="Ticket Status Icon"
                            width={20}
                            height={20}
                            className="me-2"
                        />
                        Ticket Lists
                    </Nav.Link>
                    <Nav.Link
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogout();
                        }}
                        className="d-flex align-items-center text-dark mt-auto"
                        style={{ padding: "10px" }}
                    >
                        Logout
                    </Nav.Link>
                </Nav>
            </div>

            <Offcanvas
                show={showSidebar}
                onHide={handleCloseSidebar}
                onExited={handleSidebarExited}
                className="d-md-none"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                        style={{
                            fontSize: "13px",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: "bold",
                        }}
                    >
                        UPang Online Helpdesk
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav
                        className="d-flex flex-column fw-semibold"
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "13px",
                            minHeight: "100%",
                        }}
                    >
                        <Nav.Link
                            href="/dashboard"
                            className={`mb-3 d-flex align-items-center ${
                                isActive("/dashboard")
                                    ? "active-link rounded"
                                    : "text-dark"
                            }`}
                            style={{ padding: "10px" }}
                        >
                            <img
                                src={
                                    isActive("/dashboard")
                                        ? dashboardIconLight
                                        : dashboardIconDark
                                }
                                alt="Dashboard Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            Dashboard
                        </Nav.Link>
                        <Nav.Link
                            href="/add-ticket"
                            className={`mb-3 d-flex align-items-center ${
                                isActive("/add-ticket")
                                    ? "active-link rounded"
                                    : "text-dark"
                            }`}
                            style={{ padding: "10px" }}
                        >
                            <img
                                src={
                                    isActive("/add-ticket")
                                        ? createTicketIconLight
                                        : createTicketIconDark
                                }
                                alt="Create Ticket Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            Create New Ticket
                        </Nav.Link>
                        <Nav.Link
                            href="/tickets"
                            className={`mb-3 d-flex align-items-center ${
                                isActive("/tickets")
                                    ? "active-link rounded"
                                    : "text-dark"
                            }`}
                            style={{ padding: "10px" }}
                        >
                            <img
                                src={
                                    isActive("/tickets")
                                        ? ticketStatusIconLight
                                        : ticketStatusIconDark
                                }
                                alt="Ticket Status Icon"
                                width={20}
                                height={20}
                                className="me-2"
                            />
                            Ticket Status
                        </Nav.Link>
                        <Nav.Link
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogout();
                            }}
                            className="d-flex align-items-center text-dark mt-auto"
                            style={{ padding: "10px" }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            {showHamburger && (
                <Button
                    className="d-md-none position-fixed hamburger-bg"
                    style={{
                        top: `${position.y}px`,
                        left: `${position.x}px`,
                        zIndex: 1050,
                        opacity: "18%",
                        cursor: "grab",
                    }}
                    onClick={handleOpenSidebar}
                    onMouseDown={handleMouseDown}
                >
                    ☰
                </Button>
            )}

            <div className="flex-grow-1">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default Sidebar;
