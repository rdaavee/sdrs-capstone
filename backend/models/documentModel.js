const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    documentID: { type: String, required:true},
    name: { type: String, required: true },
    fee: { type: Number, required: true },
});
const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
