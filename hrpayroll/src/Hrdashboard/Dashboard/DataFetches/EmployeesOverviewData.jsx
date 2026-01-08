import { useEffect, useState } from "react";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const EmployeesOverviewData = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_API_URL}/hr/employees/overview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  }, []);

  return children(employees);
};

export default EmployeesOverviewData;
