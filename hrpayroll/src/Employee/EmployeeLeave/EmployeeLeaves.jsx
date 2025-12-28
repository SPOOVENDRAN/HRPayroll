import { useState, useEffect } from "react";
import "./EmployeeLeaves.css";

const EmployeeLeaves = () => {
  // State for leave balance
  const [leaveBalance, setLeaveBalance] = useState({
    sick: { total: 12, used: 2, remaining: 10 },
    casual: { total: 8, used: 1, remaining: 7 },
    earned: { total: 15, used: 5, remaining: 10 },
    maternity: { total: 180, used: 0, remaining: 180 },
    paternity: { total: 7, used: 0, remaining: 7 }
  });

  // State for leave applications
  const [leaveApplications, setLeaveApplications] = useState([
    { 
      id: 1, 
      from: "2024-01-10", 
      to: "2024-01-12", 
      type: "Sick Leave", 
      status: "Approved", 
      days: 3,
      reason: "High fever and doctor consultation",
      appliedOn: "2024-01-05",
      approvedBy: "HR Manager"
    },
    { 
      id: 2, 
      from: "2024-02-20", 
      to: "2024-02-21", 
      type: "Casual Leave", 
      status: "Pending", 
      days: 2,
      reason: "Family function",
      appliedOn: "2024-02-15"
    },
    { 
      id: 3, 
      from: "2024-03-01", 
      to: "2024-03-05", 
      type: "Earned Leave", 
      status: "Approved", 
      days: 5,
      reason: "Vacation trip",
      appliedOn: "2024-02-20",
      approvedBy: "Team Lead"
    },
    { 
      id: 4, 
      from: "2024-02-28", 
      to: "2024-02-28", 
      type: "Casual Leave", 
      status: "Rejected", 
      days: 1,
      reason: "Personal work",
      appliedOn: "2024-02-25",
      rejectedReason: "Project deadline approaching"
    }
  ]);

  // State for new leave application
  const [newLeave, setNewLeave] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
    contact: ""
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState("history");
  const [showApplyForm, setShowApplyForm] = useState(false);

  // Format date to display as "10 Jan"
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Format full date
  const formatFullDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric' 
    });
  };

  // Calculate number of days between two dates
  const calculateDays = (from, to) => {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Handle new leave form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeave({
      ...newLeave,
      [name]: value
    });
  };

  // Handle leave application submission
  const handleApplyLeave = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newLeave.type || !newLeave.from || !newLeave.to || !newLeave.reason) {
      alert("Please fill in all required fields");
      return;
    }

    const days = calculateDays(newLeave.from, newLeave.to);
    
    // Check if enough leave balance
    const leaveType = newLeave.type.toLowerCase().replace(' leave', '');
    if (leaveBalance[leaveType] && leaveBalance[leaveType].remaining < days) {
      alert(`Insufficient ${newLeave.type} balance. Available: ${leaveBalance[leaveType].remaining} days`);
      return;
    }

    // Create new leave application
    const newApplication = {
      id: leaveApplications.length + 1,
      from: newLeave.from,
      to: newLeave.to,
      type: newLeave.type,
      status: "Pending",
      days: days,
      reason: newLeave.reason,
      appliedOn: new Date().toISOString().split('T')[0]
    };

    // Add to applications
    setLeaveApplications([newApplication, ...leaveApplications]);
    
    // Update leave balance (in real app, this would be backend)
    if (leaveBalance[leaveType]) {
      setLeaveBalance({
        ...leaveBalance,
        [leaveType]: {
          ...leaveBalance[leaveType],
          used: leaveBalance[leaveType].used + days
        }
      });
    }

    // Reset form
    setNewLeave({
      type: "",
      from: "",
      to: "",
      reason: "",
      contact: ""
    });
    
    setShowApplyForm(false);
    alert("Leave application submitted successfully!");
  };

  // Handle leave cancellation
  const handleCancelLeave = (id) => {
    if (window.confirm("Are you sure you want to cancel this leave application?")) {
      const updatedApplications = leaveApplications.map(app => {
        if (app.id === id && app.status === "Pending") {
          return { ...app, status: "Cancelled" };
        }
        return app;
      });
      setLeaveApplications(updatedApplications);
      alert("Leave application cancelled");
    }
  };

  // Calculate upcoming leaves
  const upcomingLeaves = leaveApplications.filter(leave => 
    new Date(leave.from) > new Date() && leave.status === "Approved"
  );

  // Calculate pending leaves
  const pendingLeaves = leaveApplications.filter(leave => 
    leave.status === "Pending"
  );

  return (
    <div className="leaves-container">
      {/* Header Section */}
      <div className="leaves-header">
        <h2>My Leaves</h2>
        <button 
          className="apply-leave-btn"
          onClick={() => setShowApplyForm(true)}
        >
          + Apply for Leave
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="leave-balance-section">
        <h3>Leave Balance</h3>
        <div className="balance-cards">
          {Object.entries(leaveBalance).map(([type, data]) => (
            <div key={type} className={`balance-card ${type}`}>
              <div className="balance-type">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
              <div className="balance-numbers">
                <span className="balance-used">{data.used}</span>
                <span className="balance-slash">/</span>
                <span className="balance-total">{data.total}</span>
              </div>
              <div className="balance-remaining">{data.remaining} days left</div>
              <div className="balance-progress">
                <div 
                  className="progress-bar"
                  style={{ width: `${(data.used / data.total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📋 Leave History
          </button>
          <button 
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            📅 Upcoming ({upcomingLeaves.length})
          </button>
          <button 
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending ({pendingLeaves.length})
          </button>
        </div>
      </div>

      {/* Apply Leave Form Modal */}
      {showApplyForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Apply for Leave</h3>
              <button 
                className="close-modal"
                onClick={() => setShowApplyForm(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleApplyLeave} className="leave-form">
              <div className="form-group">
                <label>Leave Type *</label>
                <select 
                  name="type" 
                  value={newLeave.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select leave type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Earned Leave">Earned Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>From Date *</label>
                  <input 
                    type="date" 
                    name="from" 
                    value={newLeave.from}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>To Date *</label>
                  <input 
                    type="date" 
                    name="to" 
                    value={newLeave.to}
                    onChange={handleInputChange}
                    min={newLeave.from || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              {newLeave.from && newLeave.to && (
                <div className="days-info">
                  Total Days: {calculateDays(newLeave.from, newLeave.to)} days
                </div>
              )}
              
              <div className="form-group">
                <label>Reason for Leave *</label>
                <textarea 
                  name="reason" 
                  value={newLeave.reason}
                  onChange={handleInputChange}
                  placeholder="Please provide details for your leave request"
                  rows="3"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Emergency Contact Number</label>
                <input 
                  type="tel" 
                  name="contact" 
                  value={newLeave.contact}
                  onChange={handleInputChange}
                  placeholder="+91 9876543210"
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowApplyForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Table (Your Original Structure Enhanced) */}
      <div className="table-container">
        {activeTab === 'history' && (
          <table className="emp-table">
            <thead>
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Type</th>
                <th>Days</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveApplications.map((leave) => (
                <tr key={leave.id}>
                  <td>{formatDateDisplay(leave.from)}</td>
                  <td>{formatDateDisplay(leave.to)}</td>
                  <td>{leave.type}</td>
                  <td>{leave.days} days</td>
                  <td>
                    <span className={`status-badge ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="view-btn"
                        onClick={() => alert(`Details:\nFrom: ${formatFullDate(leave.from)}\nTo: ${formatFullDate(leave.to)}\nReason: ${leave.reason}\nApplied On: ${formatFullDate(leave.appliedOn)}\n${leave.approvedBy ? `Approved By: ${leave.approvedBy}` : ''}\n${leave.rejectedReason ? `Rejection Reason: ${leave.rejectedReason}` : ''}`)}
                      >
                        View
                      </button>
                      {leave.status === "Pending" && (
                        <button 
                          className="cancel-btn"
                          onClick={() => handleCancelLeave(leave.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'upcoming' && (
          <div className="upcoming-leaves">
            {upcomingLeaves.length > 0 ? (
              upcomingLeaves.map(leave => (
                <div key={leave.id} className="upcoming-card">
                  <div className="upcoming-date">
                    <div className="date-day">{formatDateDisplay(leave.from)}</div>
                    <div className="date-range">to {formatDateDisplay(leave.to)}</div>
                  </div>
                  <div className="upcoming-details">
                    <div className="upcoming-type">{leave.type}</div>
                    <div className="upcoming-days">{leave.days} days</div>
                    <div className="upcoming-reason">{leave.reason}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No upcoming approved leaves</p>
            )}
          </div>
        )}

        {activeTab === 'pending' && (
          <div className="pending-leaves">
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map(leave => (
                <div key={leave.id} className="pending-card">
                  <div className="pending-header">
                    <div className="pending-type">{leave.type}</div>
                    <button 
                      className="cancel-pending-btn"
                      onClick={() => handleCancelLeave(leave.id)}
                    >
                      Cancel Request
                    </button>
                  </div>
                  <div className="pending-dates">
                    {formatFullDate(leave.from)} to {formatFullDate(leave.to)}
                  </div>
                  <div className="pending-days">{leave.days} days requested</div>
                  <div className="pending-reason">{leave.reason}</div>
                  <div className="pending-applied">
                    Applied on: {formatFullDate(leave.appliedOn)}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No pending leave requests</p>
            )}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <div className="stat-value">{leaveApplications.length}</div>
            <div className="stat-label">Total Applications</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">
              {leaveApplications.filter(l => l.status === "Approved").length}
            </div>
            <div className="stat-label">Approved Leaves</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{pendingLeaves.length}</div>
            <div className="stat-label">Pending Approval</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">
              {leaveApplications.reduce((sum, leave) => sum + leave.days, 0)}
            </div>
            <div className="stat-label">Total Days Taken</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaves;