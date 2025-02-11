const express = require("express");
const cors = require("cors");
const {
    validateTracking,
    getRequestByReferenceNumberCtrl,
} = require("../controllers/trackerController");

const router = express.Router();

router.use(cors());

router.post("/validate-tracking", validateTracking);
router.get("/:referenceNumber", getRequestByReferenceNumberCtrl);

module.exports = router;
