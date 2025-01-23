import React from "react";
import Header from "./partials/Header.comp";
import Footer from "./partials/Footer.comp";
import { Outlet } from "react-router-dom";

function DefaultLayout({ children }) {
    return (
        <div>
            <header className="header">
                <Header />
            </header>
            <main className="main">
                <Outlet />
            </main>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
}

export default DefaultLayout;
