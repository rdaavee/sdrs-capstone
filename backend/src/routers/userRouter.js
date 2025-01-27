const express = require("express");
const router = express.Router();

const insertUser = require("../models/users/userModel");
const { hashPassword } = require("../helpers/bcryptHelper");

router.all("/", (req, res, next) => {
    // res.json({ message: "Return from user router" });
    next();
});

router.post("/", async (req, res) => {
    const { name, address, course, phone, email, password } = req.body;

    try {
        //hash password
        const hashedPass = await hashPassword(password);

        const newUserObj = {
            name,
            address,
            course,
            phone,
            email,
            password: hashedPass,
        };
        const result = await insertUser(newUserObj);
        console.log(result);
        res.json({ message: "New user created!", result });
    } catch (error) {
        res.json({ status: "Error", message: error.message });
    }
});

module.exports = router;
