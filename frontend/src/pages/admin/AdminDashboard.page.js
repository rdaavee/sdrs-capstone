import { useEffect, useState } from "react";
import Sidebar from "../../layouts/partials/Sidebar.comp";
import "./AdminDashboard.style.css";
import { io } from "socket.io-client";
import sliderImage1 from "../../assets/images/dashboard-slider-img1.svg";
import sliderImage2 from "../../assets/images/dashboard-slider-img2.svg";
import sliderImage3 from "../../assets/images/dashboard-slider-img3.svg";

const socket = io("http://localhost:5000");

const Dashboard = () => {
    const [requestsCount, setRequestsCount] = useState(0);

    const [sentRequestsCount, setSentRequestsCount] = useState(0);
    const [processingRequestsCount, setProcessingRequestsCount] = useState(0);
    const [pickUpRequestsCount, setPickUpRequestsCount] = useState(0);
    const [completedRequestsCount, setCompletedRequestsCount] = useState(0);

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderImages = [sliderImage1, sliderImage2, sliderImage3];
    const autoSlideInterval = 1500;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % sliderImages.length
            );
        }, autoSlideInterval);
        return () => clearInterval(interval);
    }, [sliderImages.length]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/request/requests"
                );
                const data = await response.json();
                if (Array.isArray(data)) {
                    setRequests(data);
                    setRequestsCount(data.length);
                    updateRequestCounts(data);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const updateRequestCounts = (requests) => {
        setSentRequestsCount(
            requests.filter((req) => req.status === "Request Sent").length
        );
        setProcessingRequestsCount(
            requests.filter((req) => req.status === "Processing").length
        );
        setPickUpRequestsCount(
            requests.filter((req) => req.status === "Pick Up").length
        );
        setCompletedRequestsCount(
            requests.filter((req) => req.status === "Completed").length
        );
    };

    useEffect(() => {
        const handleUpdateRequestCount = (count) => setRequestsCount(count);

        const handleRequestCreated = (newRequest) => {
            setRequests((prevRequests) => {
                const updatedRequests = [...prevRequests, newRequest];
                updateRequestCounts(updatedRequests);
                return updatedRequests;
            });
        };

        const handleRequestUpdated = (updatedRequest) => {
            setRequests((prevRequests) => {
                const updatedRequests = prevRequests.map((req) =>
                    req.id === updatedRequest.id ? updatedRequest : req
                );
                updateRequestCounts(updatedRequests);
                return updatedRequests;
            });
        };

        const handleUpdateRequests = (updatedRequests) => {
            setRequests(updatedRequests);
            setRequestsCount(updatedRequests.length);
            updateRequestCounts(updatedRequests);
        };

        const handleRequestDeleted = ({ id }) => {
            setRequests((prevRequests) => {
                const updatedRequests = prevRequests.filter(
                    (req) => req.id !== id
                );
                updateRequestCounts(updatedRequests);
                return updatedRequests;
            });
            setRequestsCount((prev) => Math.max(prev - 1, 0));
        };

        socket.on("updateRequestCount", handleUpdateRequestCount);
        socket.on("requestCreated", handleRequestCreated);
        socket.on("requestUpdated", handleRequestUpdated);
        socket.on("requestDeleted", handleRequestDeleted);
        socket.on("updateRequests", handleUpdateRequests);

        return () => {
            socket.off("updateRequestCount", handleUpdateRequestCount);
            socket.off("requestCreated", handleRequestCreated);
            socket.off("requestUpdated", handleRequestUpdated);
            socket.off("requestDeleted", handleRequestDeleted);
            socket.off("updateRequests", handleUpdateRequests);
        };
    }, []);

    return (
        <Sidebar>
            <div className="image-slider-container">
                <div className="image-slider">
                    <div className="slider-text">
                        <h2
                            style={{
                                fontFamily: "Trebuchet MS, sans-serif",
                                fontSize: "50px",
                            }}
                        >
                            UPang Admin Dashboard
                        </h2>
                    </div>
                    <img
                        src={sliderImages[currentSlide]}
                        alt={`Slide ${currentSlide + 1}`}
                        className="slider-image"
                    />
                    <div className="slider-dots">
                        {sliderImages.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${
                                    currentSlide === index ? "active-dot" : ""
                                }`}
                                onClick={() => setCurrentSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row g-3 my-2">
                    <div className="col-md-3 p-1">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">
                                    {loading ? "Loading..." : requestsCount}
                                </h3>
                                <p className="fs-5">Requests</p>
                            </div>
                            <i className="bi bi-file-earmark-arrow-down p-3 fs-1"></i>
                        </div>
                    </div>
                    <div className="col-md-3 p-1">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">
                                    {loading
                                        ? "Loading..."
                                        : processingRequestsCount}
                                </h3>
                                <p className="fs-5">Processing</p>
                            </div>
                            <i className="bi bi-file-earmark-arrow-down p-3 fs-1"></i>
                        </div>
                    </div>
                    <div className="col-md-3 p-1">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">
                                    {loading
                                        ? "Loading..."
                                        : completedRequestsCount}
                                </h3>
                                <p className="fs-5">Completed</p>
                            </div>
                            <i className="bi bi-file-earmark-arrow-down p-3 fs-1"></i>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default Dashboard;
