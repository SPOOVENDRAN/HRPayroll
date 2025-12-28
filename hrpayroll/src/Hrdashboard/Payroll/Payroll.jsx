// Payroll.jsx
import React, { useState } from 'react';
import './Payroll.css';

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const employees = [
    { id: 1, name: 'Arun', empId: 'EMP-0001', department: 'IT', basic: '$40,000', deductions: '$2,000', deductionPercent: '5%', net: '$38,000', status: 'Processed' },
    { id: 2, name: 'Meena', empId: 'EMP-0002', department: 'QA', basic: '$30,000', deductions: '$1,500', deductionPercent: '5%', net: '$28,500', status: 'Processed' },
    { id: 3, name: 'Rahul', empId: 'EMP-0003', department: 'HR', basic: '$35,000', deductions: '$1,800', deductionPercent: '5.1%', net: '$33,200', status: 'Pending' },
    { id: 4, name: 'Priya', empId: 'EMP-0004', department: 'Finance', basic: '$45,000', deductions: '$3,000', deductionPercent: '6.7%', net: '$42,000', status: 'Processed' },
    { id: 5, name: 'Suresh', empId: 'EMP-0005', department: 'IT', basic: '$38,000', deductions: '$2,200', deductionPercent: '5.8%', net: '$35,800', status: 'Pending' },
  ];

  const payrollStats = {
    monthlyPayroll: '$5.2L',
    processedEmployees: '110',
    pendingPayroll: '10',
    overtimeAmount: '$45K'
  };

  const filteredEmployees = employees.filter(employee => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'processed') return employee.status === 'Processed';
    if (activeFilter === 'pending') return employee.status === 'Pending';
    return true;
  });

  const processedCount = employees.filter(e => e.status === 'Processed').length;
  const pendingCount = employees.filter(e => e.status === 'Pending').length;

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
            <select defaultValue="February 2024">
              <option>January 2024</option>
              <option>February 2024</option>
              <option>March 2024</option>
              <option>April 2024</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payroll Stats Cards */}
      <div className="stats-section">
        <div className="stat-card">
          <div className="stat-header">
            <h3>MONTHLY PAYROLL</h3>
            <div className="stat-trend positive">+2.5%</div>
          </div>
          <div className="stat-value">{payrollStats.monthlyPayroll}</div>
          <p className="stat-note">from last month</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>PROCESSED EMPLOYEES</h3>
          </div>
          <div className="stat-value">{payrollStats.processedEmployees}</div>
          <p className="stat-note">{processedCount} this month</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>PENDING PAYROLL</h3>
          </div>
          <div className="stat-value">{payrollStats.pendingPayroll}</div>
          <button className="run-payroll-btn">Run Payroll Now</button>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>OVERTIME AMOUNT</h3>
            <div className="stat-trend positive">+15%</div>
          </div>
          <div className="stat-value">{payrollStats.overtimeAmount}</div>
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
            
            <button className="export-btn">Export Report</button>
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
                <tr key={employee.id}>
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
                  <td className="salary-cell">{employee.basic}</td>
                  <td>
                    <div className="deduction-amount">{employee.deductions}</div>
                    <div className="deduction-percent">{employee.deductionPercent}</div>
                  </td>
                  <td className="net-salary">{employee.net}</td>
                  <td>
                    <span className={`status-badge ${employee.status.toLowerCase()}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td>
                    <button className="payslip-btn">Payslip</button>
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