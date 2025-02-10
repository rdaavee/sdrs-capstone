const mongoose = require("../config/dbConfig");

const requestSchema = new mongoose.Schema({
    studentNumber: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    mobileNumber: Number,
    course: String,
    yearGraduated: Number,
    province: String,
    municipality: String,
    barangay: String,
});

module.exports = mongoose.model("Request", requestSchema);
