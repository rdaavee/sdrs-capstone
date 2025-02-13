const documentService = require("../services/documentService");

const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentService.getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents", error });
    }
};

const getDocumentById = async (req, res) => {
    try {
        const document = await documentService.getDocumentById(req.params.id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: "Error fetching document", error });
    }
};

const createDocument = async (req, res) => {
    try {
        const newDocument = await documentService.createDocument(req.body);
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ message: "Error creating document", error });
    }
};

const updateDocument = async (req, res) => {
    try {
        const updatedDocument = await documentService.updateDocument(
            req.params.id,
            req.body
        );
        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: "Error updating document", error });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const deletedDocument = await documentService.deleteDocument(
            req.params.id
        );
        if (!deletedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting document", error });
    }
};

module.exports = {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
};
