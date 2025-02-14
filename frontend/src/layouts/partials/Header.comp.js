import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";

import sdrsLogo from "../../assets/images/phinma-cservice-logo.png";
import notificationIcon from "../../assets/icons/notification-bell-icon.svg";
import defaultAvatar from "../../assets/images/default-avatar.png";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";

const Header = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);
    const navigate = useNavigate();

    //TODO:: Uncomment this code to enable user photo
    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             if (user.photoURL) {
    //                 setUserPhoto(user.photoURL);
    //             } else {
    //                 setUserPhoto(defaultAvatar);
    //             }
    //         } else {
    //             setUserPhoto(defaultAvatar);
    //         }
    //     });
    //     return () => unsubscribe();
    // }, []);

    const handleLogoClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 200);
    };

    return (
        <Navbar bg="white" variant="white" className="shadow-sm px-3">
            <Navbar.Brand className="d-flex align-items-center">
                {loading && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.01)",
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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={handleLogoClick}
                >
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
                            cursor: "pointer",
                        }}
                    >
                        UPang Admin
                    </span>
                </div>
            </Navbar.Brand>
            <div className="d-none d-md-block">
                {/* <PageBreadcrumb page={location.pathname} /> */}
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

                <Nav.Link href="/profile" className="text-dark">
                    <img
                        src={userPhoto}
                        alt="User Avatar"
                        width={35}
                        height={35}
                        className="rounded-circle"
                        style={{
                            objectFit: "cover",
                            border: "2px solid #ddd",
                        }}
                    />
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default Header;
