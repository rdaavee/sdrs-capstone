const express = require("express");
const cors = require("cors");
const {
    userLoginCtrl,
    createUserCtrl,
} = require("../../controllers/auth/authController");

const router = express.Router();

router.use(cors());

router.post("/login", userLoginCtrl);

router.post("/register", createUserCtrl);

module.exports = router;
