import React, { useState, useEffect } from "react";
import "./Dashboard.style.css";
import Sidebar from "../../layouts/partials/Sidebar.comp";
import searchIcon from "../../assets/icons/search-icon.svg";
import sliderImage1 from "../../assets/images/dashboard-slider-img1.svg";
import sliderImage2 from "../../assets/images/dashboard-slider-img2.svg";
import sliderImage3 from "../../assets/images/dashboard-slider-img3.svg";

const Dashboard = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderImages = [sliderImage1, sliderImage2, sliderImage3];

    const autoSlideInterval = 1500;

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % sliderImages.length
            );
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [sliderImages.length]);

    return (
        <Sidebar>
            <div>
                <p
                    className="mt-4"
                    style={{
                        fontFamily: "TrebuchetMS, sans-serif",
                        fontWeight: "bold",
                        fontSize: "15px",
                    }}
                >
                    How can we help you today?
                </p>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        style={{
                            fontFamily: "TrebuchetMS, sans-serif",
                            fontSize: "11px",
                        }}
                    />
                    <img
                        src={searchIcon}
                        alt="Search Icon"
                        className="search-icon"
                    />
                </div>
                <div className="image-slider-container">
                    <div className="image-slider">
                        <div className="slider-text">
                            <h2
                                style={{
                                    fontFamily: "TrebuchetMS, sans-serif",
                                    fontSize: "50px",
                                }}
                            >
                                UPang Helpdesk
                                <br /> Guide
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
                                    onClick={() => goToSlide(index)}
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default Dashboard;
