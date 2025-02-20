const mongoose = require("../config/dbConfig");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["super-admin", "middle-admin", "staff-admin", "user"],
        default: "user",
    },
});

module.exports = mongoose.model("User", userSchema);
