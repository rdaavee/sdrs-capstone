const mongoose = require("../config/dbConfig");

const requestSchema = new mongoose.Schema(
    {
        referenceNumber: { type: String, unique: true, required: true },
        studentNumber: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: String,
        lastName: { type: String, required: true },
        email: {
            type: String,
            required: true,
            match: [/.+\@.+\..+/, "Please provide a valid email address"],
        },
        mobileNumber: { type: String, required: true },
        course: { type: String, required: true },
        yearGraduated: { type: Number },
        province: { type: String, required: true },
        municipality: { type: String, required: true },
        barangay: { type: String, required: true },
        requestedDocumentsID: { type: String },
        selectedDocuments: { type: [String], default: [] },
        status: { type: String, default: "Pending" },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
