import { useLocation } from "react-router-dom";
import {
    Col,
    Container,
    Row,
    Button,
    ToastContainer,
    Toast,
} from "react-bootstrap";
import "./ConfirmRequest.style.css";
import useSubmitRequest from "../../hooks/useSubmitRequest";
import { documents } from "../../constants/documents";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const ConfirmRequest = () => {
    const location = useLocation();
    const { ...formData } = location.state || {};

    const {
        handleSubmit,
        handleCancel,
        loading,
        error,
        showToast,
        showErrorToast,
        setShowToast,
        setShowErrorToast,
    } = useSubmitRequest(formData);

    // const handlePayment = async () => {
    //     const stripe = await loadStripe(
    //         "pk_test_51Qx2dgH6UOtWuvhFmqWmPwEh2SxteVBMSX6G8mVGc6s1eGFvnGCDI7K9rrKeeOG1QaNYmI48OKVPP0jEQVJvVhNE00kcwzxkCn"
    //     );

    //     const body = {
    //         amount: Math.round(
    //             formData.selectedDocuments
    //                 .map((docId) => {
    //                     const doc = documents.find((d) => d.id === docId);
    //                     return doc ? doc.fee : 0;
    //                 })
    //                 .reduce((total, fee) => total + fee, 0) * 100
    //         ),
    //         formData: formData,
    //     };

    //     const headers = { "Content-Type": "application/json" };

    //     try {
    //         const response = await fetch(
    //             "http://localhost:5000/payments/create-checkout-session",
    //             {
    //                 method: "POST",
    //                 headers: headers,
    //                 body: JSON.stringify(body),
    //             }
    //         );

    //         const session = await response.json();

    //         const result = await stripe.redirectToCheckout({
    //             sessionId: session.id,
    //         });

    //         if (result.error) {
    //             console.error("Payment error:", result.error.message);
    //             setShowErrorToast(true);
    //         } else {
    //             setShowToast(true);
    //         }
    //     } catch (error) {
    //         console.error("Payment request failed:", error);
    //         setShowErrorToast(true);
    //     }
    // };

    useEffect(() => {
        console.log("Received formData in ConfirmRequest:", formData);
    }, [formData]);

    return (
        <div style={{ padding: "20px" }}>
            <p className="header-text">
                Please make sure you have provided correct information and
                choose how many copies each document you'd like to have. <br />
                <span className="note-bold">Note: </span>
                <span className="note-text">
                    Once you submit, you won't be able to edit your request.
                </span>
            </p>
            <hr />

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg="success"
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={2000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">UPang Toast</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Request Submitted Successfully
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg="danger"
                    show={showErrorToast}
                    onClose={() => setShowErrorToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        {error || "Invalid Format"}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <Container>
                <Row>
                    <Col md={6}>
                        <div className="info-box">
                            <h4>Personal Information</h4>
                            <div className="info-item">
                                <strong>Reference Number</strong>
                                <span>{formData.referenceNumber}</span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Name</strong>
                                <span>
                                    {formData.firstName} {formData.middleName}{" "}
                                    {formData.lastName}
                                </span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Email</strong>
                                <span>{formData.email}</span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Student Number</strong>
                                <span>{formData.studentNumber}</span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Contact Number</strong>
                                <span>{formData.mobileNumber}</span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Course</strong>
                                <span>{formData.course}</span>
                            </div>
                            <hr />
                            <div className="info-item">
                                <strong>Location</strong>
                                <span>
                                    {formData.barangay}, {formData.municipality}
                                    , {formData.province}
                                </span>
                            </div>
                            <hr />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="info-box">
                            <h4>Requested Documents</h4>
                            <div className="info-item">
                                <strong>Document</strong>
                                <span>
                                    {formData.selectedDocuments
                                        .map((docId) => {
                                            const doc = documents.find(
                                                (d) => d.id === docId
                                            );
                                            return doc ? doc.name : "";
                                        })
                                        .filter(Boolean)
                                        .join(", ")}
                                </span>
                            </div>
                            <hr />

                            <div className="info-item">
                                <strong>Fee</strong>
                                <span>
                                    ₱
                                    {formData.selectedDocuments
                                        .map((docId) => {
                                            const doc = documents.find(
                                                (d) => d.id === docId
                                            );
                                            return doc ? doc.fee : 0;
                                        })
                                        .reduce((total, fee) => total + fee, 0)
                                        .toFixed(2)}
                                </span>
                            </div>
                            <hr />
                        </div>
                    </Col>
                </Row>
                <div className="button-container">
                    <Button variant="light" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        className="submit-request"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Request"}
                    </Button>
                    {/* <Button
                        className="submit-request"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Pay Now"}
                    </Button> */}
                </div>
            </Container>
        </div>
    );
};

export default ConfirmRequest;
