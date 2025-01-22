import React from "react";
import "../../App.css";
import { Col, Container, Row, Button } from "react-bootstrap";

import tickets from "../../assets/data/dummyData.json";
import BreadcrumbComponent from "../../components/BreadcrumbComponent";
import TicketComponent from "../../features/ticket/components/TicketComponent";

const Dashboard = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <BreadcrumbComponent page="Dashboard" />
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
                    <Button
                        variant="secondary"
                        style={{ fontSize: "11px", padding: "5px 15px" }}
                    >
                        Create New Ticket
                    </Button>
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
                    <TicketComponent tickets={tickets} />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
