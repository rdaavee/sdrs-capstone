const Request = require("../models/requestModel");
const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    try {
        const { amount, formData } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Invalid payment amount" });
        }

        // Ensure amount is an integer (in cents)
        const totalAmount = Math.round(amount);

        // Validate documents
        if (
            !formData.selectedDocuments ||
            formData.selectedDocuments.length === 0
        ) {
            return res.status(400).json({ error: "No documents selected" });
        }

        // Calculate per-document fee (ensure it's an integer)
        const perDocumentAmount = Math.round(
            totalAmount / formData.selectedDocuments.length
        );

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: formData.selectedDocuments.map((doc) => ({
                price_data: {
                    currency: "php",
                    product_data: {
                        name: doc || "Document Request", // Ensure a valid name
                        description: `Requested by ${formData.firstName} ${formData.lastName}`,
                    },
                    unit_amount: perDocumentAmount, // Ensure this is an integer
                },
                quantity: 1,
            })),

            mode: "payment",
            success_url: `http://localhost:3000/payment-success?referenceNumber=${formData.referenceNumber}`,
            cancel_url: "http://localhost:3000/payment-cancel",
            metadata: {
                referenceNumber: formData.referenceNumber,
            },
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Stripe error:", error);
        res.status(500).json({
            error: "Something went wrong",
            details: error.message,
        });
    }
};

exports.handleWebhook = async (req, res) => {
    const event = req.body;

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const referenceNumber = session.metadata.referenceNumber;

        try {
            await Request.findOneAndUpdate(
                { referenceNumber },
                { $set: { documentFee: "Paid" } }
            );

            console.log(`Updated request ${referenceNumber} to "Paid"`);
            return res.status(200).json({ success: true });
        } catch (error) {
            console.error("Error updating request:", error);
            return res
                .status(500)
                .json({ success: false, error: error.message });
        }
    }

    res.status(400).json({ success: false, message: "Invalid event type" });
};
