import React, { useState } from "react";
 // Optional CSS file

function ExamHelper() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);

      // Mock analysis result
      setAnalysisResults({
        singlePaper: true,
        fileName: selectedFiles[0]?.name,
        topicBreakdown: [
          { topic: "Calculus", percent: 35 },
          { topic: "Algebra", percent: 25 },
          { topic: "Geometry", percent: 15 },
        ],
        suggestions: [
          "High Priority Topics: Calculus (35%) and Algebra (25%)",
          "Strategic Focus: Focus on Calculus, Algebra, and Geometry for ~75% coverage",
          "Potential Outcome: Aiming for B grade possible if these areas are mastered",
        ],
      });
    }, 2000); // Simulate 2-second loading
  };

  return (
    <div className="exam-helper-container">
      <h2>📘 Exam Helper</h2>

      {/* File Upload Area */}
      <div className="upload-area">
        <p>Select or drop exam paper files (PDF/DOCX)</p>
        <input type="file" multiple onChange={handleFileChange} />
        {selectedFiles.length > 0 && (
          <ul>
            {selectedFiles.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
        <button onClick={handleAnalyze} disabled={isAnalyzing || selectedFiles.length === 0}>
          Analyze Exam Papers
        </button>
      </div>

      {/* Analysis Loading */}
      {isAnalyzing && (
        <div className="status-area">
          <p>🔍 Analyzing your papers... Please wait.</p>
        </div>
      )}

      {/* Results Display */}
      {!isAnalyzing && analysisResults && (
        <div className="results-area">
          <h3>Analysis Results for: {analysisResults.fileName}</h3>

          {/* Topic Breakdown */}
          <div className="topic-breakdown">
            <h4>Topic Coverage</h4>
            <ul>
              {analysisResults.topicBreakdown.map((item, idx) => (
                <li key={idx}>
                  {item.topic}: {item.percent}%
                </li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="suggestions">
            <h4>📌 Study Suggestions</h4>
            <ul>
              {analysisResults.suggestions.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            <strong>Disclaimer:</strong> These insights are based on uploaded exam papers only. Actual future exams may vary.
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamHelper;
