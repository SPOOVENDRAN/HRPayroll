package com.example.Backend.Employees.DTO;

import java.time.LocalDate;
import lombok.Data;

@Data
public class ApplyLeaveDTO {

    // 🔐 injected from JWT (NOT frontend)
    private String empId;

    private String leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String reason;
    private String emergencyContact;
}
