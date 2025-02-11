const Request = require("../models/requestModel");

async function getDataByReferenceNumber(referenceNumber) {
    try {
        return await Request.findOne({ referenceNumber });
    } catch (error) {
        console.error("Error in getDataByReferenceNumber:", error);
        throw error;
    }
}

module.exports = { getDataByReferenceNumber };
