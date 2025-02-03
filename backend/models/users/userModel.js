const mongoose = require("../../config/dbConfig");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "student",
    },
});

module.exports = mongoose.model("User", userSchema);
