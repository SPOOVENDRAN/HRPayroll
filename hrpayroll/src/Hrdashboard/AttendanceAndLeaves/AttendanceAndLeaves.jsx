import { useState } from "react";
import "./AttendanceAndLeaves.css";


const AttendanceAndLeaves = ({
  attendanceStats,
  dailyAttendance,
  leaveRequests,
  updateLeaveStatus,
  refresh,
}) => {
  // ===== MODAL STATES =====

const [showViewModal, setShowViewModal] = useState(false);
const [selectedLeave, setSelectedLeave] = useState(null);
const leaveStats = {
  pending: leaveRequests.filter(l => l.status === "PENDING").length,
  approved: leaveRequests.filter(l => l.status === "APPROVED").length,
  rejected: leaveRequests.filter(l => l.status === "REJECTED").length,
  total: leaveRequests.length,
};


  if (!attendanceStats) {
  return <div style={{ padding: "20px" }}>Loading attendance...</div>;
}
// ✅ HANDLE APPROVE / REJECT ACTION
const handleLeaveAction = async (id, action) => {
  try {
    await updateLeaveStatus(id, action.toLowerCase());
  } catch (err) {
    console.error("Leave action failed", err);
  }
};


  const [activeTab, setActiveTab] = useState("attendance");
  const [dateFilter, setDateFilter] = useState("today");

// 1️⃣ FILTER ATTENDANCE FIRST
const today = new Date();
today.setHours(0, 0, 0, 0);

const filteredAttendance = dailyAttendance.filter(rec => {
  if (!rec.date) return false;

  const recDate = new Date(rec.date);
  recDate.setHours(0, 0, 0, 0);

  if (dateFilter === "today") {
    return recDate.getTime() === today.getTime();
  }

  if (dateFilter === "week") {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);
    return recDate >= weekAgo && recDate <= today;
  }

  if (dateFilter === "month") {
    return (
      recDate.getMonth() === today.getMonth() &&
      recDate.getFullYear() === today.getFullYear()
    );
  }

  return true;
});


// 2️⃣ NOW derive summary values (AFTER filteredAttendance exists)
const workedRecords = filteredAttendance.filter(r => r.hours > 0);

const avgWorkHours =
  workedRecords.length > 0
    ? (
        workedRecords.reduce((sum, r) => sum + r.hours, 0) /
        workedRecords.length
      ).toFixed(1)
    : 0;

const earlyDepartures =
  workedRecords.filter(r => r.hours > 0 && r.hours < 8).length;




  const total = attendanceStats.total || 0;

const presentPercentage =
  total > 0 ? ((attendanceStats.present / total) * 100).toFixed(1) : 0;

const leavePercentage =
  total > 0 ? ((attendanceStats.onLeave / total) * 100).toFixed(1) : 0;

const absentPercentage =
  total > 0 ? ((attendanceStats.absent / total) * 100).toFixed(1) : 0;

  // Status badge
const getStatusBadge = (status) => {
  const s = (status || "").toUpperCase();

  switch (s) {
    case "PRESENT":
      return <span className="badge status-present">Present</span>;
    case "ABSENT":
      return <span className="badge status-absent">Absent</span>;
    case "LEAVE":
      return <span className="badge status-leave">Leave</span>;
    case "LATE":
      return <span className="badge status-late">Late</span>;
    case "PENDING":
      return <span className="badge status-pending">Pending</span>;
    case "APPROVED":
      return <span className="badge status-approved">Approved</span>;
    case "REJECTED":
      return <span className="badge status-rejected">Rejected</span>;
    default:
      return <span className="badge">-</span>;
  }
};



  // Leave type badge
  const getLeaveTypeBadge = (type) => {
    switch (type) {
      case "Sick Leave": return <span className="leave-type sick">SL</span>;
      case "Casual Leave": return <span className="leave-type casual">CL</span>;
      case "Personal Leave": return <span className="leave-type personal">PL</span>;
      case "Vacation": return <span className="leave-type vacation">VL</span>;
      default: return <span className="leave-type">-</span>;
    }
  };
  return (
    <div className="main">
    <div className="attendance-leaves-container">
      {/* Page Header */}
      <div className="page-header">
        <h2>Attendance & Leaves</h2>
        <div className="header-controls">
          <div className="date-filter">
            <select 
              className="date-select"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              
            </select>
          </div>
          <div className="tab-switcher">
            <button 
              className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
              onClick={() => setActiveTab('attendance')}
            >
              Attendance
            </button>
            <button 
              className={`tab-btn ${activeTab === 'leaves' ? 'active' : ''}`}
              onClick={() => setActiveTab('leaves')}
            >
              Leave Requests
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Total Employees</span>
            <h3 className="stat-number">{attendanceStats.total}</h3>
          </div>
          <div className="stat-icon">
            👥
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Present Today</span>
            <h3 className="stat-number">{attendanceStats.present}</h3>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill present" 
                  style={{ width: `${presentPercentage}%` }}
                ></div>
              </div>
              <span className="percentage">{presentPercentage}%</span>
            </div>
          </div>
          <div className="stat-icon">
            ✅
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">On Leave</span>
            <h3 className="stat-number">{attendanceStats.onLeave}</h3>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill leave" 
                  style={{ width: `${leavePercentage}%` }}
                ></div>
              </div>
              <span className="percentage">{leavePercentage}%</span>
            </div>
          </div>
          <div className="stat-icon">
            🏖️
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-content">
            <span className="stat-label">Absent</span>
            <h3 className="stat-number">{attendanceStats.absent}</h3>
            <div className="stat-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill absent" 
                  style={{ width: `${absentPercentage}%` }}
                ></div>
              </div>
              <span className="percentage">{absentPercentage}%</span>
            </div>
          </div>
          <div className="stat-icon">
            ❌
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="secondary-stats">
        <div className="mini-stat">
          <span className="mini-label">Late Arrivals</span>
          <span className="mini-number">{attendanceStats.late}</span>
        </div>
        <div className="mini-stat">
          <span className="mini-label">Overtime Hours</span>
          <span className="mini-number">{attendanceStats.overtime}</span>
        </div>
        <div className="mini-stat">
          <span className="mini-label">Pending Leaves</span>
          <span className="mini-number">{leaveRequests.filter(l => l.status === 'PENDING').length}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Attendance Section */}
        {activeTab === 'attendance' && (
          <div className="content-section">
            <div className="section-header">
              <h3>Daily Attendance</h3>
              <div className="section-actions">
                <button className="btn-refresh" onClick={refresh} >Refresh</button>
              </div>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Hours</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAttendance.map(record => (
                    <tr key={record.id} className="data-row">
                      <td>
                        <div className="employee-info">
                          <strong>{record.employee}</strong>
                        </div>
                      </td>
                      <td>
                        <span className={`dept-badge dept-${record.department.toLowerCase()}`}>
                          {record.department}
                        </span>
                      </td>
                      <td>{getStatusBadge(record.status)}</td>
                      <td>
                        <span className={`time-cell ${record.checkIn === '-' ? 'no-time' : ''}`}>
                          {record.checkIn}
                        </span>
                      </td>
                      <td>
                        <span className={`time-cell ${record.checkOut === '-' ? 'no-time' : ''}`}>
                          {record.checkOut}
                        </span>
                      </td>
                      <td>
                        <div className="hours-cell">
                          {record.hours > 0 ? (
                            <>
                              <span className="hours-value">{record.hours}h</span>
                              {record.hours > 8 && <span className="overtime-badge">OT</span>}
                            </>
                          ) : '-'}
                        </div>
                      </td>
                      <td>
                        {record.status === 'LATE' && (
                          <span className="remark late">Late by 45min</span>
                        )}
                        {record.status === 'PRESENT' && record.hours > 8 && (
                          <span className="remark overtime">+{record.hours - 8}h OT</span>
                        )}
                        {record.status === 'LEAVE' && (
                          <span className="remark leave">On leave</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Attendance Summary */}
            <div className="attendance-summary">
  <h4>Today's Summary</h4>
  <div className="summary-stats">

    <div className="summary-item">
      <span className="summary-label">Work Hours Avg</span>
      <span className="summary-value">{avgWorkHours}h</span>
    </div>

    <div className="summary-item">
      <span className="summary-label">Late Arrivals</span>
      <span className="summary-value">{attendanceStats.late}</span>
    </div>

    <div className="summary-item">
      <span className="summary-label">Early Departures</span>
      <span className="summary-value">{earlyDepartures}</span>
    </div>

    <div className="summary-item">
      <span className="summary-label">Attendance Rate</span>
      <span className="summary-value">{presentPercentage}%</span>
    </div>

  </div>
</div>


          </div>
        )}

        {/* Leaves Section */}
        {activeTab === 'leaves' && (
          <div className="content-section">
            <div className="section-header">
              <h3>Pending Leave Requests</h3>
              
            </div>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.filter(leave => leave.status === 'PENDING').map(leave => (
                    <tr key={leave.id} className="data-row">
                      <td>
                        <div className="employee-info">
                          <strong>{leave.employee}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="leave-type-info">
                          {getLeaveTypeBadge(leave.type)}
                          <span>{leave.type}</span>
                        </div>
                      </td>
                      <td>{leave.from}</td>
                      <td>{leave.to}</td>
                      <td>
                        <span className="duration-badge">
                          {leave.days} day{leave.days > 1 ? 's' : ''}
                        </span>
                      </td>
                      <td>{getStatusBadge(leave.status)}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="btn-approve"
                            onClick={() => handleLeaveAction(leave.id, 'approve')}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleLeaveAction(leave.id, 'reject')}
                          >
                            Reject
                          </button>
                          <button
                                className="btn-view"
                                onClick={() => {
                                  setSelectedLeave(leave);
                                  setShowViewModal(true);
                                }}
                              >
                                View
                              </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Leave Statistics */}
            <div className="leaves-summary">
              <h4>Leave Statistics</h4>
              <div className="leave-stats">
  <div className="leave-stat">
    <span className="stat-label">Pending</span>
    <span className="stat-count pending">{leaveStats.pending}</span>
  </div>

  <div className="leave-stat">
    <span className="stat-label">Approved</span>
    <span className="stat-count approved">{leaveStats.approved}</span>
  </div>

  <div className="leave-stat">
    <span className="stat-label">Rejected</span>
    <span className="stat-count rejected">{leaveStats.rejected}</span>
  </div>

  <div className="leave-stat">
    <span className="stat-label">Total This Month</span>
    <span className="stat-count total">{leaveStats.total}</span>
  </div>
</div>

            </div>
          </div>
        )}
      </div>

      
    </div>
    
{showViewModal && selectedLeave && (
  <div className="modal-overlay">
    <div className="modal">
      <h3 className="modal-header">Leave Details</h3>

      <p><b>Employee:</b> {selectedLeave.employee}</p>
      <p><b>From:</b> {selectedLeave.from}</p>
      <p><b>To:</b> {selectedLeave.to}</p>
      <p><b>Days:</b> {selectedLeave.days}</p>
      <p><b>Status:</b> {selectedLeave.status}</p>

      <button className="Ok-btn" onClick={() => setShowViewModal(false) }>OK</button>
    </div>
  </div>
)}


    </div>
  );
};

export default AttendanceAndLeaves;