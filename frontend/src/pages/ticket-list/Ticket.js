import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import tickets from "../../assets/data/dummyData.json";
import MessageHistory from "../../components/message-history/MessageHistory.comp";
import UpdateTicket from "../../components/update-ticket/UpdateTicket.comp";
import { useParams } from "react-router-dom";
import Sidebar from "../../layouts/partials/Sidebar.comp";

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
        <Sidebar>
            <Container>
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
        </Sidebar>
    );
};

export default Ticket;
