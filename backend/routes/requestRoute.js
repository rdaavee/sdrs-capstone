const express = require("express");
const cors = require("cors");

const {
    createRequestCtrl,
    getRequestCtrl,
    updateRequestStatusCtrl,
} = require("../controllers/requestController");

const router = express.Router();
router.use(cors());

router.post("/create-request", createRequestCtrl);
router.get("/requests", getRequestCtrl);
router.put("/update/:id", updateRequestStatusCtrl);

module.exports = router;
