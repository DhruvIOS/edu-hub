import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

const SignUp = () => {
  const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Student");
    const [isVisible, setVisible] = useState(false);

    const handleDropDownChange = (value) =>{

        setVisible(value === "TA")
        
    }

    const handleSingup = async(e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const idToken = await userCredential.user.getIdToken();

            //Send user data to backend

            await fetch ("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   firstName, lastName, email, role, password,token: idToken}),
            }) .then((response) => response.json())
            .then((data) => {
              

                alert(data.message)
            })
            .catch((error) => {
                console.error(error);
            });

          

           
        } catch (error) {
            console.error("Error creating user:", error)
            alert(error)
        }
    };

  return (
    <div className="dashboard login-box">
      <h2 className="text-center">Sign Up to EDU-HUB</h2>

      <form onSubmit={handleSingup}>
        <label>Select your role:</label>
        <select
          className="input-field"
          value={role}
          onChange={(e) => {setRole(e.target.value); handleDropDownChange(e.target.value)}}
        >
          <option value="student">Student</option>
          <option value="ta">Teaching Assistant (TA)</option>
          <option value="prof">Professor</option>
        </select>

        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} required />
        <input
          className="input-field"
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required
        />

        {role === "ta" && (
          <input
            className="input-field ta-box"
            type="email"
            placeholder="Enter professor's email (required for TAs)"
            value={profEmail}
            onChange={(e) => setProfEmail(e.target.value)}
            required
          />
        )}

        <div className="arrow-btn-wrapper">
          <button type="submit" className="auth-submit-btn">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
