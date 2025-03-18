import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/SignUp.css"; 

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendotp = async (e) => {
    e.preventDefault();
    if (!email){
      alert("Please enter email address");
      return;
    }
    try{
      const response = await fetch("http://localhost:5000/api/auth/sendotp",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if(!response.ok){
        alert(data.message || "Email verification failed");
        return;
      }
      else{
        alert("OTP sent to email");
      }
    }catch(error){
      console.error("Email Verification Error:", error.message);
      alert(error);
    }
  };

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

  const verifyEmail = async (e) => {
    e.preventDefault();
    if (email === null || email === "") {
      alert("Please enter email address");
      return;
    }
    try{
      const response = await fetch ("http://localhost:5000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Email verification failed");
      }else{
        alert("OTP SENT TO EMAIL");
      }
    }catch(error){
      console.error("Email Verification Error:", error.message);
      alert(error.message);
    }

  }

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

          <button id="otp-button" onClick={sendotp}>Verify Email</button>
          <input type="text" placeholder="Enter OTP" id="otp-text"/>
          <button id="otp-verify" onClick={verifyEmail}>Verify OTP</button>

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