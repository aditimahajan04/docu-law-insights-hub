const axios = require('axios');
const config = require('../config/app');

exports.findRelevantCases = async (documentText, detectedFlaws) => {
  try {
    // Extract keywords from document and flaws
    const keywords = extractKeywords(documentText, detectedFlaws);
    
    // Search for relevant cases using legal database API
    const relevantCases = await searchLegalDatabase(keywords);
    
    return relevantCases;
  } catch (error) {
    console.error('Error finding relevant cases:', error);
    return [];
  }
};

function extractKeywords(documentText, detectedFlaws) {
  // Extract document type
  let documentType = '';
  if (documentText.includes('lease') || documentText.includes('Lease')) {
    documentType = 'lease';
  } else if (documentText.includes('employment') || documentText.includes('Employment')) {
    documentType = 'employment';
  } else if (documentText.includes('purchase') || documentText.includes('Purchase')) {
    documentType = 'purchase';
  }
  
  // Extract keywords from flaws
  const flawKeywords = detectedFlaws.map(flaw => {
    if (flaw.type === 'MISSING_CLAUSE') {
      return flaw.description.replace('The document lacks a ', '').replace(' clause', '');
    } else if (flaw.type === 'AMBIGUITY') {
      return flaw.description.match(/"([^"]+)"/)[1];
    }
    return '';
  }).filter(keyword => keyword !== '');
  
  return {
    documentType,
    flawKeywords
  };
}

async function searchLegalDatabase(keywords) {
  try {
    // This would be replaced with actual API call to legal database
    // Mocking the response for demonstration
    
    // In a real implementation, you would make an API call like:
    // const response = await axios.get('https://legal-database-api.com/search', {
    //   params: { keywords: keywords.flawKeywords.join(','), documentType: keywords.documentType },
    //   headers: { 'Authorization': `Bearer ${config.legalDatabaseApiKey}` }
    // });
    
    // Mock response
    const mockCases = [
      {
        caseTitle: 'Fifty States Mgt. Corp. v Pioneer Auto Parks',
        citation: '46 N.Y.2d 573 (1979)',
        relevance: 'Established that commercial parties are held to the exact terms they negotiated',
        summary: 'Court enforced strict compliance with lease terms in commercial context'
      },
      {
        caseTitle: 'Foundation Development Corp. v. Loehmann\'s Inc.',
        citation: '788 P.2d 1189 (Ariz. 1990)',
        relevance: 'Refused to apply forfeiture for brief defaults',
        summary: 'Court provided relief from strict enforcement of commercial lease terms'
      },
      {
        caseTitle: 'Commercial Lease Dispute Case Study',
        citation: 'NY Sup. Ct. (2018)',
        relevance: 'Ambiguous repair obligations led to litigation',
        summary: 'Tenant withheld $60,000 in rent due to unclear maintenance responsibilities'
      }
    ];
    
    return mockCases;
  } catch (error) {
    console.error('Error searching legal database:', error);
    return [];
  }
}
