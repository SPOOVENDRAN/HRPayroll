import { useEffect, useState } from "react";
import Employees from "./Employees";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const HrEmployeesData = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size] = useState(4);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `${BASE_API_URL}/hr/employees?page=${page}&size=${size}&sortBy=id&sortDir=asc`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch employees");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data.content || []);
        setTotalPages(data.totalPages || 0);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Employee fetch error:", err);
        setLoading(false);
      });
  }, [page, size]); // ✅ page change triggers API

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading employees...</div>;
  }

  return (
    <Employees
      employees={employees}
      page={page}
      totalPages={totalPages}
      onPrev={() => setPage((p) => Math.max(p - 1, 0))}
      onNext={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
    />
  );
};

export default HrEmployeesData;
