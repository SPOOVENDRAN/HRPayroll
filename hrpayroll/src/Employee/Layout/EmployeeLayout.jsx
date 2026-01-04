import { useState } from "react";
import "./EmployeeLayout.css";

import EmployeeData from "../EmployeeDashboard/EmployeeData";
import EmployeeLeavesData from "../EmployeeLeave/EmployeeLeavesData";
import EmployeeSalaryData from "../EmployeeSalary/EmployessSalaryData";

const EmployeeLayout = () => {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <EmployeeData />,
    leaves: <EmployeeLeavesData  />,
    salary: <EmployeeSalaryData/>
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
          <li className="employee-logout">
            Logout
          </li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="employee-main">
        {pages[page]}
      </main>
    </div>
  );
};

export default EmployeeLayout;
