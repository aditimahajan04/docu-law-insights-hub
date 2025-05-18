const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true
  },
  simplifiedContent: {
    originalLength: Number,
    simplifiedContent: String,
    keyPoints: Object
  },
  detectedFlaws: [{
    type: {
      type: String,
      enum: ['NUMBERING_ERROR', 'MISSING_CLAUSE', 'AMBIGUITY', 'INCONSISTENCY', 'OTHER'],
      required: true
    },
    description: String,
    suggestion: String
  }],
  relevantCases: [{
    caseTitle: String,
    citation: String,
    relevance: String,
    summary: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
