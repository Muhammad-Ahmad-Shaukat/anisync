import React, { useEffect, useState } from "react";
import "./404Page.css";
import errorImage from "../../images/ServerCrash.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/NavBar/Navbar";
import Footer from "../../components/Footer/Footer";

const ServerCrash = ({ setServerOn }) => {
  const [checking, setChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  const checkServer = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/health");
      console.log("Server is up and running!", response);
      setServerOn(true); // Notify App to re-render main UI
    } catch (err) {
      console.error("Server is still down:", err);
      setChecking(false); // Show retry button
    }
  };

  useEffect(() => {
    checkServer(); // Run immediately on mount

    const interval = setInterval(() => {
      setRetryCount((prev) => prev + 1);
      checkServer();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="notfound-wrapper">
        <div className="animated-dots-bg"></div>
        <div className="notfound-container">
          <div className="notfound-text">
            <h3>Awww... Don’t Cry.</h3>
            <h4>It's just a 404 Error!</h4>
            <h5>Looks like the server went to sleep...</h5>
            <p>Retry attempt: {retryCount}</p>

            {checking ? (
              <div className="spinner"></div>
            ) : (
              <button onClick={checkServer} className="retry-btn">
                Try Now
              </button>
            )}
          </div>
          <div className="notfound-image">
            <img src={errorImage} alt="Server Crash" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServerCrash;
