package com.example.Backend.Employees.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Employees.DTO.EmployeeDashboardDTO;
import com.example.Backend.Employees.Entity.Attendance;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Repository.AttendanceRepo;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Repository.LeaveRepo;
import com.example.Backend.Employees.Repository.SalaryRepo;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;

    @Autowired
    private LeaveRepo leaveRepo;

    @Autowired
    private AttendanceRepo attendanceRepo;

    @Autowired
    private SalaryRepo salaryRepo;

    public EmployeeDashboardDTO getDashboard(String empid) {

        Employee employee = employeeRepo.findByEmpid(empid);
        if (employee == null) {
            throw new RuntimeException("Employee not found");
        }

        // ✅ LEAVE SUMMARY
        int approvedLeaveDays = leaveRepo.getApprovedLeaveDays(empid);
        int pendingRequests = leaveRepo.countByEmpidAndStatus(empid, "PENDING");

        int totalAnnualLeave = 24;
        int leaveBalance = totalAnnualLeave - approvedLeaveDays;

        // ✅ ATTENDANCE
        Attendance attendance =
                attendanceRepo.findTopByEmpidOrderByMonthDesc(empid);

        int presentDays = attendance != null ? attendance.getPresentDays() : 0;
        int totalDays = attendance != null ? attendance.getTotalDays() : 0;
        int overtimeHours = attendance != null ? attendance.getOvertimeHours() : 0;

        // ✅ SALARY
        Salary salary =
                salaryRepo.findTopByEmpidOrderByPaymentDateDesc(empid);

        int lastMonthSalary = salary != null ? salary.getNetPay() : 0;

        // ✅ BUILD DTO
        EmployeeDashboardDTO dto = new EmployeeDashboardDTO();
        dto.setEmployee(employee);
        dto.setLeaveBalance(leaveBalance);
        dto.setPendingRequests(pendingRequests);
        dto.setPresentDays(presentDays);
        dto.setTotalDays(totalDays);
        dto.setOvertimeHours(overtimeHours);
        dto.setLastMonthSalary(lastMonthSalary);

        // ✅ FROM EMPLOYEE ENTITY (NO MAGIC NUMBERS)
        dto.setProductivity(employee.getProductivityRate());
        dto.setGoalAchievement(employee.getGoalAchievement());

        return dto;
    }
}
