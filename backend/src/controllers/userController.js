const { insertUser, getUserByEmail } = require("../models/users/userModel");
const { hashPassword, comparePassword } = require("../helpers/bcryptHelper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwtHelper");

exports.registerUser = async (req, res) => {
    const { name, address, course, phone, email, password } = req.body;

    try {
        // Hash password
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
        res.json({ status: "error", message: error.message });
    }
};

exports.loginUser = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            status: "error",
            message: "Invalid form submission",
        });
    }

    try {
        const user = await getUserByEmail(email);

        const passFromDb = user && user._id ? user.password : null;
        if (!passFromDb)
            return res.json({
                status: "error",
                message: "Invalid Credentials!",
            });

        const result = await comparePassword(password, passFromDb);

        if (!result) {
            return res.json({
                status: "error",
                message: "Invalid Password!",
            });
        }

        const accessJWT = await createAccessJWT(user.email);
        const refreshJWT = await createRefreshJWT(user.email);

        if (!user) {
            return res.json({
                status: "error",
                message: "User not found",
            });
        }

        res.json({
            status: "success",
            message: "Login Successfully",
            accessJWT,
            refreshJWT,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong",
        });
    }
};
