const Document = require("../models/documentModel");

async function createDocument(documentData) {
    const { name, fee } = documentData;

    const createdDocument = new Document({ name, fee });
    const savedDocument = await createdDocument.save();
    return savedDocument;
}

async function getAllDocuments() {
    return await Document.find({});
}

async function getDocumentById(documentId) {
    return await Document.findById(documentId);
}

async function updateDocument(documentId, documentData) {
    return await Document.findByIdAndUpdate(documentId, documentData, {
        new: true,
    });
}

async function deleteDocument(documentId) {
    return await Document.findByIdAndDelete(documentId);
}

module.exports = {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
};
