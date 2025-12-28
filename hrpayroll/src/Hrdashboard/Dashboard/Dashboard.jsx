import './Dashboard.css'

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* ================= TOP KPI CARDS ================= */}
      <div className="cards three">
        
        {/* TOTAL EMPLOYEES */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <p className="card-title">Total Employees</p>
          </div>
          
          <div className="kpi-content">
            <div className="kpi-main-side">
              <div className="kpi-main-number">120</div>
              <div className="kpi-main-label">Employees</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Full-time</span>
                  <span className="kpi-sub-value">85</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Interns</span>
                  <span className="kpi-sub-value">25</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Notice Period</span>
                  <span className="kpi-sub-value">10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DEPARTMENTS */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <p className="card-title">Departments</p>
          </div>
          
          <div className="kpi-content">
            <div className="kpi-main-side">
              <div className="kpi-main-number">6</div>
              <div className="kpi-main-label">Departments</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">IT</span>
                  <span className="kpi-sub-value">40</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">QA</span>
                  <span className="kpi-sub-value">20</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">HR</span>
                  <span className="kpi-sub-value">10</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Sales</span>
                  <span className="kpi-sub-value">25</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Finance</span>
                  <span className="kpi-sub-value">15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY ATTENDANCE */}
        <div className="card kpi-card">
          <div className="kpi-header">
            <p className="card-title">Today's Attendance</p>
          </div>
          
          <div className="kpi-content">
            <div className="kpi-main-side">
              <div className="kpi-main-number">95</div>
              <div className="kpi-main-label">Present</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item attendance-present">
                  <span className="kpi-sub-label">Present</span>
                  <span className="kpi-sub-value">95 (79%)</span>
                </div>
                <div className="kpi-sub-item attendance-absent">
                  <span className="kpi-sub-label">Absent</span>
                  <span className="kpi-sub-value">25 (21%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OVERVIEW GRID ================= */}
      <div className="dashboard-grid">
        {/* EMPLOYEE OVERVIEW */}
        <div className="box">
          <h3>Employees Overview</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="clickable">
                <td>Arun</td>
                <td>Developer</td>
                <td><span className="badge active">Active</span></td>
              </tr>
              <tr className="clickable">
                <td>Meena</td>
                <td>Tester</td>
                <td><span className="badge active">Active</span></td>
              </tr>
              <tr className="clickable">
                <td>Varun</td>
                <td>HR</td>
                <td><span className="badge onleave">On Leave</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PERFORMANCE */}
        <div className="box">
          <h3>Employee Performance</h3>
          <ul className="performance-list">
            <li>Arun <span className="good">Good</span></li>
            <li>Meena <span className="average">Average</span></li>
            <li>Varun <span className="good">Good</span></li>
          </ul>
        </div>
      </div>

      {/* ================= PROJECTS TABLE ================= */}
      <div className="box full">
        <h3>Employee Projects Overview</h3>
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Role</th>
              <th>Department</th>
              <th>Current Project</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            <tr className="clickable">
              <td>Arun</td>
              <td>Developer</td>
              <td>IT</td>
              <td>Payroll Automation</td>
              <td>
                <div className="progress-wrapper">
                  <div className="progress">
                    <div style={{ width: "80%" }}></div>
                  </div>
                  <span className="progress-text">80%</span>
                </div>
              </td>
            </tr>
            <tr className="clickable">
              <td>Meena</td>
              <td>Tester</td>
              <td>QA</td>
              <td>Leave Module</td>
              <td>
                <div className="progress-wrapper">
                  <div className="progress">
                    <div style={{ width: "50%" }}></div>
                  </div>
                  <span className="progress-text">50%</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ================= DEPARTMENT WISE TABLE ================= */}
      <div className="box full">
        <h3>Department-wise Employee Distribution</h3>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Employees</th>
              <th>Designation Split</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>IT</td>
              <td>40</td>
              <td>Developers (28), Leads (6), Interns (6)</td>
            </tr>
            <tr>
              <td>QA</td>
              <td>20</td>
              <td>Testers (15), Automation (5)</td>
            </tr>
            <tr>
              <td>HR</td>
              <td>10</td>
              <td>HR Exec (6), Recruiters (4)</td>
            </tr>
            <tr>
              <td>Sales</td>
              <td>25</td>
              <td>Executives (18), Managers (7)</td>
            </tr>
            <tr>
              <td>Finance</td>
              <td>15</td>
              <td>Accountants (10), Analysts (5)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;