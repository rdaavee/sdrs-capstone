const mongoose = require("../config/dbConfig");

const PaymentSchema = new mongoose.Schema({
    referenceNumber: {
        type: String,
        required: true,
        unique: true, // Ensures each reference number is unique
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // If payments are linked to users
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: "PHP",
    },
    status: {
        type: String,
        enum: ["pending", "paid", "failed"], // Only allow these values
        default: "pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
