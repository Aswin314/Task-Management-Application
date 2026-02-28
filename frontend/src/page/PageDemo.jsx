import React from "react";
import { Link } from "react-router-dom";
const PageDemo = () => {
  return (
    <div>
      <header>Welcome To Task Management Application</header>
      <h2>Explore the features of our Task Management Application </h2>
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default PageDemo;
