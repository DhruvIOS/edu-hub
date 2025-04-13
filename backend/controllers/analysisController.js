const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs'); // Import the fs module
const pdfExtraction = require('pdf-extraction'); // Import pdf-extraction
const mammoth = require('mammoth'); // Import mammoth for DOCX parsing
require('dotenv').config(); // Load environment variables for API key

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true }); // Ensure the 'uploads' folder exists
    }
    cb(null, uploadDir); // Specify the folder for file storage
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

// Controller function for handling the analysis request with Gemini 2.0 Flash
const analyzeExamPapers = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded.' });
    }

    console.log('Uploaded files:', req.files);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

//     const prompt = `Analyze the content of these exam paper(s) and provide:
// - A breakdown of the key topics and their estimated percentage weight in the overall content.
// - Study suggestions based on the topic distribution, highlighting high-priority areas.
// - A brief overall assessment of the difficulty level and potential grade range achievable by focusing on these areas.

// output a proper short table and a short 3 - 4 sentence brief on the over assessment and study suggestion`;

const prompt = `Analyze the currently uploaded exam paper file. output a proper short table ( with just topic and weighted ) and from that table analysis of the topic coverage and then generate study suggestions in the following format: Study Suggestions
High Priority Topics: [Topic 1] ([Percentage]%) and [Topic 2] ([Percentage]%) • Strategic Focus: Focus on [Topic 1], [Topic 2], and [Topic 3] for ~[Combined Percentage]% coverage • Potential Outcome: Aiming for [Target Grade] grade possible if these areas are mastered`

    // Function to read file content based on its type
    const extractContent = async (filePath, fileType) => {
      try {
        if (fileType === 'pdf') {
          const data = await pdfExtraction(filePath);
          return data.text;
        } else if (fileType === 'docx') {
          const buffer = fs.readFileSync(filePath);
          const result = await mammoth.extractRawText({ buffer });
          return result.value;
        }
        return '';
      } catch (err) {
        console.error('Error extracting content:', err);
        return '';
      }
    };

    // Prepare the content for the Gemini API
    const contentPromises = req.files.map(async (file) => {
      const filePath = path.join(__dirname, '../uploads', file.filename);
      let fileType = file.mimetype.split('/')[1];

      // Normalize DOCX mimetype
      if (fileType === 'vnd.openxmlformats-officedocument.wordprocessingml.document') {
        fileType = 'docx';
      }

      // Ensure the file type is either PDF or DOCX
      if (fileType !== 'pdf' && fileType !== 'docx') {
        console.log('Unsupported file type:', fileType);
        return null;
      }

      // Extract content from the file
      const fileContent = await extractContent(filePath, fileType);
      if (!fileContent) {
        console.log('No content extracted from file:', file.filename);
        return null;
      }

      // Send content to Gemini API for analysis
      try {
        console.log(`Sending content of file ${file.filename} to Gemini...`);
        const result = await model.generateContent({
          contents: [
            { role: "user", parts: [{ text: prompt + "\n\n" + fileContent }] },
          ],
        });

        const response = await result.response;
        const analysisOutput = response?.candidates?.[0]?.content?.parts?.[0]?.text;

        return analysisOutput || 'No analysis output returned from Gemini.';
      } catch (error) {
        console.error('Error processing file with Gemini:', error);
        return null;
      }
    });

    // Wait for all file analyses to be done
    const analyses = await Promise.all(contentPromises);
    const analysisResults = analyses.filter(Boolean); // Filter out any null or failed results

    if (analysisResults.length === 0) {
      return res.status(500).json({ error: 'Failed to analyze the uploaded files with Gemini.' });
    }

    // Respond with the analysis results
    res.json({
      message: 'Analysis completed successfully!',
      results: analysisResults,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Internal server error during analysis.' });
  } finally {
    // Clean up uploaded files
    if (req.files) {
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          console.log('Deleted file:', file.path);
        } catch (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  }
};

module.exports = { upload, analyzeExamPapers };