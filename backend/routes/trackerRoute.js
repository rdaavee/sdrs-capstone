const express = require("express");
const cors = require("cors");
const {
    validateTracking,
    getRequestByReferenceNumberCtrl,
    sendCode,
    verifyCode,
    validateAndVerifyTracking,
} = require("../controllers/trackerController");

const router = express.Router();

router.use(cors());

router.post("/validate-tracking", validateTracking);
router.post("/send-code", sendCode);
router.post("/verify-code", verifyCode);
router.post("/validate-and-verify", validateAndVerifyTracking);
router.get("/:referenceNumber", getRequestByReferenceNumberCtrl);

module.exports = router;
