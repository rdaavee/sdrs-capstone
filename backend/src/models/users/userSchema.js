const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    course: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
});

module.exports = { userSchema: mongoose.model("User", userSchema) };