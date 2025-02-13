const mongoose = require("./config/dbConfig");
const Document = require("./models/documentModel");

const seedDocuments = async () => {
    try {
        await Document.deleteMany();
        await Document.insertMany([
            // this is just sample
            { name: "Transcript of Records", fee: 250 },
            { name: "Diploma Certificate", fee: 300 },
            { name: "Certificate of Good Standing", fee: 200 },
        ]);

        console.log("Documents inserted successfully");
    } catch (error) {
        console.error("Error inserting documents:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDocuments();
