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
        sampleDocument,
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
        sampleDocument,
    });

    const savedRequest = await createdRequest.save();
    return savedRequest;
}

async function getRequest() {
    const requests = await Request.find({});
    return requests;
}

module.exports = { createRequest, getRequest };
