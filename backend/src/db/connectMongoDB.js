const mongoose = require("mongoose");

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL); //to be able to connect
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to mongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectMongoDB;
