const mongoose = require("../config/dbConfig");

const requestedDocumentsSchema = new mongoose.Schema({
    referenceNumber: String,
    documentID: String,
    date: { type: Date, default: Date.now } ,
});


module.exports = mongoose.model("RequestedDocument", requestedDocumentsSchema)
