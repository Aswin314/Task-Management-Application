import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Task Management Application</h1>

        <p className="home-description">
          Organize your tasks, boost productivity, and manage your workflow
          efficiently.
        </p>

        <div className="home-buttons">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
