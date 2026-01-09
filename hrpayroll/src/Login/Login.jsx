import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

function Login() {

  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  window.alert(`${"Employee Sign In - Mail - firstName.lastName@company.com(arun.kumar@company.com) Password - password@123 HR Sign In - HR - hr@company.com password - password@123 Admin Sign In - admin@company.com password - password@123"}`)
  const handleLogin = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        alert("Invalid login");
        return;
      }

      const data = await res.json();

      // 🔐 STORE AUTH DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("empId", data.empId);

      // 🚀 ROLE + EMPID BASED REDIRECT
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else if (data.role === "HR") {
        navigate("/hr");
      } else {
        // ✅ EMPLOYEE → OWN DASHBOARD ONLY
        navigate(`/employee/${data.empId}`);
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

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

            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={handleLogin}>
              Login now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
