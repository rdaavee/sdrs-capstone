import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, Toast, Nav, Dropdown } from "react-bootstrap";
import { AiOutlineFileAdd } from "react-icons/ai";

import useLocationData from "../../hooks/useLocationData";
import useAuth from "../../hooks/useAuth";
import useOfficeHours from "../../hooks/useOfficeHours";

import "./Entry.style.css";

const EntryPage = () => {
    const [activeTab, setActiveTab] = useState("newRequest");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const { isLoggedIn, userPhoto, handleLogout } = useAuth();
    const { isOpen } = useOfficeHours();

    const navigate = useNavigate();

    const handleLoginButton = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    const [formData, setFormData] = useState({
        studentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        course: "",
        yearGraduated: "",
        province: "",
        municipality: "",
        barangay: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const {
        provinces,
        municipalities,
        barangays,
        handleProvinceChange,
        handleMunicipalityChange,
        handleBarangayChange,
    } = useLocationData(setFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(formData);
        setTimeout(() => {
            setLoading(false);
            navigate("/confirm-request", { state: formData });
        }, 1500);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
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

            <div className="tabs gap-3 d-flex align-items-center">
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
                {isOpen && (
                    <button
                        className="request-button ms-auto me-3 d-none d-md-block"
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
                {isOpen && (
                    <button
                        className="request-button ms-auto me-3 d-block d-md-none"
                        onClick={() => {
                            if (!isLoggedIn) {
                                setShowWarningToast(true);
                                return;
                            }
                            setShowModal(true);
                        }}
                    >
                        <AiOutlineFileAdd size={20} />
                    </button>
                )}
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
                        <h5 style={{ fontWeight: "bold", color: "white" }}>
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
                                        <input
                                            pattern="[0-9]*"
                                            type="text"
                                            maxLength={15}
                                            id="studentId"
                                            value={formData.studentId}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="first-name">
                                            First Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="middle-name">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            id="middleName"
                                            value={formData.middleName}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="last-name">
                                            Last Name <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="email">
                                            Email <span>*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="contact-number">
                                            Mobile Number <span>*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="degree">
                                            Course <span>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="course"
                                            value={formData.course}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="year-graduated">
                                            Year Graduated
                                        </label>
                                        <input
                                            type="text"
                                            id="yearGraduated"
                                            value={formData.yearGraduated}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label htmlFor="province">
                                            Province <span>*</span>
                                        </label>
                                        <select
                                            id="province"
                                            value={formData.province.name}
                                            onChange={handleProvinceChange}
                                        >
                                            <option value="">
                                                Select Province
                                            </option>
                                            {provinces
                                                .slice()
                                                .sort((a, b) =>
                                                    a.name.localeCompare(b.name)
                                                )
                                                .map((province) => (
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
                                        <label htmlFor="municipality">
                                            Municipality/City <span>*</span>
                                        </label>
                                        <select
                                            id="municipality"
                                            value={formData.municipality.name}
                                            onChange={handleMunicipalityChange}
                                            disabled={!handleProvinceChange}
                                        >
                                            <option value="">
                                                Select Municipality
                                            </option>
                                            {municipalities.map(
                                                (municipality) => (
                                                    <option
                                                        key={municipality.id}
                                                    >
                                                        {municipality.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="barangay">
                                            Barangay <span>*</span>
                                        </label>
                                        <select
                                            id="barangay"
                                            onChange={handleBarangayChange}
                                            disabled={!handleMunicipalityChange}
                                        >
                                            <option value="">
                                                Select Barangay
                                            </option>
                                            {barangays.map((barangay) => (
                                                <option
                                                    value={
                                                        formData.barangay.name
                                                    }
                                                    key={barangay.id}
                                                >
                                                    {barangay.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <hr className="mt-4" />
                            <button
                                className="submit-button"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EntryPage;
