import React, { useState } from "react";

const Login = () => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState(''); 

  return (
    <div className="loginform">
      <h2>Login</h2>
      <form id="loginform">
        <label htmlFor="username">Email</label>
        <input type="text" id="username" value={username} onChange={(e)=> setusername(e.target.value)} required/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e)=> setpassword(e.target.value)} required/>
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default Login;