import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const ForgotPasswordForm = ({
    handleOnChange,
    handleOnSubmit,
    handleOnFormChange,
    email,
}) => {
    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <div className="login-form p-4 rounded shadow">
                        <h1 className="text-center mb-4">Reset Password</h1>
                        <hr />
                        <Form autoComplete="off" onSubmit={handleOnSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleOnChange}
                                    value={email}
                                    required
                                />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleOnChange}
                                    value={password}
                                    required
                                />
                            </Form.Group> */}
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-100"
                            >
                                Submit
                            </Button>
                            <hr />
                            <div className="text-center mt-3">
                                <a
                                    href="#!"
                                    onClick={() => handleOnFormChange("login")}
                                    className="text-decoration-none"
                                >
                                    Login here
                                </a>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

ForgotPasswordForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    handleOnFormChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
};

export default ForgotPasswordForm;
