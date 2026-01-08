import { useEffect, useState } from "react";

const EmployeesOverviewData = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/hr/employees/overview", {
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
