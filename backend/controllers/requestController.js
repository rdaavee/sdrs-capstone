const requestService = require("../services/requestService");
const documentModel = require("../models/ticketModel");
const Request = require("../models/requestModel");
const { getIO } = require("../socket");

async function createRequestCtrl(req, res) {
    try {
        const requestData = req.body;
        const newRequest = await requestService.createRequest(requestData);

        const requests = await Request.find().sort({ createdAt: -1 });
        const requestCount = requests.length;

        getIO().emit("updateRequests", requests);
        getIO().emit("updateRequestCount", requestCount);

        res.status(201).json({
            request: newRequest,
            message: "Request created successfully",
        });
    } catch (error) {
        console.error("Error creating request:", error);
        res.status(400).json({
            message: "Error creating request",
            error: error.message,
        });
    }
}

async function createRequestedDocument(req, res) {
    try {
        const { referenceNumber, documentID, documentFee } = req.body;

        if (!referenceNumber || !documentID) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newRequestedDocument = new documentModel({
            referenceNumber,
            documentID,
            documentFee,
        });

        const savedRequestedDocument = await newRequestedDocument.save();

        res.status(201).json({
            message: "Requested document added successfully",
            data: savedRequestedDocument,
        });
    } catch (error) {
        console.error("Error adding requested document:", error);
        res.status(500).json({
            message: error.message || "Failed to add requested document",
        });
    }
}

async function getRequestCtrl(req, res) {
    try {
        const requests = await requestService.getRequest();
        res.json(requests);
    } catch (error) {
        console.error("Error getting request:", error);
        res.status(400).json({
            message: "Error getting request",
            error: error.message,
        });
    }
}

async function updateRequestStatusCtrl(req, res) {
    try {
        const { status } = req.body;
        const updatedRequest = await requestService.updateRequestStatus(
            req.params.id,
            status
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        getIO().emit("requestUpdated", updatedRequest);

        res.json({
            request: updatedRequest,
            message: "Request status updated successfully",
        });
    } catch (error) {
        console.error("Error updating request status:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function deleteRequestCtrl(req, res) {
    try {
        const { id } = req.params;

        const requestToDelete = await Request.findById(id);
        if (!requestToDelete) {
            return res.status(404).json({ message: "Request not found" });
        }

        const status = requestToDelete.status;

        const deletedRequest = await requestService.deleteRequest(id);
        if (!deletedRequest) {
            return res.status(404).json({ message: "Request not found" });
        }

        getIO().emit("requestDeleted", { id, status });

        const requestCount = await Request.countDocuments();
        getIO().emit("updateRequestCount", requestCount);

        res.json({
            message: "Request deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting request:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
}

async function updatePaymentStatusCtrl(req, res) {
    const { referenceNumber, paid } = req.body;

    if (!referenceNumber) {
        return res.status(400).json({ error: "Missing reference number" });
    }

    try {
        console.log(
            `Updating payment status for reference: ${referenceNumber}`
        );

        const request = await Request.findOne({ referenceNumber });

        if (!request) {
            console.error("Request record not found in the database.");
            return res.status(404).json({ error: "Request record not found" });
        }

        request.documentFeeStatus = paid ? "Paid" : "Unpaid";
        await request.save();

        console.log(
            `Successfully updated payment status for ${referenceNumber}`
        );

        getIO().emit("paymentUpdated", { referenceNumber, paid });

        res.status(200).json({
            success: true,
            message: "Payment status updated successfully",
            request,
        });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ error: error.message });
    }
}

const getRequestStatusCtrl = async (req, res) => {
    const { referenceNumber } = req.params;

    if (!referenceNumber) {
        return res.status(400).json({ error: "Missing reference number" });
    }

    try {
        console.log(
            `Fetching payment status for reference: ${referenceNumber}`
        );

        const request = await Request.findOne({ referenceNumber });

        if (!request) {
            console.error("Request record not found in the database.");
            return res.status(404).json({ error: "Request record not found" });
        }

        const isPaid = request.documentFeeStatus === "Paid";

        console.log(`Payment status for ${referenceNumber}: ${isPaid}`);

        res.status(200).json({ paid: isPaid });
    } catch (error) {
        console.error("Error fetching payment status:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRequestCtrl,
    getRequestCtrl,
    updatePaymentStatusCtrl,
    updateRequestStatusCtrl,
    createRequestedDocument,
    deleteRequestCtrl,
    getRequestStatusCtrl,
};
