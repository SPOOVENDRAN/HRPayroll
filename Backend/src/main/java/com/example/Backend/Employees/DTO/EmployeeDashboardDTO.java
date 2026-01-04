package com.example.Backend.Employees.DTO;

import com.example.Backend.Employees.Entity.Employee;

import lombok.Data;

@Data
public class EmployeeDashboardDTO {

    private Employee employee;

    private int leaveBalance;
    private int presentDays;
    private int totalDays;

    private double lastMonthSalary;
    private String salaryMonth;

    private int overtimeHours;
    private int pendingRequests;
    private int activeProjects;

    private int attendanceScore;
    private int productivity;
    private int goalAchievement;

    // getters & setters
}

