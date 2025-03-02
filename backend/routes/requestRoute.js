const express = require("express");
const cors = require("cors");
const {
    createRequestCtrl,
    getRequestCtrl,
    updateRequestStatusCtrl,
    createRequestedDocument,
    deleteRequestCtrl,
    updatePaymentStatusCtrl,
    getRequestStatusCtrl,
} = require("../controllers/requestController");

const router = express.Router();
router.use(cors());

router.post("/create-request", createRequestCtrl);
router.post("/create-requested-document", createRequestedDocument);
router.post("/update-payment-status", updatePaymentStatusCtrl);
router.get("/requests", getRequestCtrl);
router.get("/payments/status/:referenceNumber", getRequestStatusCtrl);
router.put("/update/:id", updateRequestStatusCtrl);
router.delete("/delete/:id", deleteRequestCtrl);

module.exports = router;
