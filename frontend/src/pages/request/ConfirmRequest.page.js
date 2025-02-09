import { useLocation, useNavigate } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import "./ConfirmRequest.style.css";

const ConfirmRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state || {};

    console.log("Received Form Data:", formData);

    const handleCancel = () => {
        navigate("/");
    };

    const handleSubmit = () => {
        alert("Request submitted successfully!");
    };

    return (
        <div style={{ color: "white", padding: "20px" }}>
            <p className="header-text">
                Please make sure you have provided correct information and
                choose how many copies each document you'd like to have. <br />
                <span className="note-bold">Note: </span>
                <span className="note-text">
                    Once you submit, you won't be able to edit your request.
                </span>
            </p>
            <hr />
            <Container>
                <Row>
                    <Col md={6}>
                        <div className="info-box">
                            <h4>Personal Information</h4>
                            <div className="info-item">
                                <strong>Reference Number</strong>
                            </div>
                            <div className="info-item">
                                <strong>Name</strong>
                                <span>
                                    {formData.firstName} {formData.middleName}{" "}
                                    {formData.lastName}
                                </span>
                            </div>
                            <div className="info-item">
                                <strong>Email</strong>
                                <span>{formData.email}</span>
                            </div>
                            <div className="info-item">
                                <strong>Student Number</strong>
                                <span>{formData.studentId}</span>
                            </div>
                            <div className="info-item">
                                <strong>Contact Number</strong>
                                <span>{formData.contactNumber}</span>
                            </div>
                            <div className="info-item">
                                <strong>Course</strong>
                                <span>{formData.course}</span>
                            </div>
                            <div className="info-item">
                                <strong>Year Graduated</strong>
                                <span>{formData.yearGraduated || "N/A"}</span>
                            </div>
                            <div className="info-item">
                                <strong>Location</strong>
                                <span>
                                    {formData.barangay}, {formData.municipality}
                                    , {formData.province}
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="info-box">
                            <h4>Requested Documents</h4>
                            <div className="info-item">
                                <strong>Sample Document</strong>
                                <span>{"N/A"}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="button-container">
                    <Button variant="light" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className="submit-request" onClick={handleSubmit}>
                        Submit Request
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default ConfirmRequest;
