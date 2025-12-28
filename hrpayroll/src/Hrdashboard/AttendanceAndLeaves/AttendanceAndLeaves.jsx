import { useState } from 'react';
import './AttendanceAndLeaves.css';

const AttendanceAndLeaves = () => {
  // State for leave requests
  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employee: 'Arun', from: '10 Jan 2024', to: '12 Jan 2024', type: 'Sick Leave', status: 'Pending', days: 3 },
    { id: 2, employee: 'Meena', from: '15 Jan 2024', to: '16 Jan 2024', type: 'Casual Leave', status: 'Pending', days: 2 },
    { id: 3, employee: 'Varun', from: '18 Jan 2024', to: '19 Jan 2024', type: 'Personal Leave', status: 'Pending', days: 2 },
    { id: 4, employee: 'Priya', from: '22 Jan 2024', to: '24 Jan 2024', type: 'Vacation', status: 'Pending', days: 3 },
    { id: 5, employee: 'Rahul', from: '25 Jan 2024', to: '26 Jan 2024', type: 'Sick Leave', status: 'Pending', days: 2 },
  ]);

  // State for attendance summary
  const [attendanceStats] = useState({
    total: 120,
    present: 95,
    onLeave: 15,
    absent: 10,
    late: 5,
    overtime: 8
  });

  // State for daily attendance
  const [dailyAttendance] = useState([
    { id: 1, employee: 'Arun', department: 'IT', status: 'Present', checkIn: '09:10 AM', checkOut: '06:05 PM', hours: 8.5 },
    { id: 2, employee: 'Meena', department: 'QA', status: 'Leave', checkIn: '-', checkOut: '-', hours: 0 },
    { id: 3, employee: 'Varun', department: 'HR', status: 'Absent', checkIn: '-', checkOut: '-', hours: 0 },
    { id: 4, employee: 'Karan', department: 'QA', status: 'Present', checkIn: '09:30 AM', checkOut: '06:15 PM', hours: 8.25 },
    { id: 5, employee: 'Sneha', department: 'IT', status: 'Late', checkIn: '10:15 AM', checkOut: '07:00 PM', hours: 7.75 },
    { id: 6, employee: 'Neha', department: 'HR', status: 'Present', checkIn: '09:05 AM', checkOut: '05:45 PM', hours: 8.0 },
    { id: 7, employee: 'Rahul', department: 'Finance', status: 'Present', checkIn: '09:00 AM', checkOut: '06:30 PM', hours: 9.5 },
  ]);

  // State for filters
  const [activeTab, setActiveTab] = useState('attendance');
  const [dateFilter, setDateFilter] = useState('today');

  // Handle leave actions
  const handleLeaveAction = (id, action) => {
    setLeaveRequests(prev => prev.map(leave => 
      leave.id === id ? { ...leave, status: action } : leave
    ));
  };

  // Filter attendance based on date
  const filteredAttendance = dailyAttendance;

  // Calculate attendance percentages
  const presentPercentage = ((attendanceStats.present / attendanceStats.total) * 100).toFixed(1);
  const leavePercentage = ((attendanceStats.onLeave / attendanceStats.total) * 100).toFixed(1);
  const absentPercentage = ((attendanceStats.absent / attendanceStats.total) * 100).toFixed(1);

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'present': return <span className="badge status-present">Present</span>;
      case 'absent': return <span className="badge status-absent">Absent</span>;
      case 'leave': return <span className="badge status-leave">Leave</span>;
      case 'late': return <span className="badge status-late">Late</span>;
      case 'pending': return <span className="badge status-pending">Pending</span>;
      case 'approved': return <span className="badge status-approved">Approved</span>;
      case 'rejected': return <span className="badge status-rejected">Rejected</span>;
      default: return <span className="badge">-</span>;
    }
  };

  // Get leave type badge
  const getLeaveTypeBadge = (type) => {
    switch(type) {
      case 'Sick Leave': return <span className="leave-type sick">SL</span>;
      case 'Casual Leave': return <span className="leave-type casual">CL</span>;
      case 'Personal Leave': return <span className="leave-type personal">PL</span>;
      case 'Vacation': return <span className="leave-type vacation">VL</span>;
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
              <option value="custom">Custom Date</option>
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
            <div className="stat-trend">
              <span className="trend-up">+2 this month</span>
            </div>
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
          <span className="mini-number">{leaveRequests.filter(l => l.status === 'Pending').length}</span>
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
                <button className="btn-export">Export CSV</button>
                <button className="btn-refresh">Refresh</button>
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
                        {record.status === 'Late' && (
                          <span className="remark late">Late by 45min</span>
                        )}
                        {record.status === 'Present' && record.hours > 8 && (
                          <span className="remark overtime">+{record.hours - 8}h OT</span>
                        )}
                        {record.status === 'Leave' && (
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
                  <span className="summary-value">8.2h</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Late Arrivals</span>
                  <span className="summary-value">{attendanceStats.late}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Early Departures</span>
                  <span className="summary-value">3</span>
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
              <div className="section-actions">
                <button className="btn-primary">+ New Leave</button>
                <button className="btn-secondary">View All</button>
              </div>
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
                  {leaveRequests.filter(leave => leave.status === 'Pending').map(leave => (
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
                            onClick={() => handleLeaveAction(leave.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleLeaveAction(leave.id, 'Rejected')}
                          >
                            Reject
                          </button>
                          <button className="btn-view">
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
                  <span className="stat-count pending">{leaveRequests.filter(l => l.status === 'Pending').length}</span>
                </div>
                <div className="leave-stat">
                  <span className="stat-label">Approved</span>
                  <span className="stat-count approved">{leaveRequests.filter(l => l.status === 'Approved').length}</span>
                </div>
                <div className="leave-stat">
                  <span className="stat-label">Rejected</span>
                  <span className="stat-count rejected">{leaveRequests.filter(l => l.status === 'Rejected').length}</span>
                </div>
                <div className="leave-stat">
                  <span className="stat-label">Total This Month</span>
                  <span className="stat-count total">{leaveRequests.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="quick-actions">
        <h4>Quick Actions</h4>
        <div className="action-buttons-grid">
          <button className="quick-action-btn">
            <span className="action-icon">📅</span>
            <span className="action-text">Mark Attendance</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">➕</span>
            <span className="action-text">Add Leave</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">Generate Report</span>
          </button>
          <button className="quick-action-btn">
            <span className="action-icon">🔔</span>
            <span className="action-text">Send Reminder</span>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AttendanceAndLeaves;