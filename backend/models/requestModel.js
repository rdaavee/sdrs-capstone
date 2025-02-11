const mongoose = require("../config/dbConfig");

const requestSchema = new mongoose.Schema(
    {
        referenceNumber: { type: String, unique: true },
        studentNumber: Number,
        firstName: String,
        middleName: String,
        lastName: String,
        email: {
            type: String,
            match: [/.+\@.+\..+/, "Please fill a valid email address"],
        },
        mobileNumber: Number,
        course: String,
        yearGraduated: Number,
        province: String,
        municipality: String,
        barangay: String,
        sampleDocument: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
