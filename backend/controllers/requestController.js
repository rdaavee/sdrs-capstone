const requestService = require("../services/requestService");
const documentModel = require("../models/ticketModel");
const { getIO } = require("../socket");

async function createRequestCtrl(req, res) {
    try {
        const requestData = req.body;
        const newRequest = await requestService.createRequest(requestData);
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
        console.log(req.body);

        if (!referenceNumber || !documentID) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newRequestedDocument = new documentModel({
            referenceNumber,
            documentID,
            documentFee
        });
        const savedRequestedDocument = await newRequestedDocument.save();

        res.status(201).json({
            message: "Requested document added successfully",
            data: savedRequestedDocument,
        });
    } catch (error) {
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

module.exports = {
    createRequestCtrl,
    getRequestCtrl,
    updateRequestStatusCtrl,
    createRequestedDocument,
};
