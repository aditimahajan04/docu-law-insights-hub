const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');
const auth = require('../middleware/auth');

// Analyze document
router.post('/:documentId', auth, analysisController.analyzeDocument);

// Get analysis by document ID
router.get('/document/:documentId', auth, analysisController.getAnalysisByDocumentId);

// Get all analyses
router.get('/', auth, analysisController.getAllAnalyses);

module.exports = router;
