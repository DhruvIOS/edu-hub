import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper">
      <header className="home-nav">
        <div className="logo">&lt;Name.com&gt;</div>
        <div className="auth-links">
          <Link to="/login">Login</Link> | <Link to="/signup">Sign-Up</Link>
        </div>
      </header>

      <main className="home-main">
        <h1 className="welcome-text">Welcome to EDU-HUB</h1>

        <div className="home-grid">
          <div className="updates-box card">
            <h3>Major Updates</h3>
            <ul>
              <li>- Add student calendar</li>
              <li>- Add announcements posted by prof</li>
              <li>- Due dates</li>
            </ul>
          </div>

          <div className="right-buttons">
            <Link to="/ask" className="card clickable">
              – Ask TA
            </Link>
            <Link to="/exam-helper" className="card clickable">
              – Exam Help?
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
