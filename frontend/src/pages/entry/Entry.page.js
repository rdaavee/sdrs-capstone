import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, Toast, Nav, Dropdown } from "react-bootstrap";
import { auth } from "../../utils/firebase";
import defaultAvatar from "../../assets/images/default-avatar.png";
import { signOutUser } from "../../utils/firebase";

import "./Entry.style.css";

const EntryPage = () => {
    const [activeTab, setActiveTab] = useState("newRequest");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);
    const [userPhoto, setUserPhoto] = useState(defaultAvatar);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [cities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://psgc.cloud/api/provinces")
            .then((res) => res.json())
            .then((data) => setProvinces(data))
            .catch((error) =>
                console.error("Error fetching provinces:", error)
            );
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setMunicipalities([]);
        setBarangays([]);

        fetch(
            `https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`
        )
            .then((response) => response.json())
            .then((data) => setMunicipalities(data));
    };

    const handleMunicipalityChange = (e) => {
        const municipalityCode = e.target.value;
        setSelectedMunicipality(municipalityCode);
        setBarangays([]);

        fetch(
            `https://psgc.cloud/api/municipalities/${municipalityCode}/barangays`
        )
            .then((response) => response.json())
            .then((data) => setBarangays(data));
    };

    const handleLoginButton = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    const handleLogout = async () => {
        localStorage.removeItem("token");
        await signOutUser();
        setShowLogoutModal(false);
        navigate("/");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUserPhoto(user.photoURL || defaultAvatar);
            } else {
                setIsLoggedIn(false);
                setUserPhoto(defaultAvatar);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const checkOfficeHours = async () => {
            try {
                const response = await fetch(
                    "https://timeapi.io/api/Time/current/zone?timeZone=Asia/Manila"
                );
                const data = await response.json();

                const day = data.dayOfWeek;
                const hours = data.hour;
                const minutes = data.minute;

                const isWeekday = [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Sunday",
                ].includes(day);

                const isWorkingHours =
                    (hours > 8 && hours < 17) ||
                    (hours === 8 && minutes >= 0) ||
                    (hours === 17 && minutes === 0) ||
                    hours === 0 ||
                    (hours === 2 && minutes <= 60); //for testing

                setIsOpen(isWeekday && isWorkingHours);
            } catch (error) {
                console.error("Error fetching time:", error);
            }
        };

        checkOfficeHours();
        const interval = setInterval(checkOfficeHours, 60000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="document-request-container">
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg="warning"
                    show={showWarningToast}
                    onClose={() => setShowWarningToast(false)}
                    delay={3500}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Warning</strong>
                    </Toast.Header>
                    <Toast.Body className="text-dark">
                        You need to login first.
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <div className="header d-flex flex-column text-white text-center">
                <div className="d-flex justify-content-end w-100 p-3">
                    {!isLoggedIn ? (
                        <button
                            onClick={handleLoginButton}
                            className="login-button"
                        >
                            Login
                        </button>
                    ) : (
                        <Nav
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                        >
                            <Dropdown show={showDropdown}>
                                <Dropdown.Toggle
                                    as="div"
                                    className="d-flex align-items-center"
                                >
                                    <img
                                        src={userPhoto}
                                        alt="User Avatar"
                                        width={55}
                                        height={55}
                                        className="rounded-circle"
                                        style={{
                                            objectFit: "cover",
                                            border: "2px solid #ddd",
                                            marginRight: "10px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* <Dropdown.Item href="/profile">
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="/settings">
                                        Settings
                                    </Dropdown.Item>
                                    <Dropdown.Divider /> */}
                                    <Dropdown.Item onClick={handleLogout}>
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    )}
                </div>

                <h1 className="location fw-bold">
                    University of Pangasinan <br />
                    <span>Dagupan Campus</span>
                </h1>
                <h2 className="fw-light">Online Document Request System</h2>
            </div>

            <div className="tabs gap-3">
                {[
                    { id: "newRequest", label: "New Request" },
                    { id: "requestTracker", label: "Request Tracker" },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        data-id={tab.id}
                        className={`tab-button ${
                            activeTab === tab.id ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <hr />

            <div className="content">
                {activeTab === "newRequest" ? (
                    <motion.div
                        key="newRequest"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="new-request"
                    >
                        <div className={`status ${isOpen ? "open" : "closed"}`}>
                            {isOpen ? "Welcome!" : "CLOSED"}
                        </div>
                        <div className="office-hours">
                            <h2>Office Hours</h2>
                            <hr />
                            <p>Monday to Friday</p>
                            <p>8:00 AM - 5:00 PM</p>
                        </div>
                        {isOpen && (
                            <button
                                className="request-button"
                                onClick={() => {
                                    if (!isLoggedIn) {
                                        setShowWarningToast(true);
                                        return;
                                    }
                                    setShowModal(true);
                                }}
                            >
                                Request a Document
                            </button>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="requestTracker"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="request-tracker"
                    >
                        <div className="grid-container">
                            <div className="grid-item">
                                <h3>Office Hours</h3>
                                <hr />
                                <p>Monday to Friday</p>
                                <p>8:00 AM - 5:00 PM</p>
                            </div>
                            <div className="grid-item">
                                <h3>Contact Us</h3>
                                <hr />
                                <p>registrar-upang@phinma.edu.ph</p>
                                <p>registrar-upang@phinma.edu.ph</p>
                            </div>
                            <div className="grid-item">
                                <h3>Advisory</h3>
                                <hr />
                                <p>
                                    Your document request PIN (4-digit) together
                                    with the REFERENCE NO. is required for
                                    tracking.
                                </p>
                                <p>
                                    Check your confirmation email for the PIN.
                                </p>
                            </div>
                        </div>
                        <div className="tracker-container">
                            <div className="tracker-text">
                                <p className="pText">
                                    To track the status of your document
                                    request, please enter{" "}
                                    <span className="spanText">
                                        REFERENCE NUMBER
                                    </span>{" "}
                                    and <span className="spanText">PIN</span>{" "}
                                    below to track your request.
                                </p>
                            </div>
                            <div className="tracker-inputs">
                                <input
                                    type="text"
                                    placeholder="Reference Number"
                                    className="input"
                                />
                                <input
                                    type="text"
                                    placeholder="4-digit PIN"
                                    className="input"
                                />
                                <button className="track-button">Track</button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-button"
                            onClick={() => setShowModal(false)}
                        >
                            ✕
                        </button>

                        <h5
                            style={{
                                fontWeight: "bold",
                                color: "white",
                            }}
                        >
                            Fill out Form
                        </h5>
                        <hr />
                        <div className="form-container">
                            <h3
                                style={{
                                    marginBottom: "30px",
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                Personal Information
                            </h3>

                            <div className="form-group">
                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="student-id">
                                            Student ID
                                        </label>
                                        <input type="text" id="student-id" />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="first-name">
                                            First Name <span>*</span>
                                        </label>
                                        <input type="text" id="first-name" />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="middle-name">
                                            Middle Name
                                        </label>
                                        <input type="text" id="middle-name" />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="last-name">
                                            Last Name <span>*</span>
                                        </label>
                                        <input type="text" id="last-name" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="degree">
                                            Degree <span>*</span>
                                        </label>
                                        <input type="text" id="degree" />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="year-graduated">
                                            Year Graduated
                                        </label>
                                        <input
                                            type="text"
                                            id="year-graduated"
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="province">
                                            Province <span>*</span>
                                        </label>
                                        <select
                                            id="province"
                                            onChange={handleProvinceChange}
                                        >
                                            <option value="">
                                                Select Province
                                            </option>
                                            {provinces.map((province) => (
                                                <option
                                                    key={province.id}
                                                    value={province.name}
                                                >
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="city">
                                            Municipality/City <span>*</span>
                                        </label>
                                        <select
                                            id="city"
                                            onChange={handleMunicipalityChange}
                                            disabled={!selectedProvince}
                                        >
                                            <option value="">
                                                Select Municipality/City
                                            </option>
                                            {cities.map((municipality) => (
                                                <option
                                                    key={municipality.id}
                                                    value={municipality.name}
                                                >
                                                    {municipality.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="city">
                                            Barangay <span>*</span>
                                        </label>
                                        <select
                                            id="city"
                                            onChange={handleMunicipalityChange}
                                            disabled={!selectedProvince}
                                        >
                                            <option value="">
                                                Select Municipality/City
                                            </option>
                                            {barangays.map((barangay) => (
                                                <option
                                                    key={barangay.id}
                                                    value={barangay.name}
                                                >
                                                    {barangay.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button className="submit-button">
                                Submit Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntryPage;
