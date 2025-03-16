import React, { useState } from "react";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      } else {
        alert("Login successful");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="loginform">
      <h2>Login</h2>
      <form id="loginform" onSubmit={handleLogin}>
        <label htmlFor="username">Email</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;