const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/app');

// Initialize storage
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucket = storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);

// Upload file to Google Cloud Storage
exports.uploadToStorage = async (file) => {
  try {
    if (!file) return null;
    
    // Check file type
    if (!config.allowedFileTypes.includes(file.mimetype)) {
      throw new Error('Invalid file type. Only PDF and Word documents are allowed.');
    }
    
    // Check file size
    if (file.size > config.maxFileSize) {
      throw new Error(`File too large. Maximum size is ${config.maxFileSize / (1024 * 1024)}MB.`);
    }
    
    const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
    const fileUpload = bucket.file(`documents/${fileName}`);
    
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
    
    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });
      
      stream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/documents/${fileName}`;
        resolve(publicUrl);
      });
      
      stream.end(file.buffer);
    });
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }
};

// Extract text from PDF or Word document
exports.extractTextFromDocument = async (fileUrl) => {
  // Implementation would depend on the specific PDF/Word parsing library
  // This is a placeholder for the actual implementation
  try {
    // For PDF: could use pdf-parse
    // For Word: could use mammoth or docx
    
    // Return extracted text
    return "Extracted document text would be here";
  } catch (error) {
    throw new Error(`Error extracting text: ${error.message}`);
  }
};
