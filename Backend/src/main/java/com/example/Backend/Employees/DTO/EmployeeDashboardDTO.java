package com.example.Backend.Employees.DTO;

import com.example.Backend.Employees.Entity.Employee;
import lombok.Data;

@Data
public class EmployeeDashboardDTO {

    private Employee employee;

    // Leave
    private int leaveBalance;
    private int pendingRequests;

    // Attendance
    private int presentDays;
    private int totalDays;
    private int overtimeHours;

    // Salary
    private int lastMonthSalary;

    // KPIs
    private int productivity;
    private int goalAchievement;
}
