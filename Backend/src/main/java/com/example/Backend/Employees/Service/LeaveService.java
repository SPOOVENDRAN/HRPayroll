package com.example.Backend.Employees.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.Employees.DTO.ApplyLeaveDTO;
import com.example.Backend.Employees.DTO.EmployeeLeavesResponse;
import com.example.Backend.Employees.Entity.LeaveRequest;
import com.example.Backend.Employees.Repository.LeaveRequestRepo;
import java.util.*;

@Service
public class LeaveService {

    @Autowired
    private LeaveRequestRepo leaveRequestRepo;

  public void applyLeave(ApplyLeaveDTO dto) {

    if (dto.getEmpid() == null || dto.getEmpid().isBlank()) {
        throw new RuntimeException("Employee ID is required");
    }
    if (dto.getFromDate().isAfter(dto.getToDate())) {
    throw new RuntimeException("From date cannot be after To date");
    }


    // 🔹 Overlap validation
    List<LeaveRequest> existingLeaves =
        leaveRequestRepo.findByEmpidAndStatusIn(
            dto.getEmpid(),
            List.of("PENDING", "APPROVED")
        );

    for (LeaveRequest l : existingLeaves) {
        if (isOverlapping(
                dto.getFromDate(),
                dto.getToDate(),
                l.getFromDate(),
                l.getToDate()
        )) {
            throw new RuntimeException(
                "Leave dates overlap with an existing leave"
            );
        }
    }

    LeaveRequest leave = new LeaveRequest();

    leave.setEmpid(dto.getEmpid());
    leave.setLeaveType(dto.getLeaveType());
    leave.setFromDate(dto.getFromDate());
    leave.setToDate(dto.getToDate());
    leave.setReason(dto.getReason());
    leave.setEmergencyContact(dto.getEmergencyContact());

    leave.setStatus("PENDING");
    leave.setAppliedDate(LocalDate.now());

    long days = ChronoUnit.DAYS.between(
            dto.getFromDate(),
            dto.getToDate()
    ) + 1;
    leave.setDays((int) days);

    leaveRequestRepo.save(leave);
}

    // 🔹 Cancel Leave (only PENDING)
    public void cancelLeave(Long leaveId) {

        LeaveRequest leave =
            leaveRequestRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!"PENDING".equals(leave.getStatus())) {
            throw new RuntimeException(
                "Only pending leaves can be cancelled"
            );
        }

        leave.setStatus("CANCELLED");
        leaveRequestRepo.save(leave);
    }

    // 🔹 Overlap logic
    private boolean isOverlapping(
            LocalDate from1,
            LocalDate to1,
            LocalDate from2,
            LocalDate to2
    ) {
        return !to1.isBefore(from2) && !from1.isAfter(to2);
    }
    public EmployeeLeavesResponse getEmployeeLeaves(String empid) {

    List<LeaveRequest> leaves =
        leaveRequestRepo.findByEmpidOrderByAppliedDateDesc(empid);

    EmployeeLeavesResponse res = new EmployeeLeavesResponse();
    res.setLeaveHistory(leaves);
    res.setTotalApplications(leaves.size());

    res.setApprovedLeaves(
        (int) leaves.stream()
            .filter(l -> "APPROVED".equals(l.getStatus()))
            .count()
    );

    res.setPendingLeaves(
        (int) leaves.stream()
            .filter(l -> "PENDING".equals(l.getStatus()))
            .count()
    );

    res.setTotalDaysTaken(
        leaves.stream()
            .filter(l -> "APPROVED".equals(l.getStatus()))
            .mapToInt(LeaveRequest::getDays)
            .sum()
    );

    return res;
}


}

