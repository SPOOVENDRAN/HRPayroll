import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

const AdminDashboardData = () => {

  /* -------------------- STATE -------------------- */
  const [overview, setOverview] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [hrUsers, setHrUsers] = useState([]);
  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  /* -------------------- FETCH ALL -------------------- */
  const fetchAll = async () => {
    try {
      const [o, e, h, a] = await Promise.all([
        fetch("http://localhost:8080/admin/dashboard/overview", { headers }),
        fetch("http://localhost:8080/admin/employees", { headers }),
        fetch("http://localhost:8080/admin/users/hr", { headers }),
        fetch("http://localhost:8080/admin/users/admin", { headers })
      ]);

      if (!o.ok || !e.ok || !h.ok || !a.ok) {
        throw new Error("Admin data fetch failed");
      }

      setOverview(await o.json());

      setEmployees(
        (await e.json()).map(emp => ({
          ...emp,
          status: emp.status || "INACTIVE",
          deleted: emp.deleted ?? false
        }))
      );

     setHrUsers(
  (await h.json()).map(u => ({
    id: u.id,
    empId: u.empId,
    email: u.email,
    role: "HR",
    status: u.active ? "ACTIVE" : "INACTIVE"
  }))
);

setAdmins(
  (await a.json()).map(u => ({
    id: u.id,
    empId: u.empId,
    email: u.email,
    role: "ADMIN",
    status: u.active ? "ACTIVE" : "INACTIVE"
  }))
);


      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Unauthorized");
      setLoading(false);
      return;
    }
    fetchAll();
  }, []);

  /* -------------------- ADD USER -------------------- */
  const addUser = async (payload) => {
    await fetch("http://localhost:8080/admin/users", {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });
    fetchAll();
  };

  /* -------------------- UPDATE EMPLOYEE -------------------- */
  const updateEmployee = async (id, payload) => {
    await fetch(`http://localhost:8080/admin/employees/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload)
    });
    fetchAll();
  };

  /* -------------------- TOGGLE STATUS -------------------- */
  const toggleEmployeeStatus = async (id, status) => {
    await fetch(
      `http://localhost:8080/admin/employees/${id}/status?status=${status}`,
      { method: "PUT", headers }
    );
    fetchAll();
  };

  /* -------------------- SOFT DELETE -------------------- */
  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:8080/admin/employees/${id}`, {
      method: "DELETE",
      headers
    });
    fetchAll();
  };
  const toggleHrStatus = async (id, active) => {
  await fetch(
    `http://localhost:8080/admin/users/${id}/status?active=${active}`,
    { method: "PUT", headers }
  );
  fetchAll();
};
const updateHrOrAdmin = async (id, payload) => {
  await fetch(`http://localhost:8080/admin/users/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload)
  });
  fetchAll();
};



  /* -------------------- UI STATES -------------------- */
  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  /* -------------------- PASS EVERYTHING -------------------- */

  return (
    <AdminDashboard
      overview={overview}
      employees={employees}
      hrUsers={hrUsers}
      admins={admins}
      onAddUser={addUser}
      onUpdateEmployee={updateEmployee}
      onToggleStatus={toggleEmployeeStatus}
      onDeleteEmployee={deleteEmployee}
      onToggleHrStatus={toggleHrStatus}
      onUpdateUser={updateHrOrAdmin}
    />
  );
};

export default AdminDashboardData;
