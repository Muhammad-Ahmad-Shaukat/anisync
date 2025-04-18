import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";
import Header from "./Header";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      alert("Login successful");
      navigate("/Login"); 
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header />
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="Email or Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading} id = "login-btn">
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="form-footer">
            <p>New to AniSync? <Link to={"/signup"}>Sign up now</Link></p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
