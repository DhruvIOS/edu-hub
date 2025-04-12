import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profEmail, setProfEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="dashboard login-box">
      <h2 className="text-center">Sign Up to EDU-HUB</h2>

      <form onSubmit={handleSubmit}>
        <label>Select your role:</label>
        <select
          className="input-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="ta">Teaching Assistant (TA)</option>
          <option value="prof">Professor</option>
        </select>

        <input
          className="input-field"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {role === "ta" && (
          <input
            className="input-field ta-box"
            type="email"
            placeholder="Enter professor's email"
            value={profEmail}
            onChange={(e) => setProfEmail(e.target.value)}
            required
          />
        )}

        <button type="submit" className="auth-submit-btn">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
