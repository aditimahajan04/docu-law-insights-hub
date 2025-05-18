const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const legalTerms = require('../utils/legalTermsDatabase');

exports.simplifyDocument = async (documentText) => {
  // Document simplification logic
  const sentences = documentText.split(/[.!?]+/);
  
  const simplifiedSentences = sentences.map(sentence => {
    // Replace legal jargon with simpler terms
    let simplified = sentence;
    legalTerms.forEach(term => {
      if (sentence.includes(term.complex)) {
        simplified = simplified.replace(term.complex, term.simple);
      }
    });
    return simplified;
  });
  
  return {
    originalLength: documentText.length,
    simplifiedContent: simplifiedSentences.join('. '),
    keyPoints: extractKeyPoints(documentText)
  };
};

exports.detectFlaws = async (documentText) => {
  const flaws = [];
  
  // Check for missing sections
  const sectionPattern = /Section\s+(\d+):/gi;
  const sections = [];
  let match;
  
  while ((match = sectionPattern.exec(documentText)) !== null) {
    sections.push(parseInt(match[1]));
  }
  
  // Check for sequential numbering
  if (sections.length > 0) {
    const maxSection = Math.max(...sections);
    for (let i = 1; i <= maxSection; i++) {
      if (!sections.includes(i)) {
        flaws.push({
          type: 'NUMBERING_ERROR',
          description: `Missing Section ${i}`,
          suggestion: `Add Section ${i} to maintain proper document structure`
        });
      }
    }
  }
  
  // Check for common missing clauses
  const commonClauses = [
    { name: 'force majeure', regex: /force\s+majeure|act(\s+of)?\s+god|unforeseen/i },
    { name: 'termination', regex: /terminat(e|ion)|cancel(lation)?/i },
    { name: 'indemnification', regex: /indemnif(y|ication)|hold\s+harmless/i }
  ];
  
  commonClauses.forEach(clause => {
    if (!clause.regex.test(documentText)) {
      flaws.push({
        type: 'MISSING_CLAUSE',
        description: `The document lacks a ${clause.name} clause`,
        suggestion: `Add a ${clause.name} clause to protect both parties`
      });
    }
  });
  
  // Check for ambiguities
  const ambiguityPatterns = [
    { pattern: /reasonable/gi, issue: 'reasonable' },
    { pattern: /substantial/gi, issue: 'substantial' },
    { pattern: /proportionate share/gi, issue: 'proportionate share' }
  ];
  
  ambiguityPatterns.forEach(item => {
    if (item.pattern.test(documentText)) {
      flaws.push({
        type: 'AMBIGUITY',
        description: `The term "${item.issue}" is used without clear definition`,
        suggestion: `Define "${item.issue}" with specific metrics or calculations`
      });
    }
  });
  
  return flaws;
};

function extractKeyPoints(text) {
  // Extract key information like parties, dates, amounts
  const keyPoints = {};
  
  // Extract parties
  const partyMatch = text.match(/between\s+([^,]+),?\s+\(["']?Landlord["']?\)\s+and\s+([^,]+),?\s+\(["']?Tenant["']?\)/i);
  if (partyMatch) {
    keyPoints.landlord = partyMatch[1].trim();
    keyPoints.tenant = partyMatch[2].trim();
  }
  
  // Extract property details
  const propertyMatch = text.match(/(\d+)\s+square\s+feet.*?at\s+([^,]+)/i);
  if (propertyMatch) {
    keyPoints.squareFootage = propertyMatch[1];
    keyPoints.address = propertyMatch[2].trim();
  }
  
  // Extract lease term
  const termMatch = text.match(/term\s+of\s+(\d+)\s+years/i);
  if (termMatch) {
    keyPoints.leaseTerm = `${termMatch[1]} years`;
  }
  
  // Extract rent
  const rentMatch = text.match(/(\$[\d,]+\.?\d*)\s+per\s+month/i);
  if (rentMatch) {
    keyPoints.monthlyRent = rentMatch[1];
  }
  
  return keyPoints;
}
