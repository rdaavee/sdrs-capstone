const Request = require("../models/requestModel");
const Code = require("../models/codeModel");
const { getDataByReferenceNumber } = require("../services/trackerService");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(
        require("../config/serviceAccountKey.json")
    ),
});

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rd.arcega12@gmail.com",
        pass: "sntz akyl pipc nozc",
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Nodemailer Error:", error);
    } else {
        console.log("Server is ready to take messages");
    }
});

async function validateTracking(req, res) {
    try {
        const { referenceNumber } = req.body;

        const request = await Request.findOne({ referenceNumber });

        if (request) {
            return res.json({
                success: true,
                message: "Valid reference number",
            });
        }

        return res
            .status(404)
            .json({ success: false, message: "Invalid request." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRequestByReferenceNumberCtrl = async (req, res) => {
    try {
        const request = await getDataByReferenceNumber(
            req.params.referenceNumber
        );

        if (request) {
            res.status(200).json(request);
        } else {
            res.status(404).json({ message: "Request not found" });
        }
    } catch (error) {
        console.error("Error fetching request:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const sendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const token = req.headers.authorization?.split("Bearer ")[1];

        if (!email) {
            return res
                .status(400)
                .json({ success: false, message: "Email is required" });
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("Decoded Token:", decodedToken);

        const generatedCode = Math.floor(
            1000 + Math.random() * 9000
        ).toString();

        await Code.create({
            email,
            code: generatedCode,
            expiresAt: new Date(Date.now() + 10 * 60000), // 10 minutes expiration
        });

        console.log("Code saved:", generatedCode);

        const mailInfo = await transporter.sendMail({
            from: "sdrscodegenerator00@gmail.com",
            to: email,
            subject: "Your Tracker Verification Code",
            text: `Your verification code is: ${generatedCode}`,
        });

        console.log("Email sent:", mailInfo.response);

        res.status(200).json({
            success: true,
            message: "Code sent successfully!",
        });
    } catch (error) {
        console.error("Error sending code:", error);
        res.status(500).json({
            success: false,
            message: "Error sending code",
            error: error.message,
        });
    }
};

const verifyCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        const validCode = await CodeModel.findOne({
            email,
            code,
            expiresAt: { $gt: new Date() },
        });

        if (validCode) {
            res.status(200).json({ success: true, message: "Code verified!" });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid or expired code",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error verifying code",
            error,
        });
    }
};

async function validateAndVerifyTracking(req, res) {
    try {
        const { referenceNumber, code } = req.body;

        const request = await Request.findOne({ referenceNumber });
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Invalid reference number.",
            });
        }

        const validCode = await Code.findOne({
            code,
            expiresAt: { $gt: new Date() },
        });

        if (!validCode) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired code.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Tracking verified. Access granted.",
        });
    } catch (error) {
        console.error("Error in validateAndVerifyTracking:", error);
        return res.status(500).json({
            success: false,
            message: "Error verifying tracking request.",
            error: error.message,
        });
    }
}

module.exports = {
    validateTracking,
    getRequestByReferenceNumberCtrl,
    sendCode,
    verifyCode,
    validateAndVerifyTracking,
};
