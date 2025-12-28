import { useState, useEffect } from "react";
import "./EmployeeSalary.css";

const EmployeeSalary = () => {
  // State for salary data
  const [salaryData, setSalaryData] = useState({
    basicPay: 30000,
    hra: 10000,
    conveyanceAllowance: 2000,
    medicalAllowance: 1500,
    specialAllowance: 5000,
    overtimePay: 2500,
    bonus: 2000,
    pfDeduction: 1800,
    professionalTax: 200,
    tds: 1200,
    otherDeductions: 0,
    netPay: 38000,
    monthYear: "January 2024",
    paymentDate: "2024-01-31",
    bankAccount: "XXXXXX4567",
    workingDays: 26,
    daysPresent: 24,
    overtimeHours: 10
  });

  // State for payslip history
  const [payslipHistory, setPayslipHistory] = useState([
    { month: "December 2023", netPay: 38000, status: "Paid", date: "2023-12-31" },
    { month: "November 2023", netPay: 38000, status: "Paid", date: "2023-11-30" },
    { month: "October 2023", netPay: 37500, status: "Paid", date: "2023-10-31" },
    { month: "September 2023", netPay: 38000, status: "Paid", date: "2023-09-30" }
  ]);

  // State for selected month
  const [selectedMonth, setSelectedMonth] = useState("January 2024");

  // Format currency
  const formatCurrency = (amount) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  // Calculate total earnings
  const totalEarnings = salaryData.basicPay + salaryData.hra + 
                        salaryData.conveyanceAllowance + salaryData.medicalAllowance + 
                        salaryData.specialAllowance + salaryData.overtimePay + salaryData.bonus;

  // Calculate total deductions
  const totalDeductions = salaryData.pfDeduction + salaryData.professionalTax + 
                          salaryData.tds + salaryData.otherDeductions;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Handle month change
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    // In a real app, you would fetch new salary data for the selected month
    console.log("Fetching salary data for:", month);
  };

  // Handle payslip download
  const handleDownloadPayslip = () => {
    alert(`Downloading payslip for ${selectedMonth}`);
    // In a real app, this would trigger a PDF download
  };

  // Handle salary query
  const handleSalaryQuery = () => {
    const query = prompt("Please enter your salary query:");
    if (query) {
      alert(`Your query has been submitted: "${query}"\nHR will contact you soon.`);
    }
  };

  return (
    <div className="salary-container">
      {/* Header Section */}
      <div className="salary-header">
        <h2>Salary Details</h2>
        <div className="month-selector">
          <select 
            value={selectedMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="month-dropdown"
          >
            <option>January 2024</option>
            <option>December 2023</option>
            <option>November 2023</option>
            <option>October 2023</option>
            <option>September 2023</option>
          </select>
          <button 
            className="download-btn"
            onClick={handleDownloadPayslip}
          >
            📄 Download Payslip
          </button>
        </div>
      </div>

      {/* Salary Overview */}
      <div className="salary-overview">
        <div className="salary-summary">
          <div className="summary-header">
            <h3>Salary Summary - {selectedMonth}</h3>
            <span className="payment-status paid">Paid</span>
          </div>
          <p className="payment-date">Paid on: {formatDate(salaryData.paymentDate)}</p>
          <p className="bank-details">Bank Account: •••• {salaryData.bankAccount.slice(-4)}</p>
        </div>

        {/* Salary Box (Your Original Structure) */}
        <div className="salary-box">
          <div className="earnings-section">
            <h4>Earnings</h4>
            <div className="salary-row">
              <span>Basic Pay</span>
              <span>{formatCurrency(salaryData.basicPay)}</span>
            </div>
            <div className="salary-row">
              <span>House Rent Allowance (HRA)</span>
              <span>{formatCurrency(salaryData.hra)}</span>
            </div>
            <div className="salary-row">
              <span>Conveyance Allowance</span>
              <span>{formatCurrency(salaryData.conveyanceAllowance)}</span>
            </div>
            <div className="salary-row">
              <span>Medical Allowance</span>
              <span>{formatCurrency(salaryData.medicalAllowance)}</span>
            </div>
            <div className="salary-row">
              <span>Special Allowance</span>
              <span>{formatCurrency(salaryData.specialAllowance)}</span>
            </div>
            <div className="salary-row">
              <span>Overtime Pay ({salaryData.overtimeHours} hrs)</span>
              <span>{formatCurrency(salaryData.overtimePay)}</span>
            </div>
            <div className="salary-row">
              <span>Bonus & Incentives</span>
              <span>{formatCurrency(salaryData.bonus)}</span>
            </div>
            <div className="salary-row total">
              <span>Total Earnings</span>
              <span>{formatCurrency(totalEarnings)}</span>
            </div>
          </div>

          <div className="deductions-section">
            <h4>Deductions</h4>
            <div className="salary-row">
              <span>Provident Fund (PF)</span>
              <span>{formatCurrency(salaryData.pfDeduction)}</span>
            </div>
            <div className="salary-row">
              <span>Professional Tax</span>
              <span>{formatCurrency(salaryData.professionalTax)}</span>
            </div>
            <div className="salary-row">
              <span>Tax Deducted at Source (TDS)</span>
              <span>{formatCurrency(salaryData.tds)}</span>
            </div>
            <div className="salary-row">
              <span>Other Deductions</span>
              <span>{formatCurrency(salaryData.otherDeductions)}</span>
            </div>
            <div className="salary-row total">
              <span>Total Deductions</span>
              <span>{formatCurrency(totalDeductions)}</span>
            </div>
          </div>

          {/* Net Pay (Your Original Structure Preserved) */}
          <div className="net-pay-section">
            <div className="net-pay-row">
              <h3>Net Pay</h3>
              <h3 className="net-pay-amount">{formatCurrency(salaryData.netPay)}</h3>
            </div>
            <div className="attendance-info">
              <span>Working Days: {salaryData.workingDays}</span>
              <span>Days Present: {salaryData.daysPresent}</span>
              <span>Attendance: {Math.round((salaryData.daysPresent / salaryData.workingDays) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="tax-info">
          <h4>📊 Tax Information</h4>
          <div className="tax-details">
            <div className="tax-item">
              <span>Financial Year</span>
              <span>2023-2024</span>
            </div>
            <div className="tax-item">
              <span>Total Tax Paid</span>
              <span>{formatCurrency(salaryData.tds * 12)}</span>
            </div>
            <div className="tax-item">
              <span>Tax Regime</span>
              <span>New Regime</span>
            </div>
            <div className="tax-item">
              <span>Form 16</span>
              <button className="form16-btn">Download Form 16</button>
            </div>
          </div>
        </div>
      </div>

      {/* Salary History */}
      <div className="salary-history">
        <h3>📅 Salary History</h3>
        <div className="history-table">
          <div className="table-header">
            <span>Month</span>
            <span>Net Salary</span>
            <span>Status</span>
            <span>Payment Date</span>
            <span>Action</span>
          </div>
          {payslipHistory.map((payslip, index) => (
            <div key={index} className="table-row">
              <span>{payslip.month}</span>
              <span>{formatCurrency(payslip.netPay)}</span>
              <span className={`status ${payslip.status.toLowerCase()}`}>
                {payslip.status}
              </span>
              <span>{formatDate(payslip.date)}</span>
              <button 
                className="download-small"
                onClick={() => alert(`Downloading ${payslip.month} payslip`)}
              >
                📥
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;