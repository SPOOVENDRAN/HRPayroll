import { useState } from "react";
import "./HrLayout.css";
import Dashboard from "../Dashboard/Dashboard";
import Employees from "../Employees/Employees";
import AttendanceAndLeaves from "../AttendanceAndLeaves/AttendanceAndLeaves";
import Payroll from "../Payroll/Payroll";
import Holidays from "../Holidays/Holidays";

const HrLayout = () => {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    employees: <Employees />,
    attendenceandleaves: <AttendanceAndLeaves/>,
    payroll: <Payroll />,
    holidays: <Holidays />
  };

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "employees", label: "Employees" },
    { key: "attendenceandleaves", label: "Attendence And Leaves" },
    { key: "payroll", label: "Payroll" },
    { key: "holidays", label: "Holidays" }
  ];

  return (
    <div className="hr-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>HR Payroll</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.key} className={page === item.key ? "active" : ""} onClick={() => setPage(item.key)} >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        <header className="topbar">
          <span>HR User</span>
          <button>Logout</button>
        </header>

        {pages[page]}
      </main>
    </div>
  );
};

export default HrLayout;
