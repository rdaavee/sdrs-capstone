const Request = require("../models/requestModel");
const { getDataByReferenceNumber } = require("../services/trackerService");

async function validateTracking(req, res) {
    try {
        const { referenceNumber } = req.body;

        const request = await Request.findOne({
            referenceNumber: referenceNumber,
        });

        if (request) {
            return res.json({
                success: true,
                message: "Valid reference number",
            });
        }

        return res
            .status(404)
            .json({ success: false, message: "Invalid request." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRequestByReferenceNumberCtrl = async (req, res) => {
    try {
        const request = await getDataByReferenceNumber(
            req.params.referenceNumber
        );
        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ message: "Request not found" });
        }
    } catch (error) {
        console.error("Error fetching request:", error); // Log detailed error
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { validateTracking, getRequestByReferenceNumberCtrl };
