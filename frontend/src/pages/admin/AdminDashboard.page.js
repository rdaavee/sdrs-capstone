import { useEffect, useState } from "react";
import Sidebar from "../../layouts/partials/Sidebar.comp";
import "./AdminDashboard.style.css";

import { io } from "socket.io-client";
const socket = io("http://localhost:5000");

const Dashboard = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const [updating, setUpdating] = useState(false);

    const fetchRequests = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/request/requests"
            );
            const data = await response.json();
            console.log("Requests:", data);
            setRequests(data);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();

        socket.on("requestUpdated", (updatedRequest) => {
            setRequests((prevRequests) =>
                prevRequests.map((req) =>
                    req.referenceNumber === updatedRequest.referenceNumber
                        ? updatedRequest
                        : req
                )
            );
        });

        return () => {
            socket.off("requestUpdated");
        };
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Processing":
                return "status-processing";
            case "Pick Up":
                return "status-ready";
            case "Completed":
                return "status-completed";
            default:
                return "";
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(
                `http://localhost:5000/request/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update status");
            }

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id
                        ? { ...request, status: newStatus }
                        : request
                )
            );

            console.log("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    // Handle search filtering
    const filteredRequests = requests.filter(
        (request) =>
            request.studentNumber
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.sampleDocument
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            request.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRequests = filteredRequests.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <Sidebar>
            <div className="p-6">
                <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded bg-white w-full text-black"
                />
                {loading ? (
                    <p>Loading requests...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-4 text-left font-semibold">
                                        Reference #
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Name
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Title
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Contact
                                    </th>
                                    <th className="p-4 text-left font-semibold">
                                        Status
                                    </th>
                                    {/* <th className="p-4 text-left font-semibold">
                                        Actions
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map((request) => (
                                    <tr key={request._id} className="border-b">
                                        <td className="p-4">
                                            {request.referenceNumber}
                                        </td>
                                        <td className="p-4">
                                            {request.firstName}{" "}
                                            {request.middleName}{" "}
                                            {request.lastName} <br />
                                            {request.studentNumber}
                                        </td>
                                        <td className="p-4">
                                            {request.sampleDocument}
                                        </td>
                                        <td className="p-4 contact">
                                            {request.email}
                                            <br />
                                            {request.mobileNumber}
                                        </td>
                                        <td>
                                            <div
                                                className={`status-chip ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                <select
                                                    value={request.status}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            request._id,
                                                            e.target.value
                                                        )
                                                    }
                                                    disabled={updating}
                                                >
                                                    <option value="Request Sent">
                                                        Request Sent
                                                    </option>
                                                    <option value="Processing">
                                                        Processing
                                                    </option>
                                                    <option value="Pick Up">
                                                        Pick Up
                                                    </option>
                                                    <option value="Completed">
                                                        Completed
                                                    </option>
                                                </select>
                                            </div>
                                        </td>

                                        {/* <td className="p-4">
                                            <button className="text-blue-500 hover:underline">
                                                Edit
                                            </button>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Controls */}
                        <div className="pagination-container">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`pagination-button ${
                                        currentPage === index + 1
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Sidebar>
    );
};

export default Dashboard;
