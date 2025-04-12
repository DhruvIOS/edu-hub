// src/ExamCreator.jsx
import React, { useState } from "react"; // Import useState
import Sidebar from "./Sidebar"; // Assuming Sidebar is in the same directory
import ExamDisplay from "./ExamDisplay"; // Assuming ExamDisplay is in the same directory
// import "s"; // Styles for this component

function ExamCreator() {
  // State to track if the exam has been generated/displayed
  const [isExamGenerated, setIsExamGenerated] = useState(false);

  // Corrected placeholder data with options defined inline
  const examData = [
    {
      id: 1,
      question: "What is the primary function of the mitochondria?",
      // Define options directly inside the object
      options: [
        { id: "a", text: "Protein synthesis" },
        { id: "b", text: "Photosynthesis" },
        { id: "c", text: "Cellular respiration" },
        { id: "d", text: "Waste disposal" },
      ],
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      // Define options directly inside the object
      options: [
        { id: "a", text: "Earth" },
        { id: "b", text: "Mars" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Saturn" },
      ],
    },
    // Add more questions here if needed following the same structure
  ];

  // Handler functions
  const handleRegenerate = (params) => {
    console.log("Regenerating with params:", params);
    // Add actual regeneration logic here if needed
    // For now, assume regeneration might show the exam display too
    setIsExamGenerated(true); // Show exam display on regenerate
  };

  const handleAnalyze = (file) => {
    console.log("Analyzing file:", file ? file.name : "No file");
    if (file) {
      // Simulate analysis/generation delay (optional)
      console.log("Simulating analysis...");
      setTimeout(() => {
        console.log("Analysis complete. Generating exam...");
        // Add actual analysis and generation logic here
        // This logic might update the 'examData' state in a real app
        // ...

        // Set state to true to trigger layout change
        setIsExamGenerated(true);
        console.log("Exam generated, updating layout.");
      }, 1500); // Simulate 1.5 second delay
    } else {
      console.log("No file selected to analyze.");
      // Optionally provide user feedback here (e.g., using an alert or a message state)
      // alert("Please choose a file first!");
    }
  };

  const handleDownload = () => {
    console.log("Downloading paper...");
    // Add download logic here
  };

  const handleShare = () => {
    console.log("Sharing paper...");
    // Add sharing logic here
  };

  console.log("ExamCreator rendering. isExamGenerated:", isExamGenerated);

  return (
    // Dynamically set the container class based on the state
    <div
      className={`exam-creator-container ${
        isExamGenerated ? "generated-view" : "initial-view"
      }`}
    >
      {/* Sidebar is always rendered, but its container style changes via CSS */}
      <Sidebar
        onRegenerate={handleRegenerate}
        onAnalyze={handleAnalyze} // Pass the modified handler
      />

      {/* Conditionally apply 'hidden' class to wrapper for smooth transitions */}
      <div
        className={`exam-display-wrapper ${!isExamGenerated ? "hidden" : ""}`}
      >
        <ExamDisplay
          examData={examData} // Pass the exam data
          onDownload={handleDownload}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}

export default ExamCreator;
