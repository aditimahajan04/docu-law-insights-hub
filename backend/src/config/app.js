module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiration: '24h',
    allowedFileTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    maxFileSize: 10 * 1024 * 1024, // 10MB
    nlpApiKey: process.env.NLP_API_KEY,
    legalDatabaseApiKey: process.env.LEGAL_DB_API_KEY
  };
  