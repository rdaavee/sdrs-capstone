import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

const UpdateTicket = ({ message, handleOnChange, handleOnSubmit }) => {
    return (
        <Form onSubmit={handleOnSubmit}>
            <Form.Label className="text-secondary fw-light">
                Reply here
            </Form.Label>
            <Form.Control
                value={message}
                onChange={handleOnChange}
                name="detail"
                as="textarea"
                rows={5}
            />
            <div className="text-end mt-2 mb-5">
                <Button variant="success" type="submit">
                    Reply
                </Button>
            </div>
        </Form>
    );
};

UpdateTicket.propTypes = {
    message: PropTypes.string.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
};

export default UpdateTicket;
