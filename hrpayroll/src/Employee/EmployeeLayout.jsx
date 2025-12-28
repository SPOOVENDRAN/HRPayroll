import { useState } from "react";
import "./EmployeeLayout.css";

import EmployeeDashboard from "./EmployeeDashoard/EmployeeDashboard";
import EmployeeLeaves from "./EmployeeLeave/EmployeeLeaves";
import EmployeeSalary from "./EmployeeSalary/EmployeeSalary";

const EmployeeLayout = () => {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <EmployeeDashboard />,
    leaves: <EmployeeLeaves />,
    salary: <EmployeeSalary />
  };

  return (
    <div className="employee-container">
      {/* SIDEBAR */}
      <aside className="employee-sidebar">
        <h2>Employee Portal</h2>
        <ul>
          <li
            className={page === "dashboard" ? "active" : ""}
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={page === "leaves" ? "active" : ""}
            onClick={() => setPage("leaves")}
          >
            Leaves
          </li>
          <li
            className={page === "salary" ? "active" : ""}
            onClick={() => setPage("salary")}
          >
            Salary
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="employee-main">
        <header className="employee-topbar">
          <span>Employee</span>
          <button>Logout</button>
        </header>

        {pages[page]}
      </main>
    </div>
  );
};

export default EmployeeLayout;
