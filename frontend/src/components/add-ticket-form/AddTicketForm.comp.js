import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddTicketForm = ({
    handleOnSubmit,
    handleOnChange,
    formData,
    formDataError,
}) => {
    console.log(formData);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div
                        className="shadow p-4 rounded"
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #ddd",
                        }}
                    >
                        <h3
                            className="text-center mb-4"
                            style={{
                                fontWeight: "600",
                                color: "#333",
                                fontSize: "17px",
                            }}
                        >
                            Create a Ticket
                        </h3>
                        <Form autoComplete="off" onSubmit={handleOnSubmit}>
                            <Form.Group className="mb-4" as={Row}>
                                <Form.Label
                                    column
                                    sm={2}
                                    className="fw-bold"
                                    style={{ color: "#555" }}
                                >
                                    Subject
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        name="subject"
                                        placeholder="Enter the subject"
                                        value={formData.subject}
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <Form.Text className="text-danger">
                                        {formDataError.subject &&
                                            "Subject is required!"}
                                    </Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-4" as={Row}>
                                <Form.Label
                                    column
                                    sm={2}
                                    className="fw-bold"
                                    style={{ color: "#555" }}
                                >
                                    Date
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="date"
                                        value={formData.issueDate}
                                        name="issueDate"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label
                                    column
                                    sm={2}
                                    className="fw-bold"
                                    style={{ color: "#555" }}
                                >
                                    Details
                                </Form.Label>
                                <Col>
                                    <Form.Control
                                        as="textarea"
                                        name="detail"
                                        value={formData.detail}
                                        rows={5}
                                        placeholder="Provide detailed information"
                                        onChange={handleOnChange}
                                        required
                                    />
                                </Col>
                            </Form.Group>
                            <Button
                                variant="success"
                                type="submit"
                                className="w-100"
                                style={{
                                    fontSize: "10px",
                                    padding: "10px 10px",
                                }}
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

AddTicketForm.propTypes = {
    handleOnSubmit: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    formData: PropTypes.object.isRequired,
    formDataError: PropTypes.object.isRequired,
};

export default AddTicketForm;
