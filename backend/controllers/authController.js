const { userLogin, createUser } = require("../services/authService");

async function userLoginCtrl(req, res) {
    try {
        const { email, password } = req.body;
        const token = await userLogin(email, password);
        res.json({ token });
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
}

async function createUserCtrl(req, res) {
    try {
        const userData = req.body;
        const newUser = await createUser(userData);
        res.status(201).json({
            user: newUser,
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error creating user" });
    }
}

module.exports = { userLoginCtrl, createUserCtrl };
