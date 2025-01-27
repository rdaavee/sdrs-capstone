const bcrypt = require("bcrypt");
const saultRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saultRounds));
    });
};

module.exports = { hashPassword };
