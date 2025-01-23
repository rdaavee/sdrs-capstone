import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";
import SearchForm from "../../components/search-form/SearchForm.comp";
import TicketTable from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummyData.json";
import { Link } from "react-router-dom";

export const TicketListScreen = () => {
    const [str, setStr] = useState("");
    const [displTicket, setDispTicket] = useState(tickets);
    useEffect(() => {}, [str, displTicket]);
    const handleOnChange = (e) => {
        const { value } = e.target;
        setStr(value);
        searchTicket(value);
    };
    const searchTicket = (searchStr) => {
        const displayTickets = tickets.filter((row) =>
            row.subject.toLowerCase().includes(searchStr.toLowerCase())
        );
        setDispTicket(displayTickets);
    };
    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket Lists" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <Link to="/add-ticket">
                        <Button
                            variant="secondary"
                            style={{ fontSize: "11px", padding: "5px 15px" }}
                        >
                            Create New Ticket
                        </Button>
                    </Link>
                </Col>
                <Col className="text-right">
                    <SearchForm handleOnChange={handleOnChange} str={str} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <TicketTable tickets={displTicket} />
                </Col>
            </Row>
        </Container>
    );
};

export default TicketListScreen;
