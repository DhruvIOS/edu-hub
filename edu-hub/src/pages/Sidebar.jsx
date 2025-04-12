// src/Sidebar.jsx
import React, { useState } from "react";
 // Styles specific to the sidebar

function Sidebar({ onRegenerate, onAnalyze }) {
  const [hardness, setHardness] = useState(5);
  const [twistedness, setTwistedness] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("No file chosen");
    }
  };

  const handleRegenerateClick = () => {
    onRegenerate({ hardness, twistedness });
  };

  const handleAnalyzeClick = () => {
    onAnalyze(selectedFile);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h2>Adjust Parameters</h2>
        <p>
          Fine-tune the generated questions using the scales below (1 = Least,
          10 = Most).
        </p>

        <div className="slider-container">
          <label htmlFor="hardness">Hardness: {hardness}</label>
          <input
            type="range"
            id="hardness"
            name="hardness"
            min="1"
            max="10"
            value={hardness}
            onChange={(e) => setHardness(e.target.value)}
            className="slider"
          />
        </div>

        <div className="slider-container">
          <label htmlFor="twistedness">Twistedness: {twistedness}</label>
          <input
            type="range"
            id="twistedness"
            name="twistedness"
            min="1"
            max="10"
            value={twistedness}
            onChange={(e) => setTwistedness(e.target.value)}
            className="slider"
          />
        </div>

        <button className="btn btn-regenerate" onClick={handleRegenerateClick}>
          Regenerate
        </button>
      </div>

      <div className="sidebar-section">
        <h2>Upload Past Exam Paper</h2>
        <p>
          Upload your previous exam paper (e.g., PDF, DOCX). Our AI will analyze
          it to generate a new practice exam based on its content and style.
        </p>

        <div className="file-input-container">
          {/* Label acts as the visible button */}
          <label htmlFor="file-upload" className="btn btn-choose-file">
            Choose File
          </label>
          {/* Actual file input is hidden */}
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the default input visually
            accept=".pdf,.doc,.docx" // Optional: Specify accepted file types
          />
          {/* Display the chosen file name */}
          <span className="file-name">{fileName}</span>
        </div>

        <button className="btn btn-analyze" onClick={handleAnalyzeClick}>
          Analyze and Generate Exam
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
