const bcrypt = require("bcrypt");
const saultRounds = 10;

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saultRounds));
    });
};

const comparePassword = (plainPass, passFromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainPass, passFromDb, function (error, result) {
            if (error) reject(error);
            resolve(result);
        });
    });
};

module.exports = { hashPassword, comparePassword };
