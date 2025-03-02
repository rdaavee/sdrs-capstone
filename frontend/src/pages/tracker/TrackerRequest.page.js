import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPaperPlane, FaSpinner, FaBoxOpen } from "react-icons/fa";
import { io } from "socket.io-client";
import axios from "axios";
import "./TrackerRequest.style.css";
import { documents } from "../../constants/documents";
import { loadStripe } from "@stripe/stripe-js";

const socket = io("http://localhost:5000");

const TrackerRequest = () => {
    const location = useLocation();

    const storedReference = localStorage.getItem("referenceNumber");
    const storedSelectedDocuments = localStorage.getItem("selectedDocuments");
    const storedDate = localStorage.getItem("date");

    const requestData = location.state || {
        referenceNumber: storedReference || "",
        selectedDocuments: storedSelectedDocuments
            ? JSON.parse(storedSelectedDocuments)
            : [],
        date: storedDate || "",
    };

    const referenceNumber = requestData.referenceNumber;

    const selectedDocuments = requestData.selectedDocuments || [];

    const [status, setStatus] = useState(requestData.status || "Request Sent");

    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [isPaid, setIsPaid] = useState(false);

    const steps = [
        { label: "Request Sent", icon: <FaPaperPlane /> },
        { label: "Processing", icon: <FaSpinner /> },
        { label: "Pick Up", icon: <FaBoxOpen /> },
        { label: "Completed", icon: <FaBoxOpen /> },
    ];

    const statusSteps = {
        "Request Sent": 0,
        Processing: 1,
        "Pick Up": 2,
        Completed: 3,
    };

    const currentStep = statusSteps[status] || 0;

    const handlePayment = async () => {
        const stripe = await loadStripe(
            "pk_test_51Qx2dgH6UOtWuvhFmqWmPwEh2SxteVBMSX6G8mVGc6s1eGFvnGCDI7K9rrKeeOG1QaNYmI48OKVPP0jEQVJvVhNE00kcwzxkCn"
        );

        const amount =
            selectedDocuments
                .map((docId) => {
                    const doc = documents.find((d) => d.id === docId);
                    return doc ? doc.fee : 0;
                })
                .reduce((total, fee) => total + fee, 0) * 100;

        const body = {
            amount: Math.round(amount),
            formData: requestData,
        };

        const headers = { "Content-Type": "application/json" };

        try {
            const response = await fetch(
                "http://localhost:5000/payments/create-checkout-session",
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                }
            );

            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error("Payment error:", result.error.message);
                setShowErrorToast(true);
            } else {
                setShowToast(true);
            }
        } catch (error) {
            console.error("Payment request failed:", error);
            setShowErrorToast(true);
        }
    };

    //payment status if paid or unpaid
    useEffect(() => {
        if (!referenceNumber) return;

        const fetchPaymentStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/request/payments/status/${referenceNumber}`
                );
                setIsPaid(response.data.paid);
            } catch (error) {
                console.error("Error fetching payment status:", error);
            }
        };

        fetchPaymentStatus();

        const handlePaymentUpdate = (updatedPayment) => {
            if (updatedPayment.referenceNumber === referenceNumber) {
                setIsPaid(updatedPayment.paid);
            }
        };

        socket.on("paymentUpdated", handlePaymentUpdate);

        return () => {
            socket.off("paymentUpdated", handlePaymentUpdate);
        };
    }, [referenceNumber]);

    // request status
    useEffect(() => {
        if (!referenceNumber) return;

        const fetchStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/tracker/${referenceNumber}`
                );

                setStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        fetchStatus();

        const handleRequestUpdate = (updatedRequest) => {
            if (updatedRequest.referenceNumber === referenceNumber) {
                setStatus(updatedRequest.status);
            }
        };

        socket.on("requestUpdated", handleRequestUpdate);

        return () => {
            socket.off("requestUpdated", handleRequestUpdate);
        };
    }, [referenceNumber]);

    return (
        <Container className="tracker-container bg-light mt-5 mx-auto">
            <Row className="align-items-center">
                <Col md={8} className="timeline-section p-5">
                    <div className="timeline">
                        <div className="steps-container">
                            {steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="timeline-step text-center">
                                        <div
                                            className={`circle ${
                                                index <= currentStep
                                                    ? "completed"
                                                    : ""
                                            }`}
                                        >
                                            {step.icon}
                                        </div>
                                        <span className="step-label">
                                            {step.label}
                                        </span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </Col>

                <Col md={4} className="info-section p-5">
                    <h4 className="info-title mb-5">Request Information</h4>
                    <div className="info-details">
                        <p>
                            <strong>Reference Number</strong>
                            <span>{requestData.referenceNumber}</span>
                        </p>
                        <hr />
                        <p>
                            <strong>Requested Document</strong>
                            <span>
                                {selectedDocuments
                                    .map((docId) => {
                                        const doc = documents.find(
                                            (d) => d.id === docId
                                        );
                                        return doc ? doc.name : "";
                                    })
                                    .filter(Boolean)
                                    .join(", ")}
                            </span>
                        </p>
                        <hr />
                        <p>
                            <strong>Document Fee</strong>
                            <span>
                                {isPaid
                                    ? "Paid"
                                    : (requestData.selectedDocuments || [])
                                          .map((docId) => {
                                              const doc = documents.find(
                                                  (d) => d.id === docId
                                              );
                                              return doc ? doc.fee : 0;
                                          })
                                          .reduce(
                                              (total, fee) => total + fee,
                                              0
                                          )
                                          .toFixed(2)}
                            </span>
                        </p>

                        <hr />
                        <p>
                            <strong>Date Requested</strong>
                            <span>
                                {requestData.date
                                    ? requestData.date.split("T")[0]
                                    : "N/A"}
                            </span>
                        </p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button
                                className="submit-request"
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Pay Now"}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TrackerRequest;
