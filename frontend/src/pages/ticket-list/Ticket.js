import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";
import tickets from "../../assets/data/dummyData.json";
import MessageHistory from "../../components/message-history/MessageHistory.comp";
import UpdateTicket from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import { array } from "prop-types";

const ticket = tickets[0]; //getting 1 static data

const Ticket = () => {
    const { tId } = useParams();
    const [message, setMessage] = useState("");
    const [ticket, setTicket] = useState("");

    useEffect(() => {
        for (let i = 0; i < tickets.length; i++) {
            if (tickets[i].id == tId) {
                setTicket(tickets[i]);
                continue;
            }
        }
    }, [message, tId]);

    const handleOnChange = (e) => {
        setMessage(e.target.value);
    };

    const handleOnSubmit = (e) => {
        alert("message sent");
    };

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket" />
                </Col>
            </Row>
            <Row>
                <Col className="fw-bold text-secondary">
                    <div className="subject">Subject: {ticket.subject}</div>
                    <div className="date">Date: {ticket.addedAt}</div>
                    <div className="status">Status: {ticket.status}</div>
                </Col>
                <Col className="text-end">
                    <Button variant="outline-secondary">Close</Button>
                </Col>
            </Row>
            <hr />
            <Row className="mt-5 mb-5">
                <Col>
                    <MessageHistory message={ticket.history} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <UpdateTicket
                        message={message}
                        handleOnChange={handleOnChange}
                        handleOnSubmit={handleOnSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Ticket;
