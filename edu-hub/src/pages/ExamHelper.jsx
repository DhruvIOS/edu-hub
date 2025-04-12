import { useState } from "react";

const ExamHelper = () => {
  const [file, setFile] = useState(null);
  const [plan, setPlan] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPlan("");
  };

  const handleGeneratePlan = () => {
    if (!file) return;

    // Simulated AI-generated plan
    setPlan(`
📘 Study Plan Generated for: ${file.name}

🔍 Step 1: Scan your uploaded exam paper for repeated questions.

📚 Step 2: Review theory-heavy sections from past questions.

🧠 Step 3: Prioritize weak areas with low score confidence.

📝 Step 4: Practice 5 MCQs and 2 short answers per day.

📅 Step 5: Allocate time slots using EDU-HUB’s smart calendar.

💡 Tip: Use EDU AI for custom practice sets on your weak topics.
    `);
  };

  return (
    <div className="dashboard">
      <h2>📂 Exam Helper</h2>
      <p>Upload a past exam to receive a personalized AI-powered study plan.</p>

      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx"
        className="input-field"
      />
      {file && (
        <p>
          <strong>Uploaded:</strong> {file.name}
        </p>
      )}

      <button onClick={handleGeneratePlan} disabled={!file}>
        Generate Study Plan
      </button>

      {plan && (
        <div className="card mt-20">
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
};

export default ExamHelper;
