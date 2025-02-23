const mongoose = require("./config/dbConfig");
const Document = require("./models/documentModel");

const seedDocuments = async () => {
    try {
        await Document.deleteMany();

        await Document.insertMany([
            {
                documentID: "1",
                name: "TOR (General Purpose)",
                documentFee: 500,
            },
            { documentID: "2", name: "TOR (Board Exam)", documentFee: 600 },
            { documentID: "3", name: "TOR (Transfer)", documentFee: 550 },
            {
                documentID: "4",
                name: "OTR (General Purpose)",
                documentFee: 450,
            },
            {
                documentID: "5",
                name: "OTR (Board Examination)",
                documentFee: 500,
            },
            {
                documentID: "6",
                name: "Certificate of Transfer (Honorable Dismissal)",
                documentFee: 400,
            },
            { documentID: "7", name: "Diploma", documentFee: 350 },
            {
                documentID: "8",
                name: "Certificate of Enrollment",
                documentFee: 200,
            },
            {
                documentID: "9",
                name: "Certificate of Graduation",
                documentFee: 250,
            },
            {
                documentID: "10",
                name: "Certificate of Units Earned",
                documentFee: 300,
            },
            {
                documentID: "11",
                name: "Certificate of Grades",
                documentFee: 200,
            },
            {
                documentID: "12",
                name: "Certificate of Honor",
                documentFee: 250,
            },
            {
                documentID: "13",
                name: "Certificate of Medium of Instruction",
                documentFee: 275,
            },
            {
                documentID: "14",
                name: "Certificate of Honorable Dismissal",
                documentFee: 400,
            },
        ]);

        console.log("Documents inserted successfully");
    } catch (error) {
        console.error("Error inserting documents:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedDocuments();
