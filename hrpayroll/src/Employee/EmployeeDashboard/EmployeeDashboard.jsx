import { useState, useEffect } from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = (props) => {


  // State for upcoming holidays
  const [holidays, setHolidays] = useState([
    { name: "Republic Day", date: "Jan 26, 2024", type: "National Holiday" },
    { name: "Holi", date: "Mar 25, 2024", type: "Festival" }
  ]);

  // State for recent activities
  const [activities, setActivities] = useState([
    { type: "leave", text: "Leave approved for Jan 20-22", date: "2 days ago" },
    { type: "salary", text: "Salary credited for December", date: "1 week ago" },
    { type: "attendance", text: "Late mark on Jan 15", date: "2 weeks ago" }
  ]);


  // Simulate loading data
  useEffect(() => {
    console.log("Dashboard loaded");
  }, []);

  // Calculate attendance percentage
  const attendancePercentage = Math.round((props.presentDays / props.totalDays) * 100);

  // Format salary with commas
  const formattedSalary = props.salary.toLocaleString('en-IN');

  // Calculate years of service
  const calculateServiceYears = () => {
    const joinDate = new Date(props.joiningDate);
    const today = new Date();
    const years = today.getFullYear() - joinDate.getFullYear();
    const months = today.getMonth() - joinDate.getMonth();
    return years + (months / 12);
  };

  // Format joining date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="emp-dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome back, {props.name}!</h2>
        <p className="welcome-subtitle">
          Employee ID: {props.employeeId} • Department: {props.department}
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left Column - Employee Card */}
        <div className="left-column">
          {/* Employee Profile Card */}
          <div className="employee-profile-card">
            <div className="profile-header">
              <div className="profile-avatar">
                {props.name.charAt(0)}
              </div>
              <div className="profile-info">
                <h3 className="employee-name">{props.name}</h3>
                <p className="employee-designation">{props.designation}</p>
                <span className="employee-status active">Active</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{props.employeeId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{props.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{props.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{props.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">{props.manager}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{props.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Joining Date:</span>
                <span className="detail-value">{formatDate(props.joiningDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Employment Type:</span>
                <span className="detail-value">{props.employmentType}</span>
              </div>
            </div>

           

            {/* Quick Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-number">{props.yearsOfService}+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">{props.projects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">{props.overtimeHours}</span>
                <span className="stat-label">Overtime Hours</span>
              </div>
            </div>
          </div>

          {/* Upcoming Holidays Card */}
          <div className="info-card">
            <h4>🎉 Upcoming Holidays</h4>
            <div className="holidays-list">
              {holidays.map((holiday, index) => (
                <div key={index} className="holiday-item">
                  <div className="holiday-icon">📅</div>
                  <div className="holiday-content">
                    <div className="holiday-name">{holiday.name}</div>
                    <div className="holiday-details">
                      <span className="holiday-date">{holiday.date}</span>
                      <span className="holiday-type">{holiday.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Activities */}
        <div className="right-column">
          {/* Stats Cards (Your Existing Code) */}
          <div className="stats-section">
            <h3>Your Overview</h3>
            <div className="emp-cards">
              <div className="emp-card leave-card">
                <div className="card-icon">📅</div>
                <div className="card-content">
                  <p className="card-label">Leave Balance</p>
                  <h3 className="card-value">{props.leaveBalance} Days</h3>
                  <p className="card-detail">Available for use</p>
                </div>
              </div>

              <div className="emp-card attendance-card">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <p className="card-label">Attendance This Month</p>
                  <h3 className="card-value">{props.presentDays}/{props.totalDays}</h3>
                  <p className="card-detail">{attendancePercentage}% Present</p>
                </div>
              </div>

              <div className="emp-card salary-card">
                <div className="card-icon">💰</div>
                <div className="card-content">
                  <p className="card-label">Last Month Salary</p>
                  <h3 className="card-value">₹{formattedSalary}</h3>
                  <p className="card-detail">December 2023</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="additional-stats">
            <div className="additional-stat">
              <div className="additional-icon">⏰</div>
              <div className="additional-content">
                <span className="additional-label">Overtime Hours</span>
                <span className="additional-value">{props.overtime} hrs</span>
              </div>
            </div>
            <div className="additional-stat">
              <div className="additional-icon">📋</div>
              <div className="additional-content">
                <span className="additional-label">Pending Requests</span>
                <span className="additional-value">{props.pendingRequests}</span>
              </div>
            </div>
            <div className="additional-stat">
              <div className="additional-icon">🎯</div>
              <div className="additional-content">
                <span className="additional-label">Active Projects</span>
                <span className="additional-value">{props.projects}</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="info-card">
            <h4>📝 Recent Activities</h4>
            <div className="activities-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'leave' && '📅'}
                    {activity.type === 'salary' && '💰'}
                    {activity.type === 'attendance' && '✅'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-date">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="info-card">
            <h4>🚀 Quick Actions</h4>
            <div className="quick-actions">
              <button className="action-btn apply-leave">
                <span className="action-icon">📝</span>
                Apply Leave
              </button>
              <button className="action-btn view-payslip">
                <span className="action-icon">📄</span>
                View Payslip
              </button>
              <button className="action-btn mark-attendance">
                <span className="action-icon">✅</span>
                Mark Attendance
              </button>
              <button className="action-btn update-profile">
                <span className="action-icon">👤</span>
                Update Profile
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="info-card performance-card">
            <h4>📊 Performance Summary</h4>
            <div className="performance-stats">
              <div className="performance-item">
                <div className="performance-label">Attendance Score</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${attendancePercentage}%` }}></div>
                </div>
                <div className="performance-value">{attendancePercentage}%</div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Productivity</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${props.productivity}` }}></div>
                </div>
                <div className="performance-value">{props.productivity} </div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Goal Achievement</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: `${props.goalAchievement}` }}></div>
                </div>
                <div className="performance-value">{props.goalAchievement}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="footer-note">
        <p>Last updated: Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <button className="refresh-btn">
          <span className="refresh-icon">🔄</span>
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;