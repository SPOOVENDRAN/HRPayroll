import { Navigate, useParams } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const loggedEmpId = localStorage.getItem("empId");

  const params = useParams();
  const urlEmpId = params.empid;

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ❌ Role mismatch
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  // ❌ Employee trying to access another employee’s URL
  if (userRole === "EMPLOYEE" && urlEmpId && urlEmpId !== loggedEmpId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
