import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmployeeSalary from "./EmployeeSalary";

const EmployeeSalaryData = () => {
  const { empid } = useParams();

  const [salaryData, setSalaryData] = useState(null);
  const [payslipHistory, setPayslipHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("JANUARY-2024");

  const fetchSalary = async (month) => {
    try {
      const res = await fetch(
        `http://localhost:8080/employee/salary?empid=${empid}&month=${month}`
      );

      if (!res.ok) {
        console.error("Salary API failed:", res.status);
        return;
      }

      const data = await res.json();

      // 🔴 HARD GUARD
      if (!data || !data.salary) {
        console.error("Invalid salary response:", data);
        return;
      }

      const s = data.salary;

      // ✅ MAP BACKEND → UI FIELD NAMES
      setSalaryData({
        basicPay: s.basicPay ?? 0,
        hra: s.hra ?? 0,
        conveyanceAllowance: s.conveyance ?? 0,
        medicalAllowance: s.medical ?? 0,
        specialAllowance: s.specialAllowance ?? 0,
        overtimePay: s.overtimePay ?? 0,
        bonus: s.bonus ?? 0,

        pfDeduction: s.pf ?? 0,
        professionalTax: s.professionalTax ?? 0,
        tds: s.tds ?? 0,
        otherDeductions: s.otherDeductions ?? 0,

        netPay: s.netPay ?? 0,
        workingDays: s.workingDays ?? 0,
        daysPresent: s.daysPresent ?? 0,
        paymentDate: s.paymentDate,

        overtimeHours: 10,
        bankAccount: "XXXXXX4567" // frontend-only
      });

      // ✅ HISTORY
      setPayslipHistory(
        Array.isArray(data.history)
          ? data.history.map(h => ({
              month: h.salaryMonth.replace("-", " "),
              netPay: h.netPay ?? 0,
              status: h.status,
              date: h.paymentDate
            }))
          : []
      );

      setSelectedMonth(month);
    } catch (err) {
      console.error("Salary fetch error:", err);
    }
  };

  useEffect(() => {
    if (empid) fetchSalary(selectedMonth);
  }, [empid]);

  if (!salaryData) {
    return <div>Loading salary...</div>;
  }

  return (
    <EmployeeSalary
      salaryData={salaryData}
      payslipHistory={payslipHistory}
      selectedMonth={selectedMonth}
      onMonthChange={fetchSalary}
      empId={empid}
    />
  );
};

export default EmployeeSalaryData;
