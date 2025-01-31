import React from "react";
//import { useEffect, useState } from "react";
import EntryHeader from "../../layouts/partials/EntryHeader.comp";
import Footer from "../../layouts/partials/Footer.comp";

import entryBanner from "../../assets/images/entry-img.svg";
import guidePic1 from "../../assets/images/entry-guide-1.svg";
import guidePic2 from "../../assets/images/entry-guide-2.svg";
import guidePic3 from "../../assets/images/entry-guide-3.svg";

import "./Entry.style.css";

const EntryPage = () => {
    return (
        <div className="bg-gray-100">
            <EntryHeader />

            <section className="entry-banner">
                <img src={entryBanner} alt="Entry Banner" />
                <div className="entry-overlay">
                    <h2>UPang Online Helpdesk</h2>
                </div>
            </section>

            <section
                id="entry-message"
                className="py-16 px-8 container mx-auto"
            >
                <br />
                <br />
                <h2>
                    Good News for PHINMA UPang students! <br />
                    UPang Online Helpdesk is already ready to assist you.
                </h2>
                <button className="entry-button mt-5">
                    Visit UPang Helpdesk
                </button>
                <br />
                <p className="mb-5">
                    The PHINMA-UPang SDRS in curently going under testing to
                    ready to assist you with all of your online credentials
                    requests. May it be your "Form 137/138, Certificate,
                    Diploma, or Good Moral or Honorable Dismissal" our team is
                    here to help. All you have to do is register and submit your
                    request by creating a “new support ticket and specify your
                    request”. You can even keep track of the “‘status of your
                    ticket, so you know exactly when your request has been
                    completed.
                </p>
            </section>

            <section className="guide1-container py-16">
                <div className="guide1-content">
                    <img
                        src={guidePic1}
                        alt='Click on "Visit UPang Helpdesk"'
                        className="guide1-image mb-5"
                    />
                    <div className="guide1-text">
                        <h4>
                            1. Start by clicking the Visit UPang Helpdesk
                            button.
                        </h4>
                    </div>
                </div>
            </section>

            <section className="guide2-container py-16">
                <div className="guide2-content">
                    <img
                        src={guidePic2}
                        alt="Login to your PHINMA UPang Account"
                        className="guide2-image mb-5"
                    />
                    <div className="guide1-text">
                        <h4>
                            2. Login to your PHINMA UPang account to access your
                            dashboard.
                        </h4>
                    </div>
                </div>
            </section>

            <section className="guide1-container py-16">
                <div className="guide1-content">
                    <img
                        src={guidePic3}
                        alt='Click on "Create Ticket" and Fill up the form'
                        className="guide1-image mb-5"
                    />
                    <div className="guide1-text">
                        <h4>
                            3. Start by creating a "new support ticket" and
                            specify your request.
                        </h4>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EntryPage;
