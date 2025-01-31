import React, { useState } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import upangLogo from "../../assets/images/upang-logo.png";
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";

const EntryHeader = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLoginClick = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    return (
        <>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999,
                    }}
                >
                    <Spinner
                        animation="border"
                        variant="success"
                        style={{ width: "50px", height: "50px" }}
                    />
                </div>
            )}

            <Navbar
                bg="white"
                expand="lg"
                className="shadow-sm"
                style={{ height: "100px", padding: "20px" }}
            >
                <Container fluid>
                    <Navbar.Brand className="d-flex align-items-center">
                        <img
                            src={upangLogo}
                            alt="logo"
                            width={50}
                            className="me-2"
                        />
                        <img
                            src={sdrsLogo}
                            alt="logo"
                            width={50}
                            className="me-2"
                        />
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
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link
                                href="/"
                                style={{
                                    marginRight: "15px",
                                    color: "#FFD000",
                                    fontSize: "18px",
                                    fontFamily: "'Trebuchet MS', sans-serif",
                                }}
                            >
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="/login"
                                onClick={handleLoginClick}
                                style={{
                                    fontSize: "18px",
                                    color: "#333",
                                    fontFamily: "'Trebuchet MS', sans-serif",
                                    marginRight: "30px",
                                    cursor: "pointer",
                                }}
                            >
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default EntryHeader;
