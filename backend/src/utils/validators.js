const { check, validationResult } = require('express-validator');

// User validation rules
exports.registerValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  check('role', 'Role must be admin, lawyer, or paralegal').isIn(['admin', 'lawyer', 'paralegal'])
];

exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Document validation rules
exports.documentValidation = [
  check('title', 'Title is required').not().isEmpty(),
  check('content', 'Content is required').not().isEmpty(),
  check('documentType', 'Document type is required').isIn(['contract', 'lease', 'agreement', 'court_filing', 'other'])
];

// Validation result middleware
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
