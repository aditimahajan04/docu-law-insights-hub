const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// Upload document
router.post('/', auth, upload.single('file'), documentController.uploadDocument);

// Get all documents
router.get('/', auth, documentController.getAllDocuments);

// Get document by ID
router.get('/:id', auth, documentController.getDocumentById);

// Update document
router.put('/:id', auth, documentController.updateDocument);

// Delete document
router.delete('/:id', auth, documentController.deleteDocument);

module.exports = router;
