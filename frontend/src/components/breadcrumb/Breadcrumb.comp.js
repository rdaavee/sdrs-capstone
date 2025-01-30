import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./breadcrumb.style.css";

const PageBreadcrumb = ({ page }) => {
    return (
        <Breadcrumb className="mt-3 ms-3 breadcrumb-style">
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>{page}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default PageBreadcrumb;
