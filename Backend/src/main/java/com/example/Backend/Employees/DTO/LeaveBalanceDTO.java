package com.example.Backend.Employees.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LeaveBalanceDTO {

    private String leaveType;     // sick, casual, earned
    private int totalLeaves;
    private int usedLeaves;
}
