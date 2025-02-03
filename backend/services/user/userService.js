const User = require("../../models/users/userModel");

async function getUsers() {
    const users = await User.findOne({});
    return users;
}

module.exports = { getUsers };
