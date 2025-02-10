const requestService = require("../services/requestService");

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

module.exports = { createRequestCtrl, getRequestCtrl };
