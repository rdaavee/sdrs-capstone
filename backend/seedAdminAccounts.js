const mongoose = require("./config/dbConfig");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const seedAdminAccounts = async () => {
    try {
        const saltRounds = 10;

        const hashedAdmins = await Promise.all([
            bcrypt.hash("123456", saltRounds).then((hashedPassword) => ({
                name: "Ivo Sorio",
                role: "super-admin",
                email: "ivo@gmail.com",
                password: hashedPassword,
            })),
            bcrypt.hash("123456", saltRounds).then((hashedPassword) => ({
                name: "David Mondero",
                role: "middle-admin",
                email: "david@gmail.com",
                password: hashedPassword,
            })),
            bcrypt.hash("123456", saltRounds).then((hashedPassword) => ({
                name: "Mark Bene",
                role: "staff-admin",
                email: "mark@gmail.com",
                password: hashedPassword,
            })),
            bcrypt.hash("123456", saltRounds).then((hashedPassword) => ({
                name: "Dave Tan",
                role: "user",
                email: "dave@gmail.com",
                password: hashedPassword,
            })),
            bcrypt.hash("123456", saltRounds).then((hashedPassword) => ({
                name: "SDRS Account",
                role: "user",
                email: "sdrscodegenerator00@gmail.com",
                password: hashedPassword,
            })),
        ]);

        await User.deleteMany();
        await User.insertMany(hashedAdmins);

        console.log("admin accounts inserted successfully!");
    } catch (error) {
        console.error("error inserting accounts:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedAdminAccounts();
