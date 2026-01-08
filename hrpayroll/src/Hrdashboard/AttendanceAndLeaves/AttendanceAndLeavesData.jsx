import { useEffect, useState } from "react";
import AttendanceAndLeaves from "./AttendanceAndLeaves";

const AttendanceAndLeavesData = () => {


  const [attendanceStats, setAttendanceStats] = useState(null);
  const [dailyAttendance, setDailyAttendance] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  /* ===============================
     FETCH ALL DATA
  =============================== */
  const fetchAll = async () => {
    try {
      setLoading(true);

      /* 1️⃣ Attendance Summary */
      const summaryRes = await fetch(
        "http://localhost:8080/hr/attendance/summary",
        { headers }
      );
      const summary = await summaryRes.json();

      setAttendanceStats({
        total: summary.totalEmployees ?? 0,
        present: summary.present ?? 0,
        absent: summary.absent ?? 0,
        onLeave: summary.onLeave ?? 0,
        late: summary.lateArrivals ?? 0,
        overtime: summary.overtimeHours ?? 0,
      });

      /* 2️⃣ Daily Attendance */
      const dailyRes = await fetch(
        "http://localhost:8080/hr/attendance/daily",
        { headers }
      );
      const daily = await dailyRes.json();

     setDailyAttendance(
  daily.map((d, index) => ({
    id: d.id ?? index,
    empId: d.empid,
    employee: d.employeeName ?? d.empid ?? "Unknown",
    department: d.department ?? "UNKNOWN",
    status: (d.status ?? "ABSENT").toUpperCase(),
    checkIn: d.hoursWorked > 0 ? "09:00 AM" : "-",
    checkOut: d.hoursWorked > 0 ? "06:00 PM" : "-",
    hours: d.hoursWorked ?? 0,
    date: d.date ? new Date(d.date) : null,
  }))
);



      /* 3️⃣ Pending Leaves */
      const leaveRes = await fetch(
        "http://localhost:8080/hr/leaves/pending",
        { headers }
      );
      const leaves = await leaveRes.json();

      setLeaveRequests(
        leaves.map(l => ({
          id: l.id,
          employee: l.empid,
          type: l.leaveType,
          from: l.fromDate,
          to: l.toDate,
          days: l.days,
          status: l.status?.toUpperCase(),
        }))
      );

    } catch (err) {
      console.error("HR Attendance fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     APPROVE / REJECT LEAVE
  =============================== */
  const updateLeaveStatus = async (id, action) => {
    await fetch(
      `http://localhost:8080/hr/leaves/${id}/${action}`,
      { method: "PUT", headers }
    );
    fetchAll(); // refresh UI after DB update
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (loading) return <div>Loading attendance...</div>;

  return (
    <AttendanceAndLeaves
      attendanceStats={attendanceStats}
      dailyAttendance={dailyAttendance}
      leaveRequests={leaveRequests}
      updateLeaveStatus={updateLeaveStatus}
      refresh={fetchAll}
    />
  );
};

export default AttendanceAndLeavesData;
