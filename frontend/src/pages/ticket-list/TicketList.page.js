import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchForm from "../../components/search-form/SearchForm.comp";
import TicketTable from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummyData.json";
import Sidebar from "../../layouts/partials/Sidebar.comp";

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
        <Sidebar>
            <Container>
                <Row className="mt-4">
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
        </Sidebar>
    );
};

export default TicketListScreen;
