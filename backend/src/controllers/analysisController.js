const Document = require('../models/Document');
const Analysis = require('../models/Analysis');
const nlpService = require('../services/nlpService');
const caseStudyService = require('../services/caseStudyService');

// Analyze document
exports.analyzeDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // Process document through NLP pipeline
    const simplifiedContent = await nlpService.simplifyDocument(document.content);
    const detectedFlaws = await nlpService.detectFlaws(document.content);
    const relevantCases = await caseStudyService.findRelevantCases(document.content, detectedFlaws);
    
    // Create analysis record
    const analysis = new Analysis({
      document: documentId,
      simplifiedContent,
      detectedFlaws,
      relevantCases,
      createdBy: req.user.id
    });
    
    await analysis.save();
    
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error analyzing document',
      error: error.message
    });
  }
};

// Get analysis by document ID
exports.getAnalysisByDocumentId = async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const analysis = await Analysis.findOne({ document: documentId })
      .sort({ createdAt: -1 })
      .populate('document')
      .populate('createdBy', 'name email');
    
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found for this document'
      });
    }
    
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving analysis',
      error: error.message
    });
  }
};

// Get all analyses
exports.getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find()
      .sort({ createdAt: -1 })
      .populate('document')
      .populate('createdBy', 'name email');
    
    res.status(200).json({
      success: true,
      count: analyses.length,
      data: analyses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving analyses',
      error: error.message
    });
  }
};
