import React from "react";
import "./404Page.css";
import errorImage from "../../images/404error.svg"; 

const NotFoundPage = () => {
    return (
        <div className="notfound-wrapper">
          <div className="animated-dots-bg"></div>
          <div className="notfound-container">
            <div className="notfound-text">
              <h3>Awww... Don’t Cry.</h3>
              <h4>It's just a 404 Error!</h4>
              <h5>What you’re looking for may have been misplaced in Long Term Memory.</h5>
              <p>Server is dead.</p>
            </div>
            <div className="notfound-image">
              <img src={errorImage} alt="404 Error" />
            </div>
          </div>
        </div>
      );
    };
export default NotFoundPage;
