import "./EmployeeSalary.css";

const EmployeeSalary = ({
  salaryData,
  payslipHistory,
  selectedMonth,
  onMonthChange,
  empId
}) => {
  if (!salaryData) {
  return <div>Loading salary...</div>;
}


  // Format currency
  const formatCurrency = (amount) => {
    return "₹" + amount.toLocaleString("en-IN");
  };

  // Calculate total earnings
  const totalEarnings =
    salaryData.basicPay +
    salaryData.hra +
    salaryData.conveyanceAllowance +
    salaryData.medicalAllowance +
    salaryData.specialAllowance +
    salaryData.overtimePay +
    salaryData.bonus;

  // Calculate total deductions
  const totalDeductions =
    salaryData.pfDeduction +
    salaryData.professionalTax +
    salaryData.tds +
    salaryData.otherDeductions;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Handle month change
  const handleMonthChange = (month) => {
    onMonthChange(month.toUpperCase().replace(" ", "-"));
  };

  // ✅ Payslip PDF download (ONLY LOGIC CHANGE)
  const handleDownloadPayslip = () => {
    window.open(
      `http://localhost:8080/employee/salary/payslip?empid=${empId}&month=${selectedMonth.toUpperCase().replace(" ", "-")}`,
      "_blank"
    );
  };

  return (
    <div className="salary-container">
      {/* Header Section */}
      <div className="salary-header">
        <h2>Salary Details</h2>
        <div className="month-selector">
          <select
            value={selectedMonth.replace("-", " ")}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="month-dropdown"
          >
            {payslipHistory.map((p, i) => (
              <option key={i}>{p.month}</option>
            ))}
          </select>
          <button className="download-btn" onClick={handleDownloadPayslip}>
            📄 Download Payslip
          </button>
        </div>
      </div>

      {/* Salary Overview */}
      <div className="salary-overview">
        <div className="salary-summary">
          <div className="summary-header">
            <h3>Salary Summary - {selectedMonth.replace("-", " ")}</h3>
            <span className="payment-status paid">Paid</span>
          </div>
          <p className="payment-date">
            Paid on: {formatDate(salaryData.paymentDate)}
          </p>
          <p className="bank-details">
  Bank Account: •••• {salaryData?.bankAccount?.slice(-4) || "XXXX"}
</p>

        </div>

        {/* Salary Box */}
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

          {/* Net Pay */}
          <div className="net-pay-section">
            <div className="net-pay-row">
              <h3>Net Pay</h3>
              <h3 className="net-pay-amount">
                {formatCurrency(salaryData.netPay)}
              </h3>
            </div>
            <div className="attendance-info">
              <span>Working Days: {salaryData.workingDays}</span>
              <span>Days Present: {salaryData.daysPresent}</span>
              <span>
                Attendance:{" "}
                {Math.round(
                  (salaryData.daysPresent / salaryData.workingDays) * 100
                )}
                %
              </span>
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
                  onClick={() =>
                    window.open(
                      `http://localhost:8080/employee/salary/payslip?empid=${empId}&month=${payslip.month.toUpperCase().replace(" ", "-")}`,
                      "_blank"
                    )
                  }
                >
                  📥
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSalary;
