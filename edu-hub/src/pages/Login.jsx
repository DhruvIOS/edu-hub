import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
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

      <form onSubmit={handleLogin}>
        <input
          className="input-field"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="auth-submit-btn">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;