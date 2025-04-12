import { useAuth } from "../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const { login, role } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultRole = searchParams.get("role") || "Student";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roleName, setRole] = useState("");

  const auth = getAuth();
  

  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role}`);
    }
  }, [role, navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const firebaseUser = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await firebaseUser.user.getIdToken();
  
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
  
      setFirstName(data.user.firstName)
      setLastName(data.user.lastName)
      setRole(data.user.role)

      login(data.user.role); // AuthContext role update
      navigate(`/dashboard/${data.user.role}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
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
