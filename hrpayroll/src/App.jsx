import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Login from "./Login/Login.jsx";

import EmployeeLayout from "./Employee/Layout/EmployeeLayout.jsx";
import EmployeeData from "./Employee/EmployeeDashboard/EmployeeData.jsx";
import EmployeeLeavesData from "./Employee/EmployeeLeave/EmployeeLeavesData.jsx";
import EmployeeSalaryData from "./Employee/EmployeeSalary/EmployessSalaryData.jsx";

import Hrlayout from "./Hrdashboard/Layout/Hrlayout.jsx";
import AdminDashboardData from "./admin/AdminDashboardData.jsx";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";

const router = createBrowserRouter([
  // 🔐 LOGIN (PUBLIC)
  {
    path: "/",
    element: <Login />,
  },

  // 🧑‍💼 EMPLOYEE (PROTECTED)
  {
    path: "/employee/:empid",
    element: (
      <ProtectedRoute role="EMPLOYEE">
        <EmployeeLayout />
      </ProtectedRoute>
    ),
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

  // 👨‍💼 HR (PROTECTED)
  {
    path: "/hr",
    element: (
      <ProtectedRoute role="HR">
        <Hrlayout />
      </ProtectedRoute>
    ),
  },

  // 🛡 ADMIN (PROTECTED)
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminDashboardData />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
