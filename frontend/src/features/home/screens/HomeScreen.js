import React from "react";
import Header from "../../../layouts/partials/Header";
import Footer from "../../../layouts/partials/Footer";

const HomeLayout = ({ children }) => {
    return (
        <div className="home-layout">
            <div className="header">
                <Header />
            </div>
            <div className="main">{children}</div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};

export default HomeLayout;
