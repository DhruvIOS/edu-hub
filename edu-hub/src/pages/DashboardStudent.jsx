import { Link } from "react-router-dom";
import "../styles.css"; 
import { useAuth } from "../context/AuthContext";
import { ExamCreator } from "./ExamCreator"


const DashboardStudent = () => {
  const { firstName } = useAuth();

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>🎓 Welcome {firstName}</h1>
        <p>Everything you need to succeed — powered by EDU-HUB.</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/ask" className="dashboard-card">
          <div className="card-icon">💬</div>
          <h3>Ask a TA</h3>
          <p>Get instant help from a real teaching assistant.</p>
        </Link>

        <Link to="/exam-helper" className="dashboard-card">
          <div className="card-icon">📘</div>
          <h3>Exam Helper</h3>
          <p>Upload your exam and get a smart, AI-powered study plan.</p>
        </Link>

    

        <Link to="/practice-generator" className="dashboard-card">
          <div className="card-icon">📝</div>
          {/* <ExamDisplay /> */}
          <h3>Practice Generator</h3>
          <p>Get MCQs & short answers for fast self-testing.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardStudent;
