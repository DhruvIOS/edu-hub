// src/ExamDisplay.jsx
import React from "react";
 // Changed './' to '../' // Import the styles for this component

// Define component using Arrow Function syntax
const ExamDisplay = ({ examData, onDownload, onShare }) => {
  return (
    <main className="exam-display">
      <h1>Your New Practice Exam</h1>

      <section>
        <h2>Section A: Multiple Choice</h2>
        {/* Map over the exam data array to display each question */}
        {examData.map((item, index) => (
          <div key={item.id} className="question-block">
            <p className="question-text">
              {index + 1}. {item.question}
            </p>
            {/* Map over the options for the current question */}
            <ul className="options-list">
              {item.options.map((option) => (
                <li key={option.id}>
                  {option.id}) {option.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Action buttons at the bottom */}
      <div className="action-buttons">
        <button className="btn btn-download" onClick={onDownload}>
          Download Paper
        </button>
        <button className="btn btn-share" onClick={onShare}>
          Share
        </button>
      </div>
    </main>
  );
}; // End of arrow function component definition

export default ExamDisplay;