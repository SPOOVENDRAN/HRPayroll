import { useState, useEffect } from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  // State for employee data
  const [employeeData, setEmployeeData] = useState({
    name: "John Doe",
    department: "Engineering",
    employeeId: "EMP-0012",
    joiningDate: "2023-01-15",
    designation: "Software Engineer",
    email: "john.doe@company.com",
    phone: "+91 9876543210",
    location: "Bengaluru",
    manager: "Sarah Johnson",
    employmentType: "Full-time"
  });

  // State for dashboard stats
  const [stats, setStats] = useState({
    leaveBalance: 12,
    attendance: { present: 22, total: 26 },
    lastSalary: 45000,
    upcomingHolidays: 2,
    pendingRequests: 1,
    overtimeHours: 8,
    projects: 3,
    yearsOfService: 1
  });

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
  const attendancePercentage = Math.round((stats.attendance.present / stats.attendance.total) * 100);

  // Format salary with commas
  const formattedSalary = stats.lastSalary.toLocaleString('en-IN');

  // Calculate years of service
  const calculateServiceYears = () => {
    const joinDate = new Date(employeeData.joiningDate);
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
        <h2>Welcome back, {employeeData.name}!</h2>
        <p className="welcome-subtitle">
          Employee ID: {employeeData.employeeId} • Department: {employeeData.department}
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
                {employeeData.name.charAt(0)}
              </div>
              <div className="profile-info">
                <h3 className="employee-name">{employeeData.name}</h3>
                <p className="employee-designation">{employeeData.designation}</p>
                <span className="employee-status active">Active</span>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-row">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{employeeData.employeeId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{employeeData.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{employeeData.phone}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{employeeData.department}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">{employeeData.manager}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{employeeData.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Joining Date:</span>
                <span className="detail-value">{formatDate(employeeData.joiningDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Employment Type:</span>
                <span className="detail-value">{employeeData.employmentType}</span>
              </div>
            </div>

           

            {/* Quick Stats */}
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="stat-number">{stats.yearsOfService}+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">{stats.projects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="profile-stat">
                <span className="stat-number">{stats.overtimeHours}</span>
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
                  <h3 className="card-value">{stats.leaveBalance} Days</h3>
                  <p className="card-detail">Available for use</p>
                </div>
              </div>

              <div className="emp-card attendance-card">
                <div className="card-icon">✅</div>
                <div className="card-content">
                  <p className="card-label">Attendance This Month</p>
                  <h3 className="card-value">{stats.attendance.present}/{stats.attendance.total}</h3>
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
                <span className="additional-value">{stats.overtimeHours} hrs</span>
              </div>
            </div>
            <div className="additional-stat">
              <div className="additional-icon">📋</div>
              <div className="additional-content">
                <span className="additional-label">Pending Requests</span>
                <span className="additional-value">{stats.pendingRequests}</span>
              </div>
            </div>
            <div className="additional-stat">
              <div className="additional-icon">🎯</div>
              <div className="additional-content">
                <span className="additional-label">Active Projects</span>
                <span className="additional-value">{stats.projects}</span>
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
                  <div className="performance-fill" style={{ width: '85%' }}></div>
                </div>
                <div className="performance-value">85%</div>
              </div>
              <div className="performance-item">
                <div className="performance-label">Goal Achievement</div>
                <div className="performance-bar">
                  <div className="performance-fill" style={{ width: '92%' }}></div>
                </div>
                <div className="performance-value">92%</div>
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