import React from "react";
import PropTypes from "prop-types";
import "./message-history.style.css";

const MessageHistory = ({ message }) => {
    if (!message) return null;
    return message.map((row, index) => (
        <div key={index} className="message-history mt-3">
            <div className="send">
                <div className="sender fw-bold">{row.messageBy}</div>
                <div className="date">{row.date}</div>
            </div>
            <div className="message">{row.message}</div>
        </div>
    ));
};

MessageHistory.proTypes = {
    message: PropTypes.array.isRequired,
};

export default MessageHistory;
