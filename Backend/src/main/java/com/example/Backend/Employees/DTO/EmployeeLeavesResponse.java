package com.example.Backend.Employees.DTO;

import java.util.List;
import com.example.Backend.Employees.Entity.Leave;
import lombok.Data;

@Data
public class EmployeeLeavesResponse {

    private List<Leave> leaveHistory;

    private int totalApplications;
    private int approvedLeaves;
    private int pendingLeaves;
    private int totalDaysTaken;

    // ✅ ADD THIS
    private List<LeaveBalanceDTO> leaveBalances;
}
