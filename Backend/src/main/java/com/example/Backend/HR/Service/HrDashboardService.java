package com.example.Backend.HR.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.DailyAttendance;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Repository.DailyAttendanceRepo;
import com.example.Backend.Employees.Repository.LeaveRepo;
import com.example.Backend.HR.DTO.*;

@Service
public class HrDashboardService {

    private final EmployeeRepo employeeRepo;
    private final DailyAttendanceRepo dailyAttendanceRepo;
    private final LeaveRepo leaveRepo;

    public HrDashboardService(
            EmployeeRepo employeeRepo,
            DailyAttendanceRepo dailyAttendanceRepo,
            LeaveRepo leaveRepo
    ) {
        this.employeeRepo = employeeRepo;
        this.dailyAttendanceRepo = dailyAttendanceRepo;
        this.leaveRepo = leaveRepo;
    }

    public HrDashboardDTO getDashboard() {

        HrDashboardDTO dto = new HrDashboardDTO();
        LocalDate today = LocalDate.now();

        List<Employee> employees = employeeRepo.findAll();
        dto.setTotalEmployees(employees.size());

        dto.setFullTimeEmployees(
                (int) employees.stream()
                        .filter(e -> "FULL_TIME".equals(e.getEmploymentType().name()))
                        .count()
        );

        dto.setInterns(
                (int) employees.stream()
                        .filter(e -> "INTERN".equals(e.getEmploymentType().name()))
                        .count()
        );

        dto.setNoticePeriod(0);

        /* ===============================
           DEPARTMENT COUNTS
        =============================== */
        Map<String, Integer> deptCounts = employees.stream()
                .collect(Collectors.groupingBy(
                        Employee::getDepartment,
                        Collectors.collectingAndThen(Collectors.counting(), Long::intValue)
                ));

        dto.setDepartmentCounts(deptCounts);
        dto.setTotalDepartments(deptCounts.size());

        /* ===============================
           ATTENDANCE (FIXED)
        =============================== */
        List<DailyAttendance> latestAttendance =
                dailyAttendanceRepo.findLatestPerEmployee();

        int present = 0;
        int absent = 0;

        for (DailyAttendance a : latestAttendance) {
            if ("PRESENT".equals(a.getStatus())) {
                present++;
            } else if ("ABSENT".equals(a.getStatus())) {
                absent++;
            }
        }

        dto.setPresentToday(present);
        dto.setAbsentToday(absent);

        dto.setPresentPercentage(
                dto.getTotalEmployees() == 0 ? 0 :
                        (present * 100.0) / dto.getTotalEmployees()
        );

        dto.setAbsentPercentage(
                dto.getTotalEmployees() == 0 ? 0 :
                        (absent * 100.0) / dto.getTotalEmployees()
        );

        /* ===============================
           EMPLOYEE OVERVIEW
        =============================== */
        dto.setEmployeeOverview(
                employees.stream()
                        .limit(5)
                        .map(emp -> {
                            boolean onLeave = leaveRepo
                                    .existsByEmpidAndStatusAndFromDateLessThanEqualAndToDateGreaterThanEqual(
                                            emp.getEmpid(),
                                            "APPROVED",
                                            today,
                                            today
                                    );
                            return new HrEmployeeOverviewDTO(
                                    emp.getName(),
                                    emp.getDesignation(),
                                    onLeave ? "ON_LEAVE" : "ACTIVE"
                            );
                        })
                        .toList()
        );

        /* ===============================
           PERFORMANCE OVERVIEW
        =============================== */
        dto.setEmployeePerformance(
                employees.stream()
                        .limit(5)
                        .map(emp -> {
                            int avg =
                                    (emp.getProductivityRate() + emp.getGoalAchievement()) / 2;
                            String performance =
                                    avg >= 80 ? "GOOD" :
                                    avg >= 60 ? "AVERAGE" : "POOR";
                            return new HrEmployeePerformanceDTO(
                                    emp.getName(),
                                    performance
                            );
                        })
                        .toList()
        );

        /* ===============================
           PROJECT OVERVIEW
        =============================== */
        dto.setProjectOverview(
                employees.stream()
                        .limit(5)
                        .map(emp -> new HrProjectOverviewDTO(
                                emp.getName(),
                                emp.getDesignation(),
                                emp.getDepartment(),
                                emp.getCurrProjects(),
                                emp.getProductivityRate()
                        ))
                        .toList()
        );

        /* ===============================
           DEPARTMENT DISTRIBUTION
        =============================== */
        dto.setDepartmentDistribution(
                deptCounts.entrySet()
                        .stream()
                        .map(e -> new HrDepartmentDistributionDTO(
                                e.getKey(),
                                e.getValue(),
                                "Auto-calculated"
                        ))
                        .toList()
        );

        return dto;
    }
}
