import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import EmployeeData from "./Employee/EmployeeDashboard/EmployeeData.jsx";
let router = createBrowserRouter([
  {
    path:"/:empid",
    element:<EmployeeData/>
  }
])

function App() {
  return (
  <>
    <RouterProvider  router = {router}/>
    { <EmployeeData/> }
   </>
  );
}

export default App;
