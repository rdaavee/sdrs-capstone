import React, { useState, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const AddTicketForm = ({
    handleOnSubmit,
    handleOnChange,
    formData,
    formDataError,
}) => {
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);

    // Function to handle formatting
    const handleFormat = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    // Function to handle description change
    const handleDescriptionChange = (e) => {
        const descriptionContent = e.target.innerHTML;
        setDescription(descriptionContent);
        handleOnChange({
            target: {
                name: "description",
                value: descriptionContent,
            },
        });
    };

    // Function to handle file upload
    const handleFileUpload = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    };

    // Function to trigger file input
    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <Container className="mt-5">
            <Col>
                <h3
                    className="mb-5"
                    style={{
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "35px",
                    }}
                >
                    Fill up the form
                    {/* <br />
                    <span style={{ fontWeight: "100", fontSize: "15px" }}>
                        Fill up the form
                    </span> */}
                </h3>
            </Col>

            <Row className="justify-content-start">
                <Col md={11} lg={12}>
                    <div
                        className="shadow p-4 rounded"
                        style={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #ddd",
                        }}
                    >
                        <Form autoComplete="off" onSubmit={handleOnSubmit}>
                            {/* First Row: Requester and Area of Concern */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Requester{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            name="requester"
                                            value={formData.requester}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <Form.Text className="text-danger">
                                            {formDataError.requester &&
                                                "Requester is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Area of Concern{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            name="areaOfConcern"
                                            value={formData.areaOfConcern}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <Form.Text className="text-danger">
                                            {formDataError.areaOfConcern &&
                                                "Area of concern is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Second Row: Contact Number and Student Number */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Contact Number{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            name="contactNumber"
                                            value={formData.contactNumber}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <Form.Text className="text-danger">
                                            {formDataError.contactNumber &&
                                                "Contact number is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Student Number{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            name="studentNumber"
                                            value={formData.studentNumber}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <Form.Text className="text-danger">
                                            {formDataError.studentNumber &&
                                                "Student number is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Third Row: Program / Course */}
                            <Row className="mb-4">
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Program / Course{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Control
                                            name="programCourse"
                                            value={formData.programCourse}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <Form.Text className="text-danger">
                                            {formDataError.programCourse &&
                                                "Program / Course is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Fourth Row: Description */}
                            <Row className="mb-4">
                                <Col>
                                    <Form.Group>
                                        <Form.Label
                                            className="fw-bold"
                                            style={{ color: "#555" }}
                                        >
                                            Description{" "}
                                            <span style={{ color: "red" }}>
                                                *
                                            </span>
                                        </Form.Label>
                                        <div
                                            style={{
                                                border: "1px solid #ced4da",
                                                borderRadius: "4px",
                                                padding: "6px 12px",
                                                minHeight: "100px",
                                                backgroundColor: "#fff",
                                            }}
                                            contentEditable
                                            onInput={handleDescriptionChange}
                                            dangerouslySetInnerHTML={{
                                                __html: description,
                                            }}
                                        ></div>
                                        <div className="mt-2 d-flex align-items-center">
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    handleFormat("bold")
                                                }
                                                style={{ marginRight: "5px" }}
                                            >
                                                <strong>B</strong>
                                            </Button>
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    handleFormat("italic")
                                                }
                                                style={{ marginRight: "5px" }}
                                            >
                                                <em>I</em>
                                            </Button>
                                            <Button
                                                variant="light"
                                                onClick={() =>
                                                    handleFormat("underline")
                                                }
                                                style={{ marginRight: "5px" }}
                                            >
                                                <u>U</u>
                                            </Button>
                                            <Button
                                                variant="light"
                                                onClick={triggerFileInput}
                                                style={{ marginRight: "5px" }}
                                            >
                                                📎 Attach Files
                                            </Button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: "none" }}
                                                onChange={handleFileUpload}
                                                multiple
                                            />
                                        </div>
                                        {files.length > 0 && (
                                            <div className="mt-2">
                                                <strong>Attached Files:</strong>
                                                <ul>
                                                    {files.map(
                                                        (file, index) => (
                                                            <li key={index}>
                                                                {file.name}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                        <Form.Text className="text-danger">
                                            {formDataError.description &&
                                                "Description is required!"}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Submit Button */}
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

export default AddTicketForm;
