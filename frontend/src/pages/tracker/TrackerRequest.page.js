import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./TrackerRequest.style.css";

const TrackerRequest = () => {
    const location = useLocation();
    const requestData = location.state || {};

    const steps = ["Request Sent", "Processing", "Pick-Up"];
    const currentStep = 2;

    return (
        <Container className="tracker-container">
            <Row className="align-items-center">
                <Col md={8} className="timeline-section">
                    <div className="timeline">
                        {steps.map((step, index) => (
                            <div key={index} className="timeline-step">
                                <div
                                    className={`circle ${
                                        index < currentStep ? "completed" : ""
                                    }`}
                                >
                                    <span className="step-label">{step}</span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`connector ${
                                            index < currentStep - 1
                                                ? "completed"
                                                : ""
                                        }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </Col>

                <Col md={4} className="info-section">
                    <h4 className="info-title">Request Information</h4>
                    <p>
                        <strong>Reference Number:</strong>{" "}
                        {requestData.referenceNumber}
                    </p>
                    <p>
                        <strong>First Name:</strong> {requestData.firstName}
                    </p>
                    <p>
                        <strong>Course:</strong> {requestData.course}
                    </p>
                    <p>
                        <strong>Email:</strong> {requestData.email}
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default TrackerRequest;
