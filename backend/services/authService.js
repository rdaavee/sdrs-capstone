const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtUtil");

async function userLogin(email, password) {
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw error;
    }
}

//user registration
async function createUser(userData) {
    const { name, email, password } = userData;
    const hashedPass = await bcrypt.hash(password, 10);
    const createdUser = new User({
        name,
        email,
        password: hashedPass,
        role: "user",
    });

    const savedUser = await createdUser.save();
    return savedUser;
}

module.exports = { userLogin, createUser };
