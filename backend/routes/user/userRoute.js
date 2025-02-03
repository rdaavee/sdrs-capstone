const express = require("express");
const cors = require("cors");
const userController = require("../../controllers/user/userController");
const authMiddleware = require("../../utils/authMiddleware");

const router = express.Router();
router.use(cors());

router.get("/users", authMiddleware.authenticateToken, userController.getUsers);

module.exports = router;
