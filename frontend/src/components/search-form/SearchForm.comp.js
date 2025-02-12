import React from "react";
import PropTypes from "prop-types";
import { Form, Row, Col } from "react-bootstrap";

const SearchForm = ({ handleOnChange, str }) => {
    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column ms={2}>
                        <Col ms={10}>
                            <Form.Control
                                onChange={handleOnChange}
                                value={str}
                                name="searchStr"
                                placeholder="Search"
                            />
                        </Col>
                    </Form.Label>
                </Form.Group>
            </Form>
        </div>
    );
};

SearchForm.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    str: PropTypes.string.isRequired,
};

export default SearchForm;
