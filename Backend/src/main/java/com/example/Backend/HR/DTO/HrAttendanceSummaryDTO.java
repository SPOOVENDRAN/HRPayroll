package com.example.Backend.HR.DTO;

import lombok.Data;

@Data
public class HrAttendanceSummaryDTO {

    private int totalEmployees;
    private int present;
    private int absent;
    private int onLeave;
    private int lateArrivals;
    private int overtimeHours;
}
