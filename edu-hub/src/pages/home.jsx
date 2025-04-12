import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper">
      <main className="home-main">
        <h1 className="welcome-text">Welcome to EDU-HUB</h1>

        <div className="home-grid">
          <div className="card updates-box">
            <h3>EDU Tools</h3>
            <div className="tool-buttons">
              <Link to="/ask" className="tool-btn">🧑‍🏫 Ask a TA</Link>
              <Link to="/exam-helper" className="tool-btn">📘 Exam Helper</Link>
            </div>
          </div>


        </div>
      </main>
    </div>
  );
};

export default Home;