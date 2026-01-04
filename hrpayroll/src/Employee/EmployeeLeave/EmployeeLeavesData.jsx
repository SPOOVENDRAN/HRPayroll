import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeLeaves from "./EmployeeLeaves";

function EmployeeLeavesData() {
  const { empid } = useParams();
  const [leavesData, setLeavesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = () => {
    setLoading(true);
    fetch(`http://localhost:8080/employee/leaves?empid=${empid}`)
      .then(res => res.json())
      .then(data => {
        setLeavesData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchLeaves();
  }, [empid]);

  if (loading) return <div>Loading leaves...</div>;
  if (!leavesData) return <div>No leave data</div>;

  // ✅ Normalize backend data (VERY IMPORTANT)
  const normalizedLeaveHistory = leavesData.leaveHistory.map(l => ({
    id: l.id,
    from: l.fromDate,
    to: l.toDate,
    type: l.leaveType + " Leave",
    days: l.days,
    status: l.status.charAt(0) + l.status.slice(1).toLowerCase(), // Pending / Approved
    reason: l.reason,
    appliedOn: l.appliedDate
  }));

  return (
    <EmployeeLeaves
      empid={empid}
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
