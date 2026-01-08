// Payroll.jsx
import React, { useState } from 'react';
import './Payroll.css';
const Payroll = ({
  summary,
  employees,
  month,
  setMonth,
  runPayroll,
  downloadPayslip,
  months,
   locked  
}) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  

  const filteredEmployees = employees.filter(employee => {
  const search =
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase());

  if (!search) return false;
    if (activeFilter === 'all') return true;
  if (activeFilter === 'processed') return employee.status === 'Processed';
  if (activeFilter === 'pending') return employee.status === 'Pending';
  return true;
});

  const processedCount = employees.filter(e => e.status === 'Processed').length;
  const pendingCount = employees.filter(e => e.status === 'Pending').length;

  const exportReport = () => {
  const headers = ["Emp ID", "Name", "Department", "Basic", "Deductions", "Net", "Status"];

  const rows = employees.map(e => [
    e.empId,
    e.name,
    e.department,
    e.basic,
    e.deductions,
    e.net,
    e.status
  ]);

  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Payroll-${month}.csv`;
  a.click();
};

  return (
    <div className="hr-payroll">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-left">
          <h1 className="page-title">HR Payroll</h1>
          <p className="page-subtitle">Manage employee salaries, deductions, and payroll processing</p>
        </div>
        
        <div className="header-right">
          <div className="month-selector">
            <label>Payroll Month</label>
           <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map(m => (
              <option key={m} value={m}>
                {m.replace("-", " ")}
              </option>
            ))}
          </select>


          </div>
        </div>
      </div>

      {/* Payroll Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-header">
            <h3>MONTHLY PAYROLL</h3>
          
          </div>
          <div className="stat-value">₹{summary?.monthlyPayroll ?? 0}</div>
          <p className="stat-note">from last month</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>PROCESSED EMPLOYEES</h3>
          </div>
          <div className="stat-value">{summary.processedEmployees}</div>
          <p className="stat-note">{processedCount} this month</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>PENDING PAYROLL</h3>
          </div>
          <div className="stat-value">{summary.pendingPayroll}</div>
          <button
            className="run-payroll-btn"
            disabled={locked || summary.pendingPayroll === 0}
            onClick={runPayroll}
          >
            {locked ? "Payroll Completed" : "Run Payroll Now"}
          </button>

        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>OVERTIME AMOUNT</h3>
          </div>
          <div className="stat-value">₹{summary.overtimeAmount}</div>
          <p className="stat-note">from last month</p>
        </div>
      </div>

      {/* Employee Payroll Table */}
      <div className="payroll-table-section">
        <div className="table-header">
          <div className="table-title">
            <h2>Employee Payroll Details</h2>
            <p>Manage and view individual employee payroll information</p>
          </div>
          
          <div className="table-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search employees or department"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-tabs">
              <button 
                className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Employees
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'processed' ? 'active' : ''}`}
                onClick={() => setActiveFilter('processed')}
              >
                Processed ({processedCount})
              </button>
              <button 
                className={`filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveFilter('pending')}
              >
                Pending ({pendingCount})
              </button>
            </div>
            
            <button className="export-btn" onClick={exportReport} >Export Report</button>
          </div>
        </div>

        <div className="table-container">
          <table className="employee-table">
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>DEPARTMENT</th>
                <th>BASIC SALARY</th>
                <th>DEDUCTIONS</th>
                <th>NET SALARY</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.empId}>
                  <td>
                    <div className="employee-info">
                      <div className="employee-avatar">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-id">{employee.empId}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="dept-badge">{employee.department}</span>
                  </td>
                  <td className="salary-cell">₹{employee.basic.toLocaleString()}</td>

                  <td>
                   <div className="deduction-amount">₹{employee.deductions.toLocaleString()}</div>
                    <div className="deduction-percent">
                    {((employee.deductions / employee.basic) * 100).toFixed(1)}%
                  </div>

                  </td>
                  <td className="net-salary">₹{employee.net.toLocaleString()}</td>

                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <button className="payslip-btn" onClick={() => downloadPayslip(employee.empId)}>Payslip</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;