import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";

function landing() {
  return (
    <div className="landing">
      <h1>Welcome to XYZ Library</h1>
      <Link to="/register">
        <div>
          <h3 className="register">Register</h3>
        </div>
      </Link>
      <Link to="/login">
        <div>
          <h3 className="register">Login</h3>
        </div>
      </Link>
    </div>
  );
}

export default landing;
