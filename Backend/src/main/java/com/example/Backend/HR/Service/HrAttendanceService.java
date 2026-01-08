package com.example.Backend.HR.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.Backend.Employees.Entity.DailyAttendance;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Repository.DailyAttendanceRepo;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.HR.DTO.HrDailyAttendanceDTO;
import com.example.Backend.HR.DTO.HrAttendanceSummaryDTO;

@Service
public class HrAttendanceService {

    private final DailyAttendanceRepo dailyRepo;
    private final EmployeeRepo employeeRepo;

    public HrAttendanceService(
            DailyAttendanceRepo dailyRepo,
            EmployeeRepo employeeRepo
    ) {
        this.dailyRepo = dailyRepo;
        this.employeeRepo = employeeRepo;
    }

    /* ===============================
       ATTENDANCE SUMMARY (FIXED)
    =============================== */
    public HrAttendanceSummaryDTO getSummary() {

        HrAttendanceSummaryDTO dto = new HrAttendanceSummaryDTO();

        int totalEmployees = (int) employeeRepo.count();

        List<DailyAttendance> todayRecords =
        dailyRepo.findLatestPerEmployee();


        int present = 0;
        int absent = 0;
        int onLeave = 0;
        int lateArrivals = 0;
        int overtimeHours = 0;

        for (DailyAttendance d : todayRecords) {

            switch (d.getStatus()) {
                case "PRESENT" -> present++;
                case "ABSENT" -> absent++;
                case "LEAVE" -> onLeave++;
            }

            if (d.getHoursWorked() > 8) {
                overtimeHours += (int) (d.getHoursWorked() - 8);
            }

            if (d.getHoursWorked() > 0 && d.getHoursWorked() < 8) {
                lateArrivals++;
            }
        }

        dto.setTotalEmployees(totalEmployees);
        dto.setPresent(present);
        dto.setAbsent(absent);
        dto.setOnLeave(onLeave);
        dto.setLateArrivals(lateArrivals);
        dto.setOvertimeHours(overtimeHours);

        return dto;
    }

    /* ===============================
       DAILY ATTENDANCE
    =============================== */
    public List<HrDailyAttendanceDTO> getDailyAttendance(LocalDate date) {

        List<DailyAttendance> records =
        dailyRepo.findLatestPerEmployee();


        return records.stream().map(record -> {

            HrDailyAttendanceDTO dto = new HrDailyAttendanceDTO();

            dto.setEmpid(record.getEmpid());
            dto.setDate(record.getDate());
            dto.setStatus(record.getStatus());
            dto.setHoursWorked(record.getHoursWorked());

            Employee emp = employeeRepo.findByEmpid(record.getEmpid());

            if (emp != null) {
                dto.setEmployeeName(emp.getName());
                dto.setDepartment(emp.getDepartment());
            } else {
                dto.setEmployeeName("Unknown");
                dto.setDepartment("Unknown");
            }

            return dto;

        }).collect(Collectors.toList());
    }
}
