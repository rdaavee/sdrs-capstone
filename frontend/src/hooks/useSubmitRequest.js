import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useSubmitRequest = (formData) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const navigate = useNavigate();

    const handleCancel = () => {
        setTimeout(() => {
            setLoading(true);
            navigate("/");
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                "http://localhost:5000/request/create-request",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );
            const result = await response.json();

            if (response.ok) {
                setShowToast(true);
                setTimeout(() => navigate("/"), 1500);
            } else {
                setError(result.message || "Submit Request error");
                setShowErrorToast(true);
            }
        } catch (error) {
            setError("An error occurred. Please try again");
            setShowErrorToast(true);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleSubmit,
        handleCancel,
        loading,
        error,
        showToast,
        showErrorToast,
        setShowToast,
        setShowErrorToast,
    };
};

export default useSubmitRequest;
