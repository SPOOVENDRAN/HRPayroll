import './Dashboard.css'
import EmployeesOverviewData from "./DataFetches/EmployeesOverviewData";

const Dashboard = ({data}) => {
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
              <div className="kpi-main-number">{(data.totalEmployees)}</div>
              <div className="kpi-main-label">Employees</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Full-time</span>
                  <span className="kpi-sub-value">{data.fullTimeEmployees}</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Interns</span>
                  <span className="kpi-sub-value">{data.interns} </span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Notice Period</span>
                  <span className="kpi-sub-value">{data.noticePeriod}</span>
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
              <div className="kpi-main-number"> {data.totalDepartments}</div>
              <div className="kpi-main-label">Departments</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Engineering</span>
                  <span className="kpi-sub-value">{data.departmentCounts.Engineering} </span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Finance</span>
                  <span className="kpi-sub-value">{data.departmentCounts.Finance}</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">HR</span>
                  <span className="kpi-sub-value">{data.departmentCounts.HR}</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Marketing</span>
                  <span className="kpi-sub-value">{data.departmentCounts.Marketing}</span>
                </div>
                <div className="kpi-sub-item">
                  <span className="kpi-sub-label">Finance</span>
                  <span className="kpi-sub-value">{data.departmentCounts.Finance}</span>
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
              <div className="kpi-main-number"></div>
              <div className="kpi-main-label">Present</div>
            </div>
            
            <div className="kpi-details-side">
              <div className="kpi-sub-data">
                <div className="kpi-sub-item attendance-present">
                  <span className="kpi-sub-label">Present</span>
                  <span className="kpi-sub-value">{data.presentToday} - {data.presentPercentage}%</span>
                </div>
                <div className="kpi-sub-item attendance-absent">
                  <span className="kpi-sub-label">Absent</span>
                  <span className="kpi-sub-value">{data.absentToday} - {data.absentPercentage}%</span>
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
        {data.employeeOverview.map((emp, index) => (
          <tr className="clickable" key={index}>
            <td>{emp.name}</td>
            <td>{emp.role}</td>
            <td>
              <span
                className={`badge ${
                  emp.status === "ON_LEAVE" ? "onleave" : "active"
                }`}
              >
                {emp.status === "ON_LEAVE" ? "On Leave" : "Active"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* PERFORMANCE */}
  <div className="box">
    <h3>Employee Performance</h3>

    <ul className="performance-list">
      {data.employeePerformance.map((emp, index) => (
        <li key={index}>
          {emp.name}
          <span
            className={
              emp.performance === "GOOD"
                ? "good"
                : emp.performance === "AVERAGE"
                ? "average"
                : "poor"
            }
          >
            {emp.performance}
          </span>
        </li>
      ))}
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
  {data.projectOverview.map((proj, index) => (
    <tr className="clickable" key={index}>
      <td>{proj.name}</td>
      <td>{proj.role}</td>
      <td>{proj.department}</td>
      <td>{proj.currentProjects}</td>
      <td>
        <div className="progress-wrapper">
          <div className="progress">
            <div style={{ width: `${proj.progress}%` }}></div>
          </div>
          <span className="progress-text">{proj.progress}%</span>
        </div>
      </td>
    </tr>
  ))}
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
              {data.departmentDistribution.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.department}</td>
                  <td>{dept.totalEmployees}</td>
                  <td>{dept.designationSplit}</td>
                </tr>
              ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Dashboard;