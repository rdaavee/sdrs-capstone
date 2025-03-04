import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
import { loginUser } from "../../services/api";

import logoImg from "../../assets/images/phinma-cservice-logo.png";
import studentImg from "../../assets/images/login-img.svg";
import { FcGoogle } from "react-icons/fc";

import "./Login.style.css";
import "../../assets/fonts/fonts.css";

const LoginForm = ({ handleOnFormChange }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
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
            const result = await loginUser(formData);

            console.log("Login result:", result);

            console.log(formData);

            localStorage.setItem("token", result.token);
            localStorage.setItem("email", formData.email);
            localStorage.setItem("register", "formData");

            console.log(result.token);
            setShowToast(true);

            const decodedToken = jwtDecode(String(result.token));
            console.log("Decoded token:", decodedToken);

            setTimeout(() => {
                switch (decodedToken.role) {
                    case "super-admin":
                        navigate("/admin-dashboard");
                        break;
                    case "middle-admin":
                        navigate("/middle-admin-dashboard");
                        break;
                    case "staff-admin":
                        navigate("/staff-admin");
                        break;
                    case "user":
                        navigate("/");
                        break;
                    default:
                        navigate("/login");
                        break;
                }
            }, 1500);
        } catch (error) {
            setError(error.message);
            setShowErrorToast(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLogoClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/");
        }, 1500);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/register");
        }, 1000);
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            setError("Google Sign-In failed.");
            setShowErrorToast(true);
        }
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
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={2000}
                    autohide
                >
                    <Toast.Header>
                        <strong className="me-auto">UPang Toast</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Login Successful!
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
                        {error || "Invalid credentials. Please try again."}
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
                                cursor: "pointer",
                            }}
                            onClick={handleLogoClick}
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
                            Login to the helpdesk
                        </h4>
                        <p style={{ color: "#ffffff" }}>
                            Enter the details below
                        </p>
                        <Form autoComplete="off" onSubmit={handleSubmit}>
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
                            <Form.Group
                                className="d-flex justify-content-between align-items-center mb-3"
                                style={{ color: "#fff" }}
                            >
                                <Form.Check
                                    type="checkbox"
                                    label="Remember me"
                                />
                                <a
                                    href="!#"
                                    onClick={() => handleOnFormChange("reset")}
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                    }}
                                >
                                    Forgot Password?
                                </a>
                            </Form.Group>
                            <Button
                                className="sign-in-btn"
                                type="submit"
                                disabled={loading}
                            >
                                Sign in
                            </Button>
                            <p
                                style={{
                                    color: "white",
                                    fontSize: "17px",
                                    marginTop: "15px",
                                    textAlign: "center",
                                }}
                            >
                                OR
                            </p>
                            <Button
                                className="sign-in-btn-google"
                                type="button"
                                onClick={handleGoogleLogin}
                            >
                                <FcGoogle size={25} /> Sign in with Google
                            </Button>
                            <div className="mt-3">
                                <p style={{ color: "#fff" }}>
                                    Don’t have an account?{" "}
                                    <a
                                        href="/register"
                                        onClick={handleRegisterClick}
                                        style={{
                                            color: "#FFD000",
                                            textDecoration: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Register
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

LoginForm.propTypes = {
    handleOnFormChange: PropTypes.func.isRequired,
};

export default LoginForm;
