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
                console.log("Requests:", data);

                if (Array.isArray(data)) {
                    setRequestsCount(data.length);
                } else if (data.count !== undefined) {
                    setRequestsCount(data.count);
                } else {
                    console.error("Unexpected response format:", data);
                }
            } catch (error) {
                console.error("Error fetching requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        socket.on("updateRequestCount", (count) => setRequestsCount(count));
        socket.on("requestCreated", (newRequest) =>
            console.log("New Request:", newRequest)
        );
        socket.on("requestUpdated", (updatedRequest) =>
            console.log("Updated Request:", updatedRequest)
        );
        socket.on("requestDeleted", ({ id }) =>
            console.log("Request Deleted:", id)
        );
        socket.on("paymentUpdated", ({ referenceNumber, paid }) =>
            console.log(`Payment updated for ${referenceNumber}: ${paid}`)
        );

        return () => {
            socket.off("updateRequestCount");
            socket.off("requestCreated");
            socket.off("requestUpdated");
            socket.off("requestDeleted");
            socket.off("paymentUpdated");
        };
    }, []);

    return (
        <Sidebar>
            <div>
                <div className="image-slider-container">
                    <div className="image-slider">
                        <div className="slider-text">
                            <h2
                                style={{
                                    fontFamily: "TrebuchetMS, sans-serif",
                                    fontSize: "50px",
                                }}
                            >
                                UPang Admin
                                <br />
                                Dashboard
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
                                        currentSlide === index
                                            ? "active-dot"
                                            : ""
                                    }`}
                                    onClick={() => setCurrentSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row g-3 my-2">
                    <div className="col-md-3">
                        <div className="p-4 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">
                                    {loading ? "Loading..." : requestsCount}
                                </h3>

                                <p className="fs-5">Request</p>
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
