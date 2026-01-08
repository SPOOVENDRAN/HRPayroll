import { useEffect, useState } from "react";
import EmployeeSalary from "./EmployeeSalary";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const EmployessSalaryData = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [payslipHistory, setPayslipHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const token = localStorage.getItem("token");

  const fetchSalary = async (month) => {
    if (!token || !month) return;

    try {
      const res = await fetch(
        `${BASE_API_URL}/employee/salary?month=${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setSalaryData(null);
        return;
      }

      const data = await res.json();
      const s = data.salary;

      setSalaryData({
        basicPay: s.basicPay,
        hra: s.hra,
        conveyanceAllowance: s.conveyance,
        medicalAllowance: s.medical,
        specialAllowance: s.specialAllowance,
        overtimePay: s.overtimePay,
        bonus: s.bonus,
        pfDeduction: s.pf,
        professionalTax: s.professionalTax,
        tds: s.tds,
        otherDeductions: s.otherDeductions,
        netPay: s.netPay,
        workingDays: s.workingDays,
        daysPresent: s.daysPresent,
        paymentDate: s.paymentDate,
        overtimeHours: 10,
        bankAccount: "XXXXXX4567",
      });

      setPayslipHistory(
        data.history.map((h) => ({
          month: h.salaryMonth.replace("-", " "),
          rawMonth: h.salaryMonth,
          netPay: h.netPay,
          status: h.status,
          date: h.paymentDate,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  /* ✅ FIRST LOAD: fetch latest salary only */
  useEffect(() => {
    if (!token) return;

    fetch(`${BASE_API_URL}/employee/salary/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const latestMonth = data.salaryMonth;
        setSelectedMonth(latestMonth);
        fetchSalary(latestMonth);
      })
      .catch(() => setSalaryData(null));
  }, []);

  if (!salaryData) {
    return <div>No salary data available</div>;
  }

  return (
    <EmployeeSalary
      salaryData={salaryData}
      payslipHistory={payslipHistory}
      selectedMonth={selectedMonth}
      onMonthChange={fetchSalary}
    />
  );
};

export default EmployessSalaryData;
