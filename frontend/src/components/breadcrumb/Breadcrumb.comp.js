import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const PageBreadcrumb = ({ page }) => {
    return (
        <Breadcrumb className="mt-5">
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>{page}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default PageBreadcrumb;
