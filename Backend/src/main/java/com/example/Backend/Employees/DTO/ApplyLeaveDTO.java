package com.example.Backend.Employees.DTO;

import java.time.LocalDate;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
public class ApplyLeaveDTO {

    private String empid;
    private String leaveType;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fromDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate toDate;

    private String reason;
    private String emergencyContact;

    // getters & setters
}


