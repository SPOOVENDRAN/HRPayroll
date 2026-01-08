package com.example.Backend.HR.DTO;

import java.time.LocalDate;
import lombok.Data;

@Data
public class HrDailyAttendanceDTO {

    private String empid;
    private String employeeName;
    private String department;

    private LocalDate date;
    private String status;
    private double hoursWorked;
}
