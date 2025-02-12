import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPaperPlane, FaSpinner, FaBoxOpen } from "react-icons/fa";
import { io } from "socket.io-client";
import axios from "axios";
import "./TrackerRequest.style.css";

const socket = io("http://localhost:5000");

const TrackerRequest = () => {
    const location = useLocation();
    const requestData = location.state || {};
    const [status, setStatus] = useState(requestData.status || "Request Sent");

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

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/tracker/${requestData.referenceNumber}`
                );
                setStatus(response.data.status);
            } catch (error) {
                console.error("Error fetching status:", error);
            }
        };

        fetchStatus();

        socket.on("requestUpdated", (updatedRequest) => {
            if (
                updatedRequest.referenceNumber === requestData.referenceNumber
            ) {
                setStatus(updatedRequest.status);
            }
        });

        return () => {
            socket.off("requestUpdated");
        };
    }, [requestData.referenceNumber]);

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
                            <span>{requestData.sampleDocument}</span>
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
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default TrackerRequest;
