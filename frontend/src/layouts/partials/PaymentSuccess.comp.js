import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const referenceNumber = new URLSearchParams(location.search).get(
        "referenceNumber"
    );

    useEffect(() => {
        if (referenceNumber) {
            console.log("Sending reference number:", referenceNumber);
            fetch("http://localhost:5000/requests/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ referenceNumber }),
            })
                .then((res) => res.json())
                .then((data) => console.log("Updated request status:", data))
                .catch((error) =>
                    console.error("Error updating request:", error)
                );
        }
    }, [referenceNumber]);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Payment Successful! 🎉</h2>
            <p>Your request has been processed successfully.</p>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default PaymentSuccess;
