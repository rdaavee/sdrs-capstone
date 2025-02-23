const mongoose = require("../config/dbConfig");

const documentSchema = new mongoose.Schema({
    documentID: { type: String, required: true },
    name: { type: String, required: true },
    documentFee: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
