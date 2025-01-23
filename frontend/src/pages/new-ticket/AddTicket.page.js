import React, { useEffect, useState } from "react";

import TicketForm from "../../components/add-ticket-form/AddTicketForm.comp";
import { Container, Row, Col, Form } from "react-bootstrap";
import { shortText } from "../../utils/validation";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";

const initialFormData = {
    subject: "",
    issueDate: "",
    detail: "",
};

const initialFormError = {
    subject: false,
    issueDate: false,
    detail: false,
};

const AddTicket = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formDataError, setFormDataError] = useState(initialFormError);
    useEffect(() => {}, [formData, formDataError]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setFormDataError(initialFormError);

        const isSubjectValid = await shortText(formData.subject);

        setFormDataError({
            ...initialFormError,
            subject: !isSubjectValid,
        });

        console.log("Form Submit Request Received", formData);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Add New Ticket" />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TicketForm
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                        formData={formData}
                        formDataError={formDataError}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default AddTicket;
