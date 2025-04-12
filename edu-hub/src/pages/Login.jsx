import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultRole = searchParams.get("role") || "Student";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role}`);
    }
  }, [role, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate backend auth + role-based redirect
    setTimeout(() => {
      login(defaultRole); // updates AuthContext
      navigate(`/dashboard/${defaultRole}`);
      setLoading(false);
    }, 1000);
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

        <button type="submit" className="auth-submit-btn" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div className="login-footer">
        <p className="text-center">
          Don’t have an account?{" "}
          <a href={`/signup?role=${defaultRole}`} className="highlight-link">
            Sign Up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
