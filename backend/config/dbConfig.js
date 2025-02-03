const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sdrs_db");

mongoose.connection.on("connected", () => {
    console.log("Connected to mongoDB");
});

mongoose.connection.on("error", (error) => {
    console.log(`mongoDB connection error: ${error}`);
});

module.exports = mongoose;
