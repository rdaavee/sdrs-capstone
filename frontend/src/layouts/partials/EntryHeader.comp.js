import React, { useState } from "react";
import { Navbar, Nav, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import upangLogo from "../../assets/images/upang-logo.png";
import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import '../entryheader.style.css'

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
                <div className="loading-overlay">
                    <Spinner
                        animation="border"
                        variant="success"
                        className="loading-spinner"
                    />
                </div>
            )}

            <Navbar bg="white" expand="lg" className="shadow-sm entry-navbar">
                <Container fluid>
                    <Navbar.Brand className="d-flex align-items-center">
                        <img
                            src={upangLogo}
                            alt="UPang Logo"
                            className="brand-logo me-2"
                        />
                        <img
                            src={sdrsLogo}
                            alt="SDRS Logo"
                            className="brand-logo me-2"
                        />
                        <span className="brand-title">
                            UPang Online Helpdesk
                        </span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link href="/" className="nav-link-custom">
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="/login"
                                onClick={handleLoginClick}
                                className="nav-link-login"
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
