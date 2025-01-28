const { userSchema } = require("./userSchema");

const insertUser = async (userObj) => {
    try {
        const newUser = new userSchema(userObj);
        const savedUser = await newUser.save();
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

const storeUserRefreshJWT = (_id, token) => {
    return new Promise((resolve, reject) => {
        try {
            userSchema
                .findOneAndUpdate(
                    { _id },
                    {
                        $set: {
                            "refreshJWT.token": token,
                            "refreshJWT.addedAt": Date.now(),
                        },
                    },
                    { new: true }
                )
                .then((data) => resolve(data))
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

module.exports = { insertUser, getUserByEmail, storeUserRefreshJWT };
