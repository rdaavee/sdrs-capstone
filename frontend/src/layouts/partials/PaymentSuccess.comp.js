import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const PaymentSuccess = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const referenceNumber = queryParams.get("referenceNumber");
    const selectedDocuments = queryParams.get("selectedDocuments");
    const date = queryParams.get("date");

    useEffect(() => {
        if (referenceNumber) {
            console.log("Sending reference number:", referenceNumber);
            fetch("http://localhost:5000/request/update-payment-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    referenceNumber,
                    paid: true,
                    selectedDocuments: selectedDocuments
                        ? JSON.parse(selectedDocuments)
                        : [],
                    date: date || "",
                }),
            })
                .then((res) => res.json())
                .then((data) => console.log("Updated request status:", data))
                .catch((error) =>
                    console.error("Error updating request:", error)
                );
        }
    }, [referenceNumber, selectedDocuments, date]);

    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Payment Successful! 🎉</h2>
            <p>Your request has been processed successfully.</p>
            <Link
                to="/tracker-request"
                onClick={() => {
                    if (referenceNumber) {
                        localStorage.setItem(
                            "referenceNumber",
                            referenceNumber
                        );
                    }
                    if (selectedDocuments) {
                        localStorage.setItem(
                            "selectedDocuments",
                            selectedDocuments
                        );
                    }
                    if (date) {
                        localStorage.setItem("date", date);
                    }
                }}
            >
                Go back
            </Link>
        </div>
    );
};

export default PaymentSuccess;
