const jwt = require("jsonwebtoken");
const { storeUserRefreshJWT } = require("../models/users/userModel");

const createAccessJWT = (payload) => {
    const createJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1d",
    });

    return Promise.resolve(createJWT);
};

const createRefreshJWT = async (payload, _id) => {
    try {
        const refreshJWT = jwt.sign(
            { payload },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "30d",
            }
        );

        await storeUserRefreshJWT(_id, refreshJWT);
        return Promise.resolve(refreshJWT);
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = { createAccessJWT, createRefreshJWT };
