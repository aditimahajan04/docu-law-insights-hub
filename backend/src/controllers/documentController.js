const Document = require('../models/Document');
const { uploadToStorage } = require('../services/documentService');

// Upload a new document
exports.uploadDocument = async (req, res) => {
  try {
    const { title, content, documentType, tags } = req.body;
    
    // Upload file to storage if provided
    let fileUrl = null;
    if (req.file) {
      fileUrl = await uploadToStorage(req.file);
    }
    
    // Create new document
    const document = new Document({
      title,
      content,
      documentType,
      fileUrl,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      uploadedBy: req.user.id
    });
    
    await document.save();
    
    res.status(201).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');
    
    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving documents',
      error: error.message
    });
  }
};

// Get document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id)
      .populate('uploadedBy', 'name email');
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving document',
      error: error.message
    });
  }
};

// Update document
exports.updateDocument = async (req, res) => {
  try {
    const { title, content, documentType, tags } = req.body;
    
    let document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Check if user is authorized to update
    if (document.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this document'
      });
    }
    
    // Update document
    document.title = title || document.title;
    document.content = content || document.content;
    document.documentType = documentType || document.documentType;
    document.tags = tags ? tags.split(',').map(tag => tag.trim()) : document.tags;
    
    await document.save();
    
    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Check if user is authorized to delete
    if (document.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this document'
      });
    }
    
    await document.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};
