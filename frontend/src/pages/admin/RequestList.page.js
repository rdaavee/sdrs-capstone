import { useEffect, useState } from "react";
import Sidebar from "../../layouts/partials/Sidebar.comp";
import "./AdminDashboard.style.css";
import { documents } from "../../constants/documents";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const socket = io("http://localhost:5000");

const RequestList = () => {
    const [requests, setRequests] = useState([]);
    const [requestCount, setRequestCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const [updating, setUpdating] = useState(false);

    const fetchRequests = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/request/requests"
            );
            const data = await response.json();
            setRequests(data);
            setRequestCount(data.length);
        } catch (error) {
            console.error("Error fetching requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
        socket.on("updateRequests", (newRequests) => {
            setRequests(newRequests);
        });
        return () => {
            socket.off("updateRequests");
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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!response.ok) throw new Error("Failed to update status");

            const data = await response.json();
            socket.emit("requestUpdated", data.request);

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? data.request : request
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this request?"))
            return;

        try {
            const response = await fetch(
                `http://localhost:5000/request/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) throw new Error("Failed to delete request");

            setRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== id)
            );

            toast.success("Request deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.error("Error deleting request:", error);
            toast.error("Failed to delete request. Try again!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const highlightMatch = (text) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, "gi");
        return text.replace(regex, '<span class="highlight">$1</span>');
    };

    const filteredRequests = requests.filter((request) => {
        const search = searchTerm.toLowerCase();
        return (
            request.referenceNumber?.toLowerCase().includes(search) ||
            request.firstName?.toLowerCase().includes(search) ||
            request.middleName?.toLowerCase().includes(search) ||
            request.lastName?.toLowerCase().includes(search) ||
            request.studentNumber?.toLowerCase().includes(search) ||
            request.email?.toLowerCase().includes(search) ||
            request.mobileNumber?.toLowerCase().includes(search) ||
            request.selectedDocuments
                .map((docId) => {
                    const doc = documents.find((d) => d.id === docId);
                    return doc ? doc.name.toLowerCase() : "";
                })
                .some((docName) => docName.includes(search))
        );
    });

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
            <ToastContainer />
            <div className="p-6">
                <h5 className="fw-bold">What are you looking for?</h5>
                <input
                    type="text"
                    placeholder="Search here..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3 mt-2 p-2"
                />

                {loading ? (
                    <p>Loading requests...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-4 text-left font-semibold">
                                        Reference No.
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
                                    <th className="p-4 text-left font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentRequests.map((request) => (
                                    <tr key={request._id} className="border-b">
                                        <td
                                            className="p-4"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightMatch(
                                                    request.referenceNumber
                                                ),
                                            }}
                                        />
                                        <td
                                            className="p-4"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightMatch(
                                                    `${request.firstName} ${request.middleName} ${request.lastName}<br />${request.studentNumber}`
                                                ),
                                            }}
                                        />
                                        <td
                                            className="p-4"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightMatch(
                                                    request.selectedDocuments
                                                        .map((docId) => {
                                                            const doc =
                                                                documents.find(
                                                                    (d) =>
                                                                        d.id ===
                                                                        docId
                                                                );
                                                            return doc
                                                                ? doc.name
                                                                : "";
                                                        })
                                                        .filter(Boolean)
                                                        .join(", ")
                                                ),
                                            }}
                                        />
                                        <td
                                            className="p-4 contact"
                                            dangerouslySetInnerHTML={{
                                                __html: highlightMatch(
                                                    `${request.email}<br />${request.mobileNumber}`
                                                ),
                                            }}
                                        />
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

                                        <td className="action-cell">
                                            <i
                                                onClick={() =>
                                                    handleDelete(request._id)
                                                }
                                                class="fa-solid fa-trash"
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

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

export default RequestList;
