import { useState } from "react";
import "./EmployeeLeaves.css";

const EmployeeLeaves = ({
  leaveBalances = [],
  leaveApplications = [],
  refreshLeaves
}) => {
  const [activeTab, setActiveTab] = useState("history");
  const [showApplyForm, setShowApplyForm] = useState(false);

  const [newLeave, setNewLeave] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
    contact: ""
  });

  const token = localStorage.getItem("token");

  // 🔁 Format leave balance
  const leaveBalance = {};
  leaveBalances.forEach(lb => {
    const key = lb.leaveType.toLowerCase();
    leaveBalance[key] = {
      total: lb.totalLeaves,
      used: lb.usedLeaves,
      remaining: lb.totalLeaves - lb.usedLeaves
    };
  });

  const upcomingLeaves = leaveApplications.filter(
    l => new Date(l.from) > new Date() && l.status === "Approved"
  );

  const pendingLeaves = leaveApplications.filter(
    l => l.status === "Pending"
  );

  const calculateDays = (from, to) =>
    Math.ceil((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1;

  const handleInputChange = (e) => {
    setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
  };

  // ✅ APPLY LEAVE (JWT BASED)
  const handleApplyLeave = async (e) => {
    e.preventDefault();

    const payload = {
      leaveType: newLeave.type.toUpperCase().replace(" LEAVE", ""),
      fromDate: newLeave.from,
      toDate: newLeave.to,
      reason: newLeave.reason,
      emergencyContact: newLeave.contact
    };

    const res = await fetch("http://localhost:8080/employee/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      alert("Leave applied successfully");
      setShowApplyForm(false);
      setNewLeave({ type: "", from: "", to: "", reason: "", contact: "" });
      refreshLeaves();
    } else {
      alert(await res.text());
    }
  };

  // ✅ CANCEL LEAVE (JWT BASED)
  const handleCancelLeave = async (id) => {
    if (!window.confirm("Cancel this leave request?")) return;

    const res = await fetch(
      `http://localhost:8080/employee/cancel/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (res.ok) {
      alert("Leave cancelled");
      refreshLeaves();
    } else {
      alert(await res.text());
    }
  };// 🔹 Date format helpers (FIX)
const formatDateDisplay = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short"
  });

const formatFullDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

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
              <div className="balance-type">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </div>
              <div className="balance-numbers">
                <span className="balance-used">{data.used}</span>
                <span className="balance-slash">/</span>
                <span className="balance-total">{data.total}</span>
              </div>
              <div className="balance-remaining">
                {data.remaining} days left
              </div>
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
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📋 Leave History
          </button>
          <button
            className={`tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            📅 Upcoming ({upcomingLeaves.length})
          </button>
          <button
            className={`tab ${activeTab === "pending" ? "active" : ""}`}
            onClick={() => setActiveTab("pending")}
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