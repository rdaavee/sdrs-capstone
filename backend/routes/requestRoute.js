const express = require("express");
const cors = require("cors");
const {
    createRequestCtrl,
    getRequestCtrl,
    updateRequestStatusCtrl,
    createRequestedDocument,
    deleteRequestCtrl,
} = require("../controllers/requestController");

const requestController = require("../controllers/requestController");

const router = express.Router();
router.use(cors());

router.post("/create-request", createRequestCtrl);
router.post("/create-requested-document", createRequestedDocument);
router.post("/update-status", requestController.updateRequestStatus);
router.get("/requests", getRequestCtrl);
router.put("/update/:id", updateRequestStatusCtrl);
router.delete("/delete/:id", deleteRequestCtrl);

module.exports = router;
