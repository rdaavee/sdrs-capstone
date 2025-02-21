import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRequest } from "../services/api";
import { createRequestedDocument } from "../services/api";

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
            await createRequest(formData);
            const referenceNumber = formData.referenceNumber; 
            if (referenceNumber) {
                await Promise.all(
                    formData.selectedDocuments.map(async (documentID) => {
                        await createRequestedDocument({
                            referenceNumber,
                            documentID
                        });
                    })
                );
            }
            setShowToast(true);
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setError(error.message);
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
