import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css"; 

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Signup successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username"required />
          </div>
          
          <div className="input-group">
         
            <input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"required />
          </div>

          <div className="input-group">
          
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"required />
          </div>

          <button id="signup-btn" type="submit">Sign Up</button>

          <p className="signup-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
