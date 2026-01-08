package com.example.Backend.HR.DTO;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class HrDashboardDTO {

    // ===== KPI =====
    private int totalEmployees;
    private int fullTimeEmployees;
    private int interns;
    private int noticePeriod;

    private int presentToday;
    private int absentToday;
    private double presentPercentage;
    private double absentPercentage;

    private int totalDepartments;
    private Map<String, Integer> departmentCounts;

    // ===== DASHBOARD SECTIONS =====
    private List<HrEmployeeOverviewDTO> employeeOverview;
    private List<HrEmployeePerformanceDTO> employeePerformance;
    private List<HrProjectOverviewDTO> projectOverview;
    private List<HrDepartmentDistributionDTO> departmentDistribution;
}
