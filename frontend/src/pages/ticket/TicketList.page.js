import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import tickets from "../../assets/data/dummyData.json";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";

const TicketListScreen = () => {
    const [str, setStr] = useState("");
    const [displTickets, setDisplTickets] = useState();

    useEffect(() => {
        setDisplTickets(tickets);
    }, [str, displTickets]);

    const handleOnChange = (e) => {
        const { value } = e.target.value;
        setStr(value);
        searchTicket(value);
        console.log(e.target);
    };

    const searchTicket = (searchStr) => {
        const displayTickets = tickets.filter((row) =>
            row.subject.toLowerCase().includes(searchStr.toLowerCase())
        );
        setDisplTickets(displayTickets);
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
                    <Button variant="secondary">Add New Ticket</Button>
                </Col>
                <Col className="text-right">
                    <SearchForm handleOnChange={handleOnChange} str={str} />
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <TicketTable tickets={tickets} />
                </Col>
            </Row>
        </Container>
    );
};
export default TicketListScreen;
