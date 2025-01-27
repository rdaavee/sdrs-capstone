const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.all("/", (req, res, next) => {
    next();
});

// Register user
router.post("/", registerUser);

// Login user
router.post("/login", loginUser);

module.exports = router;
