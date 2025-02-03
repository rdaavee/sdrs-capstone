import React from "react";
import { useNavigate } from "react-router-dom";
import EntryHeader from "../../layouts/partials/EntryHeader.comp";
import Footer from "../../layouts/partials/Footer.comp";

import entryBanner from "../../assets/images/entry-img.svg";
import guidePic1 from "../../assets/images/entry-guide-1.svg";
import guidePic2 from "../../assets/images/entry-guide-2.svg";
import guidePic3 from "../../assets/images/entry-guide-3.svg";

import "./Entry.style.css";

const EntryPage = () => {
    const navigate = useNavigate();

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
                className="py-16 px-8 container mx-auto text-center p-5"
            >
                <h2>Good News for PHINMA UPang students!</h2>
                <p>
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
                <button
                    className="entry-button mt-5"
                    onClick={() => navigate("/helpdesk")}
                >
                    Visit UPang Helpdesk
                </button>
            </section>

            <section className="guide1-container py-16">
                <div className="guide1-content">
                    <img
                        src={guidePic1}
                        alt="Click on Visit UPang Helpdesk"
                        className="guide1-image"
                    />
                    <h4>
                        1. Start by clicking the Visit UPang Helpdesk button.
                    </h4>
                </div>
            </section>

            <section className="guide2-container py-16">
                <div className="guide2-content">
                    <img
                        src={guidePic2}
                        alt="Login to PHINMA UPang Account"
                        className="guide2-image"
                    />
                    <h4>
                        2. Log in to your PHINMA UPang account to access your
                        dashboard.
                    </h4>
                </div>
            </section>

            <section className="guide1-container py-16">
                <div className="guide1-content">
                    <img
                        src={guidePic3}
                        alt="Create Ticket"
                        className="guide1-image"
                    />
                    <h4>
                        3. Create a new support ticket and specify your request.
                    </h4>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default EntryPage;
