import React from "react";
import "./Login.css";

function Login () {
  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <div className="brand">HR Payroll</div>
          <h1>Login page</h1>
        </div>

        <div className="login-right">
          <div className="login-card">
            <h3>Login to your account</h3>

            <label>Employee ID</label>
            <input type="" placeholder="Enter your ID" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <div className="password-row">
              <label>Password</label>
              <span className="forgot">Forgot?</span>
            </div>
            <input type="password" placeholder="Enter your password" />

            <button className="login-btn">Login now</button>

            <p className="signup-text">
              Don’t have an account? <span>Sign up</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
