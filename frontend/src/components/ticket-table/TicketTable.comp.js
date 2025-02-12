import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
        case "open":
            return {
                backgroundColor: "#d4edda",
                color: "#155724",
                borderRadius: "50px",
                padding: "5px 10px",
                margin: "7px",
                display: "inline-block",
            };
        case "in progress":
            return {
                backgroundColor: "#fff3cd",
                color: "#856404",
                borderRadius: "50px",
                padding: "5px 10px",
                margin: "7px",
                display: "inline-block",
            };
        case "closed":
            return {
                backgroundColor: "#f8d7da",
                color: "#721c24",
                borderRadius: "50px",
                padding: "5px 10px",
                margin: "7px",
                display: "inline-block",
            };
        default:
            return {
                backgroundColor: "#d1ecf1",
                color: "#0c5460",
                borderRadius: "50px",
                padding: "5px 10px",
                margin: "7px",
                display: "inline-block",
            };
    }
};

const TicketTable = ({ tickets }) => {
    return (
        <Table bordered>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Course</th>
                    <th>Status</th>
                    <th>Issued Date</th>
                </tr>
            </thead>
            <tbody>
                {tickets.length ? (
                    tickets.map((row) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td>
                                <Link to={`/ticket/${row.id}`}>
                                    {row.subject}
                                </Link>
                            </td>
                            <td>{row.course}</td>
                            <td
                                className="status d-flex text-center"
                                style={getStatusStyle(row.status)}
                            >
                                {row.status}
                            </td>
                            <td>{row.addedAt}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            No Ticket Issued
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

TicketTable.propTypes = {
    tickets: PropTypes.array.isRequired,
};

export default TicketTable;
