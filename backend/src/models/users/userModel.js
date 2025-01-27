const { userSchema } = require("./userSchema");

const insertUser = async (userObj) => {
    try {
        const newUser = new userSchema(userObj);
        const savedUser = await newUser.save(); // Save the user document
        return savedUser;
    } catch (error) {
        throw new Error(`Error inserting user: ${error.message}`);
    }
};

const getUserByEmail = async (email) => {
    if (!email) throw new Error("Email is required");

    try {
        const user = await userSchema.findOne({ email });
        return user;
    } catch (error) {
        throw new Error(`Error fetching user: ${error.message}`);
    }
};

module.exports = { insertUser, getUserByEmail };
