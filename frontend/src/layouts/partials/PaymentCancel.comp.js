import { Link } from "react-router-dom";

const PaymentCancel = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Payment Cancelled</h2>
            <p>You have canceled the payment. You can try again if needed.</p>
            <Link to="/">Go Back to Home</Link>
        </div>
    );
};

export default PaymentCancel;
