package com.example.Backend.HR.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.Backend.Employees.Entity.Attendance;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Repository.AttendanceRepo;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Repository.SalaryRepo;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HrPayrollService {

    private final EmployeeRepo employeeRepo;
    private final SalaryRepo salaryRepo;
    private final AttendanceRepo attendanceRepo;

    /* ===============================
       PAYROLL DASHBOARD DATA
    =============================== */
    public Map<String, Object> getPayroll(String month) {

    List<Salary> salaries = salaryRepo.findBySalaryMonth(month);

    int monthlyPayroll = salaries.stream()
            .mapToInt(Salary::getNetPay)
            .sum();

    long processed = salaries.stream()
            .filter(s -> "PAID".equalsIgnoreCase(s.getStatus()))
            .count();

    long pending = salaries.size() - processed;

    int overtimeAmount = salaries.stream()
            .mapToInt(Salary::getOvertimePay)
            .sum();

    Map<String, Object> summary = Map.of(
            "monthlyPayroll", monthlyPayroll,
            "processedEmployees", processed,
            "pendingPayroll", pending,
            "overtimeAmount", overtimeAmount
    );

    List<Map<String, Object>> employees = salaries.stream()
        .map(s -> {

            Employee e = employeeRepo.findByEmpid(s.getEmpid());

            // ✅ HARD SAFETY CHECK
            if (e == null) {
                return null;
            }

            Map<String, Object> empMap = new java.util.HashMap<>();
            empMap.put("empId", e.getEmpid());
            empMap.put("name", e.getName());
            empMap.put("department", e.getDepartment());
            empMap.put("basic", s.getBasicPay());
            empMap.put("deductions", s.getTotalDeductions());
            empMap.put("net", s.getNetPay());
            empMap.put(
                "status",
                "PAID".equalsIgnoreCase(s.getStatus())
                    ? "Processed"
                    : "Pending"
            );

            return empMap;
        })
        .filter(java.util.Objects::nonNull) // ✅ REMOVE BROKEN RECORDS
        .toList();

    return Map.of(
            "summary", summary,
            "employees", employees
    );
}

    /* ===============================
       RUN PAYROLL (CALCULATED)
    =============================== */
    @Transactional
    public void runPayroll(String month) {

        if (salaryRepo.existsBySalaryMonth(month)) {
            throw new IllegalStateException("Payroll already processed for " + month);
        }
        List<Employee> employees = employeeRepo.findAll();

        for (Employee e : employees) {

            // Skip already processed salary
            if (salaryRepo.findByEmpidAndSalaryMonth(e.getEmpid(), month).isPresent()) {
                continue;
            }

            Attendance att =
                    attendanceRepo.findByEmpidAndMonth(e.getEmpid(), month);

            if (att == null) continue;

            // 🔢 CALCULATION LOGIC
            int baseMonthlySalary = 30000; // later make per employee
            int perDaySalary = baseMonthlySalary / att.getTotalDays();
            int earnedBasic = perDaySalary * att.getPresentDays();

            int overtimePay = att.getOvertimeHours() * 200;
            int deductions = 2000;

            int totalEarnings = earnedBasic + overtimePay;
            int netPay = totalEarnings - deductions;

            Salary salary = new Salary();
            salary.setEmpid(e.getEmpid());
            salary.setSalaryMonth(month);

            salary.setBasicPay(earnedBasic);
            salary.setOvertimePay(overtimePay);
            salary.setTotalEarnings(totalEarnings);
            salary.setTotalDeductions(deductions);
            salary.setNetPay(netPay);

            salary.setStatus("PAID");
            salary.setPaymentDate(LocalDate.now());

            salaryRepo.save(salary);
        }
    }
    public List<String> getAvailableMonths() {
            return salaryRepo.findDistinctSalaryMonthOrderBySalaryMonthDesc();
    }
    public boolean isPayrollLocked(String month) {
        return salaryRepo.existsBySalaryMonth(month);
    }


}
