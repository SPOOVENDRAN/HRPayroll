package com.example.Backend.Employees.Service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Employees.DTO.EmployeeDashboardDTO;
import com.example.Backend.Employees.Entity.Attendance;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.Leave;
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

        Leave leave = leaveRepo.findByEmpid(empid).orElse(null);
        int leaveBalance = leave.getTotalLeaves() - leave.getUsedLeaves();

        Attendance attendance =
            attendanceRepo.findByEmpidAndMonth(empid, getCurrentMonth());

        Salary salary =
            salaryRepo.findTopByEmpidOrderByIdDesc(empid);

        EmployeeDashboardDTO dto = new EmployeeDashboardDTO();

        dto.setEmployee(employee);
        dto.setLeaveBalance(leaveBalance);
        dto.setPresentDays(attendance.getPresentDays());
        dto.setTotalDays(attendance.getTotalDays());
        dto.setLastMonthSalary(salary.getAmount());
        dto.setSalaryMonth(salary.getMonth());

        // temporary / calculated values
        dto.setOvertimeHours(8);
        dto.setPendingRequests(1);
        dto.setActiveProjects(3);

        int attendancePercent =
            (attendance.getPresentDays() * 100) / attendance.getTotalDays();
        dto.setAttendanceScore(attendancePercent);
        dto.setProductivity(85);
        dto.setGoalAchievement(92);

        return dto;
    }

    private String getCurrentMonth() {
        return LocalDate.now().getMonth().name();
    }
}

