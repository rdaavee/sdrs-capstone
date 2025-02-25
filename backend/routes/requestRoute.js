const express = require("express");
const cors = require("cors");
const {
    createRequestCtrl,
    getRequestCtrl,
    updateRequestStatusCtrl,
    createRequestedDocument,
} = require("../controllers/requestController");

const router = express.Router();
router.use(cors());

router.post("/create-request", createRequestCtrl);
router.post("/create-requested-document", createRequestedDocument);
router.get("/requests", getRequestCtrl);
router.put("/update/:id", updateRequestStatusCtrl);

module.exports = router;
