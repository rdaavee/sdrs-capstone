import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation } from "react-router-dom";
import "./breadcrumb.style.css";

const PageBreadcrumb = ({ page }) => {
    const location = useLocation();

    const breadcrumbMap = {
        "/dashboard": " ",
        "/add-ticket": "Create New Ticket",
        "/tickets": "Ticket Lists",
    };

    const currentPage =
        breadcrumbMap[location.pathname] || location.pathname.split("/").pop();

    return (
        <Breadcrumb
            className="mt-3 ms-3"
            style={{
                fontFamily: "TrebuchetMS, sans-serif",
                textDecoration: "none",
            }}
        >
            <Breadcrumb.Item
                className="breadcrumb-item"
                href="/dashboard"
                style={{
                    fontFamily: "TrebuchetMS, sans-serif",
                    textDecoration: "none",
                }}
            >
                Dashboard
            </Breadcrumb.Item>
            {currentPage && (
                <Breadcrumb.Item
                    active
                    style={{
                        fontFamily: "TrebuchetMS, sans-serif",
                        color: "#C1C1C1",
                    }}
                >
                    {currentPage}
                </Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
};

export default PageBreadcrumb;
