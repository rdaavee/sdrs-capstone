const Request = require("../models/requestModel");

async function createRequest(requestData) {
    const {
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
    } = requestData;

    const createdRequest = new Request({
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
    });

    const savedRequest = await createdRequest.save();
    return savedRequest;
}

async function getRequest() {
    const requests = await Request.find({});
    return requests;
}

module.exports = { createRequest, getRequest };
