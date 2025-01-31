import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Toast,
    ToastContainer,
} from "react-bootstrap";
import logoImg from "../../assets/images/phinma-cservice-logo.png";
import studentImg from "../../assets/images/login-img.svg";
import "../../assets/fonts/fonts.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/user/register",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const result = await response.json();

            if (response.ok) {
                setShowSuccessToast(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                setError(result.message || "Registration failed");
                setShowErrorToast(true);
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            setShowErrorToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginNavigation = () => {
        setLoading(true);
        setTimeout(() => {
            navigate("/login");
        }, 5000);
    };

    return (
        <div style={{ position: "relative", minHeight: "100vh" }}>
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
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

            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg="success"
                    show={showSuccessToast}
                    onClose={() => setShowSuccessToast(false)}
                    delay={3000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">UPang Toast</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        You have successfully registered nigga
                    </Toast.Body>
                </Toast>

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
                        {error || "An error occurred, please try again."}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <div
                style={{
                    background: "linear-gradient(to right, #3A4F24, #E8E4E9)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 1,
                }}
            ></div>
            <div
                className="d-none d-md-block"
                style={{
                    backgroundImage: `url(${studentImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "60%",
                    height: "100%",
                    zIndex: 2,
                }}
            ></div>
            <Container style={{ position: "relative", zIndex: 3 }}>
                <Row
                    className="justify-content-start align-items-center"
                    style={{
                        minHeight: "100vh",
                        fontFamily: "TrebuchetMS, sans-serif",
                    }}
                >
                    <Col md={6} lg={5}>
                        <div
                            style={{
                                marginBottom: "50px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={logoImg}
                                alt="UPang Logo"
                                style={{ height: "90px" }}
                            />
                            <h2
                                style={{
                                    color: "#ffffff",
                                    marginLeft: "30px",
                                    marginTop: "15px",
                                    fontWeight: "semi-bold",
                                    letterSpacing: "3px",
                                }}
                            >
                                UPang Online Helpdesk
                            </h2>
                        </div>
                        <h4 style={{ color: "#FFD000", marginBottom: "20px" }}>
                            Register to have access
                        </h4>
                        <p style={{ color: "#ffffff" }}>
                            Enter the details below
                        </p>
                        <Form autoComplete="off" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    style={{
                                        borderRadius: "5px",
                                        padding: "10px 20px",
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    style={{
                                        borderRadius: "5px",
                                        padding: "10px 20px",
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    className="placeholder-text"
                                    style={{
                                        borderRadius: "5px",
                                        padding: "10px 20px",
                                    }}
                                    required
                                />
                            </Form.Group>

                            {error && (
                                <div
                                    style={{
                                        color: "red",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {error}
                                </div>
                            )}

                            <Button
                                variant="warning"
                                type="submit"
                                style={{
                                    backgroundColor: "#FFD000",
                                    width: "100%",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    fontWeight: "bold",
                                    color: "#ffffff",
                                }}
                                disabled={loading}
                            >
                                Submit
                            </Button>
                            <div className="mt-3">
                                <p style={{ color: "#fff" }}>
                                    Already have an account?{" "}
                                    <a
                                        href="/login"
                                        onClick={handleLoginNavigation}
                                        style={{
                                            color: "#FFD000",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Login
                                    </a>
                                </p>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RegistrationForm;
