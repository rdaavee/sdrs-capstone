const mongoose = require("../config/dbConfig");

const ticketSchema = new mongoose.Schema({
    requester: String,
    areaOfConcern: String,
    contactNumber: Number,
    studentNumber: Number,
    ticketNumber: Number,
    status: Boolean,
    course: String,
    description: String,
});

module.exports = { ticketSchema };
x;
