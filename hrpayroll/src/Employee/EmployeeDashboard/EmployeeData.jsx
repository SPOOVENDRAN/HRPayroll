import EmployeeDashboard from "./EmployeeDashboard";
import { useState, useEffect } from "react";

function EmployeeData() {

  const [employeeDetail, setEmployeeDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No JWT token found");
      return;
    }

    fetch("http://localhost:8080/employee/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔐 JWT ONLY SOURCE
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized or error fetching dashboard");
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeDetails(data);
      })
      .catch((e) => {
        console.error("Dashboard fetch error:", e);
      });

  }, []); // ✅ NO empid dependency

  if (!employeeDetail) {
    return <div>Loading employee data...</div>;
  }

  const employeeData = employeeDetail.employee;

  return (
    <EmployeeDashboard
      name={employeeData.name}
      designation={employeeData.designation}
      employeeId={employeeData.empid}
      email={employeeData.email}
      phone={employeeData.phone}
      department={employeeData.department}
      manager={employeeData.manager}
      location={employeeData.location}
      joiningDate={employeeData.joiningDate}
      employmentType={employeeData.employmentType}
      yearsOfService={employeeData.experience}
      projects={employeeData.total_projects}
      overtime={employeeDetail.overtimeHours}
      salary={employeeDetail.lastMonthSalary}
      upcomingHolidays={2}
      pendingRequests={employeeDetail.pendingRequests}
      leaveBalance={employeeDetail.leaveBalance}
      goalAchievement={employeeDetail.goalAchievement}
      presentDays={employeeDetail.presentDays}
      productivity={employeeDetail.productivity}
      salaryMonth={employeeDetail.salaryMonth}
      totalDays={employeeDetail.totalDays}
    />
  );
}

export default EmployeeData;
