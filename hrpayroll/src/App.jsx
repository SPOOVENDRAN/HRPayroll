import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import EmployeeLayout from "./Employee/Layout/EmployeeLayout.jsx";
import EmployeeData from "./Employee/EmployeeDashboard/EmployeeData.jsx";
import EmployeeLeavesData from "./Employee/EmployeeLeave/EmployeeLeavesData.jsx";
import EmployeeSalaryData from "./Employee/EmployeeSalary/EmployessSalaryData.jsx";
import Hrlayout from "./Hrdashboard/Layout/Hrlayout.jsx"
const router = createBrowserRouter([
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
]);

function App() {
   return <RouterProvider router={router} />;
  // return <Hrlayout/>
}

export default App;
