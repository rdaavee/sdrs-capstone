const jwt = require("jsonwebtoken");

const createAccessJWT = (payload) => {
    const createJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
    });

    return Promise.resolve(createJWT);
};

const createRefreshJWT = (payload) => {
    const refreshJWT = jwt.sign({ payload }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
    });

    return Promise.resolve(refreshJWT);
};

module.exports = { createAccessJWT, createRefreshJWT };
