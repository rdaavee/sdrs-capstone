const Request = require("../models/requestModel");

async function createRequest(requestData) {
    const {
        referenceNumber,
        studentNumber,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        course,
        yearGraduated,
        province,
        municipality,
        barangay,
        selectedDocument,
        status,
    } = requestData;

    const createdRequest = new Request({
        referenceNumber,
        studentNumber,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        course,
        yearGraduated,
        province,
        municipality,
        barangay,
        selectedDocument,
        status,
    });

    const savedRequest = await createdRequest.save();
    return savedRequest;
}

async function getRequest() {
    const requests = await Request.find({});
    return requests;
}

async function updateRequestStatus(requestId, status) {
    return await Request.findByIdAndUpdate(
        requestId,
        { status },
        { new: true }
    );
}

module.exports = { createRequest, getRequest, updateRequestStatus };
