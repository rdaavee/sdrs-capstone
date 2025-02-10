const User = require("../models/userModel");

async function getUsers() {
    const users = await User.find({});
    return users;
}

module.exports = { getUsers };
