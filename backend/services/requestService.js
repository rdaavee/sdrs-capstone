const Request = require("../models/requestModel");

async function createRequest(requestData) {
    try {
        const createdRequest = new Request(requestData);
        return await createdRequest.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getRequest() {
    try {
        return await Request.find({});
    } catch (error) {
        throw new Error(error.message);
    }
}

async function updateRequestStatus(requestId, status) {
    try {
        return await Request.findByIdAndUpdate(
            requestId,
            { status },
            { new: true, runValidators: true }
        );
    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ **Add this missing function**
async function deleteRequest(requestId) {
    try {
        return await Request.findByIdAndDelete(requestId);
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createRequest,
    getRequest,
    updateRequestStatus,
    deleteRequest,
};
