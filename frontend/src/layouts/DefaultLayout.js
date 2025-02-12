import React from "react";
import Header from "./partials/Header.comp";
import EntryHeader from "./partials/Header.comp";
import { Outlet } from "react-router-dom";

function DefaultLayout({ children }) {
    return (
        <div style={{ backgroundColor: "#F8F9FA" }}>
            <header className="header">
                <EntryHeader />
            </header>
            <main className="main">
                <Outlet />
            </main>
            {/* <footer className="footer">
                <Footer />
            </footer> */}
        </div>
    );
}

export default DefaultLayout;
