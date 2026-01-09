import "./EmployeeSalary.css";

const EmployeeSalary = ({
  salaryData,
  payslipHistory,
  selectedMonth,
  onMonthChange
}) => {
  const token = localStorage.getItem("token");

  if (!salaryData) {
    return <div>Loading salary...</div>;
  }

  // Format currency
  const formatCurrency = (amount) =>
    "₹" + amount.toLocaleString("en-IN");

  // Calculate totals
  const totalEarnings =
    salaryData.basicPay +
    salaryData.hra +
    salaryData.conveyanceAllowance +
    salaryData.medicalAllowance +
    salaryData.specialAllowance +
    salaryData.overtimePay +
    salaryData.bonus;

  const totalDeductions =
    salaryData.pfDeduction +
    salaryData.professionalTax +
    salaryData.tds +
    salaryData.otherDeductions;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  const handleMonthChange = (month) => {
    onMonthChange(month.toUpperCase().replace(" ", "-"));
  };

  // ✅ JWT-SECURED PAYSLIP DOWNLOAD (FIXED)
  const handleDownloadPayslip = async (month) => {
    try {
      const res = await fetch(
        `${BASE_API_URL}/employee/salary/payslip?month=${month}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) {
        alert("Failed to download payslip");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `payslip-${month}.pdf`;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Payslip download error:", err);
      alert("Error downloading payslip");
    }
  };

  return (
    <div className="salary-container">
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
          <button
            className="download-btn"
            onClick={() => handleDownloadPayslip(selectedMonth)}
          >
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
            Bank Account: •••• {salaryData.bankAccount.slice(-4)}
          </p>
        </div>

        {/* Salary Box */}
        <div className="salary-box">
          {/* Earnings */}
          <div className="earnings-section">
            <h4>Earnings</h4>
            <div className="salary-row"><span>Basic Pay</span><span>{formatCurrency(salaryData.basicPay)}</span></div>
            <div className="salary-row"><span>HRA</span><span>{formatCurrency(salaryData.hra)}</span></div>
            <div className="salary-row"><span>Conveyance</span><span>{formatCurrency(salaryData.conveyanceAllowance)}</span></div>
            <div className="salary-row"><span>Medical</span><span>{formatCurrency(salaryData.medicalAllowance)}</span></div>
            <div className="salary-row"><span>Special Allowance</span><span>{formatCurrency(salaryData.specialAllowance)}</span></div>
            <div className="salary-row"><span>Overtime ({salaryData.overtimeHours} hrs)</span><span>{formatCurrency(salaryData.overtimePay)}</span></div>
            <div className="salary-row"><span>Bonus</span><span>{formatCurrency(salaryData.bonus)}</span></div>
            <div className="salary-row total"><span>Total Earnings</span><span>{formatCurrency(totalEarnings)}</span></div>
          </div>

          {/* Deductions */}
          <div className="deductions-section">
            <h4>Deductions</h4>
            <div className="salary-row"><span>PF</span><span>{formatCurrency(salaryData.pfDeduction)}</span></div>
            <div className="salary-row"><span>Professional Tax</span><span>{formatCurrency(salaryData.professionalTax)}</span></div>
            <div className="salary-row"><span>TDS</span><span>{formatCurrency(salaryData.tds)}</span></div>
            <div className="salary-row"><span>Other</span><span>{formatCurrency(salaryData.otherDeductions)}</span></div>
            <div className="salary-row total"><span>Total Deductions</span><span>{formatCurrency(totalDeductions)}</span></div>
          </div>

          {/* Net Pay */}
          <div className="net-pay-section">
            <div className="net-pay-row">
              <h3>Net Pay</h3>
              <h3>{formatCurrency(salaryData.netPay)}</h3>
            </div>
            <div className="attendance-info">
              <span>Working Days: {salaryData.workingDays}</span>
              <span>Days Present: {salaryData.daysPresent}</span>
              <span>
                Attendance:{" "}
                {Math.round(
                  (salaryData.daysPresent / salaryData.workingDays) * 100
                )}%
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

            {payslipHistory.map((p, index) => (
              <div key={index} className="table-row">
                <span>{p.month}</span>
                <span>{formatCurrency(p.netPay)}</span>
                <span className={`status ${p.status.toLowerCase()}`}>
                  {p.status}
                </span>
                <span>{formatDate(p.date)}</span>
                <button
                  className="download-small"
                  onClick={() =>
                    handleDownloadPayslip(
                      p.month.toUpperCase().replace(" ", "-")
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
