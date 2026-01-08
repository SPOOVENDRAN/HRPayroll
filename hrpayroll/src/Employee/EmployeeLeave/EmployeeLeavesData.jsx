import { useEffect, useState } from "react";
import EmployeeLeaves from "./EmployeeLeaves";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

function EmployeeLeavesData() {

  const [leavesData, setLeavesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`${BASE_API_URL}/employee/leaves`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch leaves");
        }
        return res.json();
      })
      .then(data => {
        setLeavesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLeavesData(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (loading) return <div>Loading leaves...</div>;
  if (!leavesData) return <div>No leave data</div>;

  // ✅ SAFE NORMALIZATION (NO CRASH)
  const normalizedLeaveHistory = Array.isArray(leavesData.leaveHistory)
    ? leavesData.leaveHistory.map(l => ({
        id: l.id,
        from: l.fromDate,
        to: l.toDate,
        type: l.leaveType + " Leave",
        days: l.days,
        status:
          l.status.charAt(0) + l.status.slice(1).toLowerCase(),
        reason: l.reason,
        appliedOn: l.appliedDate,
      }))
    : [];

  return (
    <EmployeeLeaves
      leaveBalances={leavesData.leaveBalances}
      leaveApplications={normalizedLeaveHistory}
      totalApplications={leavesData.totalApplications}
      approvedLeaves={leavesData.approvedLeaves}
      pendingLeavesCount={leavesData.pendingLeaves}
      totalDaysTaken={leavesData.totalDaysTaken}
      refreshLeaves={fetchLeaves}
    />
  );
}

export default EmployeeLeavesData;
