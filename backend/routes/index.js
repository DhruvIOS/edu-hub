// backend/routes/index.js

const express = require('express');
const router = express.Router();
const { upload, uploadFiles } = require('../controllers/uploadController');

// Using 'upload.array' to handle multiple file uploads
router.post('/analysis/analyze', upload.array('files'), uploadFiles);

module.exports = router;
