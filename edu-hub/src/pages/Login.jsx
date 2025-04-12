import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [taProfEmail, setTaProfEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let role = "student";
    if (email.includes("prof")) role = "prof";
    else if (email.includes("ta")) role = "ta";

    login(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="dashboard login-box">
      <h2 className="text-center">EDU - HUB</h2>
      <p className="text-center orange-text">
        LOGIN with your college credentials!
      </p>

      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="email"
          placeholder="EMAIL"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="input-field ta-box"
          type="email"
          placeholder="Only for TA : Enter prof. email"
          value={taProfEmail}
          onChange={(e) => setTaProfEmail(e.target.value)}
        />

        <div className="arrow-btn-wrapper">
          <button type="submit" className="auth-submit-btn">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
