import axios from "axios";

const BASE_LOCATION_API_URL = "https://psgc.cloud/api";
const BASE_TIME_API_URL = "https://timeapi.io/api/Time/current/zone";

const BASE_API_URL = "http://localhost:5000";

//login
export const loginUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        return result;
    } catch (error) {
        throw new Error(
            error.message || "An error occurred. Please try again."
        );
    }
};

//register or create
export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${BASE_API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        return result;
    } catch (error) {
        throw new Error(
            error.message || "An error occurred. Please try again."
        );
    }
};

//create request
export const createRequest = async (formData) => {
    try {
        const response = await fetch(`${BASE_API_URL}/request/create-request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...formData,
                selectedDocuments: formData.selectedDocuments || [],
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Submit Request error");
        }

        return result;
    } catch (error) {
        throw new Error(error.message || "An error occurred. Please try again");
    }
};

export const createRequestedDocument = async ({
    referenceNumber,
    documentID,
    documentFee,
}) => {
    try {
        const response = await fetch(
            `${BASE_API_URL}/request/create-requested-document`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    referenceNumber,
                    documentID,
                    documentFee,
                }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Error adding document to request"
            );
        }

        return result;
    } catch (error) {
        throw new Error(error.message || "An error occurred. Please try again");
    }
};

//get requests
export const authToken = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/users`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Error fetching requests");
    }
};

//get requests
export const fetchRequests = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/request/requests`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to fetch requests");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Error fetching requests");
    }
};

//get tracker request
export const fetchTrackerRequest = async (referenceNumber) => {
    try {
        const response = await fetch(
            `${BASE_API_URL}/tracker/${referenceNumber}`
        );

        if (!response.ok) {
            throw new Error("Request not found or invalid reference number.");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Failed to fetch request data.");
    }
};

//get document fees
export const fetchDocumentFees = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/documents`);
        return await response.data;
    } catch (error) {
        throw new Error(error.message || "Error fetching document fees.");
    }
};

//fetch api time
export const fetchCurrentTime = async () => {
    try {
        const response = await fetch(
            `${BASE_TIME_API_URL}?timeZone=Asia/Manila`
        );
        if (!response.ok) throw new Error("Failed to fetch time");
        return await response.json();
    } catch (error) {
        console.error("Error fetching time:", error);
        return null;
    }
};

//fetch location api
export const fetchProvinces = async () => {
    try {
        const response = await fetch(`${BASE_LOCATION_API_URL}/provinces`);
        if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
};

export const fetchMunicipalities = async (provinceCode) => {
    try {
        const response = await fetch(
            `${BASE_LOCATION_API_URL}/provinces/${provinceCode}/cities-municipalities`
        );
        if (!response.ok) throw new Error("Failed to fetch municipalities");
        return await response.json();
    } catch (error) {
        console.error("Error fetching municipalities:", error);
        return [];
    }
};

export const fetchBarangays = async (municipalityCode) => {
    try {
        const response = await fetch(
            `${BASE_LOCATION_API_URL}/municipalities/${municipalityCode}/barangays`
        );
        if (!response.ok) throw new Error("Failed to fetch barangays");
        return await response.json();
    } catch (error) {
        console.error("Error fetching barangays:", error);
        return [];
    }
};

export const createInvoice = async (amount, customerEmail) => {
    try {
        if (!amount || isNaN(amount) || !customerEmail) {
            console.error("Invalid input data:", { amount, customerEmail });
            return {
                success: false,
                message: "Invalid amount or customer email.",
            };
        }

        console.log("Sending data:", { amount, customerEmail });

        const response = await axios.post(
            "http://localhost:5000/payments/create-invoice",
            { amount, customerEmail },
            { headers: { "Content-Type": "application/json" } }
        );
        console.log("Invoice Created:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Error creating invoice:",
            error.response?.data || error.message
        );
        return {
            success: false,
            message:
                error.response?.data?.message || "Failed to create invoice.",
        };
    }
};
