import { useState } from "react";
import "./HrLayout.css";
import Employees from "../Employees/Employees";
import AttendanceAndLeaves from "../AttendanceAndLeaves/AttendanceAndLeaves";
import Payroll from "../Payroll/Payroll";
import Holidays from "../Holidays/Holidays";
import HrDashboardData from "../Dashboard/DataFetches/HrDashboardData";
import { useNavigate } from "react-router-dom";
import HrEmployeesData from "../Employees/HrEmployeesData";
import AttendanceAndLeavesData from "../AttendanceAndLeaves/AttendanceAndLeavesData";
import PayrollData from "../Payroll/PayrollData";


const HrLayout = () => {
   const navigate = useNavigate(); 
    const handleLogout = () => {
      localStorage.clear();   // ✅ clear JWT, role, empId
      navigate("/", { replace: true });
    };
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <HrDashboardData/>,
    employees: <HrEmployeesData />,
    attendenceandleaves: <AttendanceAndLeavesData/>,
    payroll: <PayrollData />,
    holidays: <Holidays/>
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
         <button onClick={handleLogout} className="hr-logout"> Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">
        

        {pages[page]}
      </main>
    </div>
  );
};

export default HrLayout;
