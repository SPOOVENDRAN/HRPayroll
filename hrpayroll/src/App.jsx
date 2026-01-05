import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./Login/Login.jsx";

import EmployeeLayout from "./Employee/Layout/EmployeeLayout.jsx";
import EmployeeData from "./Employee/EmployeeDashboard/EmployeeData.jsx";
import EmployeeLeavesData from "./Employee/EmployeeLeave/EmployeeLeavesData.jsx";
import EmployeeSalaryData from "./Employee/EmployeeSalary/EmployessSalaryData.jsx";

import Hrlayout from "./Hrdashboard/Layout/Hrlayout.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";

const router = createBrowserRouter([
  // 🔐 LOGIN
  {
    path: "/",
    element: <Login />,
  },

  // 🧑‍💼 EMPLOYEE
  {
    path: "/employee/:empid",
    element: <EmployeeLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <EmployeeData />,
      },
      {
        path: "leaves",
        element: <EmployeeLeavesData />,
      },
      {
        path: "salary",
        element: <EmployeeSalaryData />,
      },
    ],
  },

  // 👨‍💼 HR
  {
    path: "/hr",
    element: <Hrlayout />,
  },

  // 🛡 ADMIN
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
