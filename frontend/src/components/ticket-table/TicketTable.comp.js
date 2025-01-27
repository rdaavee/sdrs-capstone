import React from "react";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TicketTable = ({ tickets }) => {
    return (
        <Table striped bordered hover>
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
                            <td>{row.status}</td>
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
