package com.example.Backend.Employees.DTO;

import java.util.List;
import com.example.Backend.Employees.Entity.LeaveRequest;
import lombok.Data;

@Data
public class EmployeeLeavesResponse {

    private List<LeaveRequest> leaveHistory;
    private int totalApplications;
    private int approvedLeaves;
    private int pendingLeaves;
    private int totalDaysTaken;
}
