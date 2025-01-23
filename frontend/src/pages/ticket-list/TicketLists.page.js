import React from "react";
import "../../App.css";
import { Col, Container, Row, Button } from "react-bootstrap";
import PageBreadcrumb from "../../components/breadcrumb/Breadcrumb.comp";
import TicketTable from "../../components/ticket-table/TicketTable.comp";
import tickets from "../../assets/data/dummyData.json";
import { Link } from "react-router-dom";

const TicketLists = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket Lists" />
                </Col>
            </Row>
            <Row>
                <Col
                    className="text-center mt-5 mb-2"
                    style={{ fontSize: "11px" }}
                >
                    <div>Total Tickets: 3</div>
                    <div>Pending Tickets: 3</div>
                </Col>
                <Col className="text-center mt-5 mb-2">
                    <Link to="/add-ticket">
                        <Button
                            variant="secondary"
                            style={{ fontSize: "11px", padding: "5px 15px" }}
                        >
                            Create New Ticket
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col
                    className="mt-2"
                    style={{ fontSize: "13px", fontWeight: "bold" }}
                >
                    Recently Added Tickets
                </Col>
            </Row>
            <hr />
            <Row>
                <Col className="recent-tickets">
                    <TicketTable tickets={tickets} />
                </Col>
            </Row>
        </Container>
    );
};

export default TicketLists;
