const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  // Log error
  logger.error(`${err.name}: ${err.message}`, { stack: err.stack });
  
  // Set status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};
