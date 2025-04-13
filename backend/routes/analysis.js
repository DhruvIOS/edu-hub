// backend/routes/analysis.js
const express = require('express');
const router = express.Router();
const { upload, analyzeExamPapers } = require('../controllers/analysisController');

router.post('/analyze', upload.array('files'), analyzeExamPapers);
// router.post('/analyze', upload.array('files'), (req, res) => {
//     console.log('Hit the /api/analysis route!');
//     console.log('req.files:', req.files);
//     res.json({ message: 'Route hit successfully' });
// });

module.exports = router;