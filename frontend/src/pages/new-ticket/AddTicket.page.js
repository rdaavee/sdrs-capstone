import React, { useState } from "react";
import TicketForm from "../../components/add-ticket-form/AddTicketForm.comp";
import { Container, Row, Col } from "react-bootstrap";
import { shortText } from "../../utils/validation";
import Sidebar from "../../layouts/partials/Sidebar.comp";

const initialFormData = {
    requester: "",
    contactNumber: "",
    programCourse: "",
    description: "",
    areaOfConcern: "",
    studentNumber: "",
};

const initialFormError = {
    requester: false,
    contactNumber: false,
    programCourse: false,
    description: false,
    areaOfConcern: false,
    studentNumber: false,
};

const AddTicket = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formDataError, setFormDataError] = useState(initialFormError);

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

        const isRequesterValid = await shortText(formData.requester);
        const isContactNumberValid = await shortText(formData.contactNumber);
        const isProgramCourseValid = await shortText(formData.programCourse);
        const isDescriptionValid = await shortText(formData.description);
        const isAreaOfConcernValid = await shortText(formData.areaOfConcern);
        const isStudentNumberValid = await shortText(formData.studentNumber);

        setFormDataError({
            ...initialFormError,
            requester: !isRequesterValid,
            contactNumber: !isContactNumberValid,
            programCourse: !isProgramCourseValid,
            description: !isDescriptionValid,
            areaOfConcern: !isAreaOfConcernValid,
            studentNumber: !isStudentNumberValid,
        });

        console.log("Form Submit Request Received", formData);
    };

    return (
        <Sidebar>
            <Container>
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
        </Sidebar>
    );
};

export default AddTicket;
