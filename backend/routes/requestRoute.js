const express = require("express");
const cors = require("cors");

const {
    createRequestCtrl,
    getRequestCtrl,
} = require("../controllers/requestController");

const router = express.Router();
router.use(cors());

router.post("/create-request", createRequestCtrl);
router.get("/requests", getRequestCtrl);

module.exports = router;
