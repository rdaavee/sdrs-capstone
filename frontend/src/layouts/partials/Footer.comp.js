import React from "react";
import "../footer.style.css";

import logo1 from "../../assets/images/phinma-cservice-logo.png";
import logo2 from "../../assets/images/upang-text-logo.png";
import locationIcon from "../../assets/icons/location-icon.svg";
import mobilePhoneIcon from "../../assets/icons/mobile-phone-icon.svg";
import schoolDialIcon from "../../assets/icons/school-dial-icon.svg";
import callIcon from "../../assets/icons/call-icon.svg";
import emailIcon from "../../assets/icons/email-icon.svg";
import facebookIcon from "../../assets/icons/facebook-icon.svg";
import twitterIcon from "../../assets/icons/twitter-icon.svg";
import instagramIcon from "../../assets/icons/instagram-icon.svg";
import youtubeIcon from "../../assets/icons/youtube-icon.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4 className="fw-bold">CONTACT US</h4>
                    <h4 className="fw-bold">Dagupan Campus</h4>
                    <ul>
                        <li>
                            <img
                                src={locationIcon}
                                alt="Location"
                                width={20}
                                className="me-2"
                            />
                            <a href="/#!">
                                Arellano Street, Dagupan City, 2400, Pangasinan
                            </a>
                        </li>
                        <li>
                            <img
                                src={mobilePhoneIcon}
                                alt="Mobile Phone"
                                width={20}
                                className="me-2"
                            />
                            <a href="tel:+639950785660">+63 995-078-5660</a>
                        </li>
                        <li>
                            <img
                                src={callIcon}
                                alt="Call"
                                width={20}
                                className="me-2"
                            />
                            <a href="tel:+7505225635">(075) 522-5635</a>
                        </li>
                        <li>
                            <img
                                src={schoolDialIcon}
                                alt="School Dial"
                                width={20}
                                className="me-2"
                            />
                            <a href="tel:+7505222496">(075) 522-2496</a>
                        </li>
                        <li>
                            <img
                                src={emailIcon}
                                alt="Email"
                                width={20}
                                className="me-2"
                            />
                            <a href="mailto:info.up@phinmaed.com">
                                info.up@phinmaed.com
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section school-logos">
                    <img
                        src={logo1}
                        className="me-3"
                        alt="PHINMA Logo"
                        width={150}
                    />
                    <img
                        src={logo2}
                        className="me-3"
                        alt="UPang Logo"
                        width={150}
                    />
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-section">
                    <h4 className="fw-bold">Follow Us</h4>
                    <div className="social-links">
                        <a
                            href="https://www.facebook.com/phinmaupang/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <img
                                src={facebookIcon}
                                alt="Facebook"
                                width={20}
                                className="me-4"
                            />
                        </a>
                        <a
                            href="https://x.com/phinmaupang"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <img
                                src={twitterIcon}
                                alt="Twitter"
                                width={20}
                                className="me-4"
                            />
                        </a>
                        <a
                            href="https://www.instagram.com/phinmaupang/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <img
                                src={instagramIcon}
                                alt="Instagram"
                                width={20}
                                className="me-4"
                            />
                        </a>
                        <a
                            href="https://www.youtube.com/user/phinmaed"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        >
                            <img src={youtubeIcon} alt="YouTube" width={20} />
                        </a>
                    </div>
                </div>
                <p>&copy; 2025 SDRS. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
