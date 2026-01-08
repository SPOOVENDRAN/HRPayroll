import { useEffect, useState } from "react";
import Payroll from "./Payroll";
export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const PayrollData = () => {

  const [month, setMonth] = useState("FEBRUARY-2024");
  const [summary, setSummary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState([]);
  const [locked, setLocked] = useState(false);

  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  /* ===============================
     FETCH PAYROLL DATA
  =============================== */
  const fetchPayroll = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_API_URL}/hr/payroll?month=${month}`,
        { headers }
      );

      if (!res.ok) {
        console.error("Payroll API failed:", res.status);
        setSummary({
          monthlyPayroll: 0,
          processedEmployees: 0,
          pendingPayroll: 0,
          overtimeAmount: 0,
        });
        setEmployees([]);
        return;
      }

      const data = await res.json();

      setSummary(data.summary);
      setEmployees(data.employees || []);

    } catch (err) {
      console.error("Payroll fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     RUN PAYROLL
  =============================== */
  const runPayroll = async () => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/hr/payroll/run?month=${month}`,
      { method: "POST", headers }
    );

    if (!res.ok) {
      alert("Payroll already processed for this month");
      return;
    }

    alert("✅ Payroll successfully processed");
    fetchPayroll();
    fetchPayrollLock();

  } catch (err) {
    console.error(err);
  }
};

  /* ===============================
     DOWNLOAD PAYSLIP
  =============================== */
  const downloadPayslip = async (empId) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/hr/payroll/payslip?empid=${empId}&month=${month}`,
      { headers }
    );

    if (!res.ok) {
      console.error("Payslip download failed");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${empId}-${month}-Payslip.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error("Payslip error", err);
  }
};


  const fetchMonths = async () => {
  const res = await fetch(`${BASE_API_URL}/hr/payroll/months`, { headers });
  if (res.ok) {
    const data = await res.json();
    setMonths(data);
    if (!data.includes(month)) {
      setMonth(data[0]); // auto select latest
    }
  }
    };
    const fetchPayrollLock = async () => {
  const res = await fetch(
    `${BASE_API_URL}/hr/payroll/lock?month=${month}`,
    { headers }
  );
  if (res.ok) {
    const data = await res.json();
    setLocked(data);
  }
};

useEffect(() => {
  fetchMonths();
}, []);


 useEffect(() => {
  if (month) {
    fetchPayroll();
    fetchPayrollLock();
  }
}, [month]);


  if (loading) return <div style={{ padding: 20 }}>Loading payroll...</div>;
return (
  <Payroll
    summary={summary}
    employees={employees}
    month={month}
    setMonth={setMonth}
    runPayroll={runPayroll}
    downloadPayslip={downloadPayslip}
    months={months}
    locked={locked}
  />
);

};

export default PayrollData;
