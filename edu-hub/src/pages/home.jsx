import { Link } from "react-router-dom";

const Home = () => {
  return (
<div className="home-wrapper">
      <main className="home-main landing">
        <h1 className="landing-brand">&lt;EDU-HUB&gt;</h1>
        <p className="landing-subtext">
          Instant TA help, AI-powered tools, and smart study plans — all in one hub.
        </p>

        <div className="cta-buttons">
        <Link to="/login?role=student" className="cta-btn green">🎓 I’m a Student</Link>
        <Link to="/login?role=ta" className="cta-btn dark-green">🧑‍🏫 I’m a TA</Link>
        <Link to="/login?role=prof" className="cta-btn ta-green">👨‍🏫 I’m a Professor</Link>
        </div>

        <div className="features-card">
          <h3 className="features-title">Why EDU-HUB?</h3>
          <ul className="features-list">
            <li>✅ Ask TAs questions in real-time</li>
            <li>✅ Upload exams & get personalized study plans</li>
            <li>✅ Practice with AI-generated questions</li>
          </ul>

          <Link to="/exam-helper" className="cta-btn ghost">
            🚀 Try EDU AI Now
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
