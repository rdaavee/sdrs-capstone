import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, Toast, Nav, Dropdown, Col } from "react-bootstrap";
import axios from "axios";

import useLocationData from "../../hooks/useLocationData";
import useAuth from "../../hooks/useAuth";
import useOfficeHours from "../../hooks/useOfficeHours";

import { AiOutlineFileAdd } from "react-icons/ai";
import upangLogo from "../../assets/images/upang-logo.png";

import "./Entry.style.css";
import { fetchDocumentFees, fetchTrackerRequest } from "../../services/api";

const EntryPage = () => {
    const [activeTab, setActiveTab] = useState("newRequest");
    const [loading, setLoading] = useState(true);
    const [sendRequest, setRequest] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showWarningToast, setShowWarningToast] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const { isLoggedIn, userPhoto, handleLogout } = useAuth();
    const { isOpen } = useOfficeHours();

    const [documentFees, setDocumentFees] = useState({});
    const [selectedFee, setSelectedFee] = useState(0);

    const navigate = useNavigate();

    const handleLoginButton = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate("/login");
        }, 1500);
    };

    const courses = [
        "Bachelor of Science in Accountancy",
        "Bachelor of Science in Management Accounting",
        "Bachelor of Science in Accountancy Technology",
        "Bachelor of Science in Hospitality Management",
        "Bachelor of Science in Tourism Management",
        "Bachelor of Science in Business Administration",
        "Bachelor of Science in Business Administration Major in Marketing Management",
        "Bachelor of Science in Business Administration Major in Financial Management",
        "Bachelor of Arts in Political Science",
        "Bachelor of Science in Elementary Education",
        "Bachelor of Secondary Education",
        "Bachelor of Science in Criminology",
        "Bachelor of Science in Architecture",
        "Bachelor of Science in Computer Engineering",
        "Bachelor of Science in Civil Engineering",
        "Bachelor of Science in Electrical Engineering",
        "Bachelor of Science in Mechanical Engineering",
        "Bachelor of Science in Nursing",
        "Bachelor of Science in Pharmacy",
        "Bachelor in Medical Laboratory Science",
        "Bachelor of Science in Psychology",
        "Bachelor of Science in Information Technology",
    ];

    const [formData, setFormData] = useState({
        referenceNumber: "",
        studentNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        course: "",
        yearGraduated: "",
        province: "",
        municipality: "",
        barangay: "",
        sampleDocument: "",
        // New keys for updated modal fields:
        // tor_generalPurpose: false,
        // tor_boardExam: false,
        // tor_transfer: false,
        // tor_otrGeneralPurpose: false,
        // tor_otrBoard: false,
        // recordNotes: "",
        // diploma: false,
        // cert_enrollment: false,
        // cert_graduation: false,
        // cert_unitsEarned: false,
        // cert_grades: false,
        // cert_gradesAY: "", //if needed, delete
        // cert_honor: false,
        // cert_mediumOfInstruction: false,
        // cert_honorableDismissal: false,
        // certificationNotes: "",
        selectedDocuments: []
      });
      
      const documents = [
        { id: "tor_generalPurpose", name: "TOR (General Purpose)" },
        { id: "tor_boardExam", name: "TOR (Board Exam)" },
        { id: "tor_transfer", name: "TOR (Transfer)" },
        { id: "diploma", name: "Diploma" },
        { id: "cert_enrollment", name: "Certificate of Enrollment" },
        { id: "cert_graduation", name: "Certificate of Graduation" }
    ];
      

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(documents);
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

    const generateReferenceNumber = () => {
        const timestamp = Date.now().toString().slice(-6);
        const randomPart = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();
        return `REF${timestamp}SDRS${randomPart}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        const refNumber = generateReferenceNumber();
    
        setFormData((prev) => ({
            ...prev,
            referenceNumber: refNumber,
            selectedDocuments: prev.selectedDocuments || [] // Ensure it's an array
        }));
    
        setRequest((prev) => !prev);
    };
    

    useEffect(() => {
        fetchDocumentFees()
            .then((data) => {
                const fees = {};
                data.forEach((doc) => {
                    fees[doc.name] = doc.fee;
                });
                setDocumentFees(fees);
            })
            .catch((error) => console.error(error.message));
    }, []);

    const handleDocumentChange = (event) => {
        const selectedDoc = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            sampleDocument: selectedDoc,
            documentFee: documentFees[selectedDoc] || 0,
        }));
    };


    // Handle checkbox selection
    const handleCheckboxChange = (docID) => {
        setFormData((prev) => ({
            ...prev,
            selectedDocuments: prev.selectedDocuments.includes(docID)
                ? prev.selectedDocuments.filter(id => id !== docID) // Remove if already checked
                : [...prev.selectedDocuments, docID] // Add if newly checked
        }));
    };
      

    useEffect(() => {
        if (sendRequest) {
            setLoading(false);
            navigate("/confirm-request", { state: formData });
        }
    }, [sendRequest]);

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

    const handleTrackerRequest = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const data = await fetchTrackerRequest(formData.referenceNumber);
    
            setTimeout(() => {
                setLoading(false);
                navigate("/tracker-request", { state: data });
            }, 1500);
        } catch (error) {
            setLoading(false);
            alert(error.message);
        }
    };

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

            <div className="d-flex justify-content-between py-2">
                <img
                    src={upangLogo}
                    className="px-5 my-auto"
                    alt=""
                    height={65}
                />
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
                            <Dropdown.Toggle as="div" className="px-5 my-auto">
                                <img
                                    src={userPhoto}
                                    alt="User Avatar"
                                    width={55}
                                    height={55}
                                    className="rounded-circle align-items-center justify-content-center my-auto"
                                    style={{
                                        objectFit: "cover",
                                        border: "2px solid #ddd",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                    }}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                )}
            </div>
            <div className="d-flex flex-column text-white text-center entry-header">
                <div className="mb-5">
                    <h1 className="location fw-bold">
                        PHINMA - University of Pangasinan <br />
                    </h1>
                    <p>Student Document Request System</p>
                </div>
            </div>

            <div className="tabs gap-3 d-flex align-items-center mt-5">
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
                            {isOpen ? "We're ready to serve you" : "CLOSED"}
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
                                    className="input track-reference"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            referenceNumber: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="4-digit PIN"
                                    className="input track-pin"
                                    // onChange={(e) =>
                                    //     setReferenceNumber(e.target.value)
                                    // }
                                />
                                <button
                                    className="track-button"
                                    onClick={handleTrackerRequest}
                                >
                                    Track
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* <Footer /> */}

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={() => setShowModal(false)}>
                        ✕
                    </button>
                    <h5 style={{ fontWeight: "bold", color: "white" }}>Fill out Form</h5>
                    <hr />
                    <div className="form-container">
                        {/* Personal Information Section */}
                        <div className="form-group border p-3">
                        <h3 style={{ marginBottom: "30px", fontWeight: "bold", color: "white" }}>
                            Personal Information
                        </h3>
                        <div className="form-row">
                            <div className="form-field">
                            <label htmlFor="student-id">Student ID</label>
                            <input
                                pattern="[0-9]*"
                                type="text"
                                maxLength={15}
                                id="studentNumber"
                                value={formData.studentNumber}
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
                            <label htmlFor="middle-name">Middle Name</label>
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
                                id="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                            />
                            </div>
                            <div className="form-field">
                            <label htmlFor="course">
                                Course <span>*</span>
                            </label>
                            <select id="course" value={formData.course} onChange={handleChange}>
                                <option value="">Select Course</option>
                                {courses.map((course, index) => (
                                <option key={index} value={course}>
                                    {course}
                                </option>
                                ))}
                            </select>
                            </div>
                            <div className="form-field">
                            <label htmlFor="year-graduated">Year Graduated</label>
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
                                <option value="">Select Province</option>
                                {provinces
                                .slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((province) => (
                                    <option key={province.id} value={province.name}>
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
                                <option value="">Select Municipality</option>
                                {municipalities.map((municipality) => (
                                <option key={municipality.id}>{municipality.name}</option>
                                ))}
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
                                <option value="">Select Barangay</option>
                                {barangays.map((barangay) => (
                                <option value={formData.barangay.name} key={barangay.id}>
                                    {barangay.name}
                                </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        </div>

                        {/* Request for Records*/}
                        <div className="row mt-3">
                        <Col>
    <div className="border p-3">
        <h3 className="text-white fw-bold text-start mb-3">Request for Records</h3>
        <div className="form-field">
            <h5 className="text-white text-start">Transcripts of Records</h5>
            {['tor_generalPurpose', 'tor_boardExam'].map((docID) => (
                <div className="form-check form-check-inline" key={docID}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={docID}
                        checked={formData.selectedDocuments.includes(docID)}
                        onChange={() => handleCheckboxChange(docID)}
                    />
                    <label className="form-check-label" htmlFor={docID}>
                        {`TOR (${docID === 'tor_generalPurpose' ? 'General Purpose' : 'Board Examination'})`}
                    </label>
                </div>
            ))}
            
            <h5 className="text-white text-start mt-3">OTR</h5>
            {['otr_generalPurpose', 'otr_boardExam'].map((docID) => (
                <div className="form-check form-check-inline" key={docID}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={docID}
                        checked={formData.selectedDocuments.includes(docID)}
                        onChange={() => handleCheckboxChange(docID)}
                    />
                    <label className="form-check-label" htmlFor={docID}>
                        {`OTR (${docID === 'otr_generalPurpose' ? 'General Purpose' : 'Board Examination'})`}
                    </label>
                </div>
            ))}

            <div className="form-check form-check-inline mt-2">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="certificate_transfer"
                    checked={formData.selectedDocuments.includes('certificate_transfer')}
                    onChange={() => handleCheckboxChange('certificate_transfer')}
                />
                <label className="form-check-label" htmlFor="certificate_transfer">
                    Certificate of Transfer (Honorable Dismissal)
                </label>
            </div>
        </div>
        <div className="form-field mt-3">
            <label htmlFor="recordNotes">Notes</label>
            <input
                type="text"
                id="recordNotes"
                name="recordNotes"
                value={formData.recordNotes || ''}
                onChange={handleChange}
                placeholder="Additional details if any"
                className="form-control"
            />
        </div>
    </div>
</Col>

{/* Request for Certification */}
<Col>
    <div className="border p-3">
        <h3 className="text-white fw-bold text-start mb-3">Request for Certification</h3>
        <div className="form-field">
            {['diploma', 'cert_enrollment', 'cert_graduation', 'cert_unitsEarned', 'cert_grades', 'cert_honor', 'cert_mediumOfInstruction', 'cert_honorableDismissal'].map((docID) => (
                <div className="form-check form-check-inline" key={docID}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={docID}
                        checked={formData.selectedDocuments.includes(docID)}
                        onChange={() => handleCheckboxChange(docID)}
                    />
                    <label className="form-check-label" htmlFor={docID}>
                        {docID.replace(/_/g, ' ').replace('cert ', 'Certification of ')}
                    </label>
                </div>
            ))}

            {formData.selectedDocuments.includes('diploma') && (
                <div className="ms-3">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="firstCopy"
                            checked={formData.selectedDocuments.includes('firstCopy')}
                            onChange={() => handleCheckboxChange('firstCopy')}
                        />
                        <label className="form-check-label" htmlFor="firstCopy">1st Copy</label>
                    </div>

                    {!formData.selectedDocuments.includes('firstCopy') && (
                        <div className="form-group mt-2">
                            <label htmlFor="nthCopy">Enter nth copy:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nthCopy"
                                name="nthCopy"
                                value={formData.nthCopy || ''}
                                onChange={handleChange}
                                placeholder="Enter which nth copy you're requesting"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
        <div className="form-field mt-3">
            <label htmlFor="certificationNotes">Notes</label>
            <input
                type="text"
                id="certificationNotes"
                name="certificationNotes"
                value={formData.certificationNotes || ''}
                onChange={handleChange}
                placeholder="Additional details if any"
                className="form-control"
            />
        </div>
    </div>
</Col>
                        </div>

                        <button className="submit-button" onClick={handleSubmit}>
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
