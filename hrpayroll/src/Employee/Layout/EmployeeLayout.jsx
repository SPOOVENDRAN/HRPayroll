import { NavLink, Outlet, useParams } from "react-router-dom";
import "./EmployeeLayout.css";

const EmployeeLayout = () => {
  const { empid } = useParams();

  return (
    <div className="employee-container">
      {/* SIDEBAR */}
      <aside className="employee-sidebar">
        <h2>Employee Portal</h2>
        <ul>
          <li>
            <NavLink
              to={`/employee/${empid}/dashboard`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/employee/${empid}/leaves`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Leaves
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/employee/${empid}/salary`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Salary
            </NavLink>
          </li>

          <li className="employee-logout">Logout</li>
        </ul>
      </aside>

      {/* MAIN */}
      <main className="employee-main">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeLayout;
