import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // UI control state
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const sendotp = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter email address");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Email verification failed");
        return;
      } else {
        alert("OTP sent to email");
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Email Verification Error:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyotp = async (e) => {
    e.preventDefault();
    if (!email || !otp) {
      alert("Please enter email and OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed");
      } else {
        alert("OTP verified successfully");
        setOtpVerified(true);
      }
    } catch (error) {
      console.error("OTP Verification Error:", error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup__container">
      <div className="signup__card">
        <h2 className="signup__title">Create Account</h2>
        <form className="signup__form" onSubmit={handleSubmit}>
          {/* Show inputs before OTP is sent */}
          {!otpSent && (
            <>
              <div className="signup__input-group">
                <input
                  type="text"
                  className="signup__input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="signup__input-group">
                <input
                  type="email"
                  className="signup__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="signup__input-group">
                <input
                  type="password"
                  className="signup__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="signup__otp-container">
                <button
                  className="signup__otp-btn"
                  onClick={sendotp}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </>
          )}

          {/* OTP input visible after sending OTP and before verifying */}
          {otpSent && !otpVerified && (
            <div className="signup__otp-container">
              <input
                type="text"
                className="signup__otp-input"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button
                className="signup__otp-verify-btn"
                onClick={verifyotp}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          )}

          {/* Final Sign Up Button after OTP is verified */}
          {otpVerified && (
            <div className="btndiv">
              <button
                className="signup__submit-btn"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          )}

          <p className="signup__footer">
            Already have an account?{" "}
            <Link to={"/login"} className="signup__login-link">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
