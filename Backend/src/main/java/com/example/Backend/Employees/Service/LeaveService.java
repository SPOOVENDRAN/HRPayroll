package com.example.Backend.Employees.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Employees.DTO.ApplyLeaveDTO;
import com.example.Backend.Employees.DTO.EmployeeLeavesResponse;
import com.example.Backend.Employees.Entity.Leave;
import com.example.Backend.Employees.Repository.LeaveRepo;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepo leaveRepo;

    /* =========================
       APPLY LEAVE
    ========================= */
    public void applyLeave(ApplyLeaveDTO dto) {

        if (dto.getEmpid() == null || dto.getEmpid().isBlank()) {
            throw new RuntimeException("Employee ID is required");
        }

        if (dto.getFromDate().isAfter(dto.getToDate())) {
            throw new RuntimeException("From date cannot be after To date");
        }

        // 🔹 Overlap validation
        List<Leave> existingLeaves =
            leaveRepo.findByEmpidAndStatusIn(
                dto.getEmpid(),
                List.of("PENDING", "APPROVED")
            );

        for (Leave l : existingLeaves) {
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

        Leave leave = new Leave();
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

        leaveRepo.save(leave);
    }

    /* =========================
       CANCEL LEAVE
    ========================= */
    public void cancelLeave(Long leaveId) {

        Leave leave =
            leaveRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        if (!"PENDING".equals(leave.getStatus())) {
            throw new RuntimeException(
                "Only pending leaves can be cancelled"
            );
        }

        leave.setStatus("CANCELLED");
        leaveRepo.save(leave);
    }

    /* =========================
       LEAVE PAGE DATA
    ========================= */
    public EmployeeLeavesResponse getEmployeeLeaves(String empid) {

        List<Leave> leaves =
            leaveRepo.findByEmpidOrderByAppliedDateDesc(empid);

        EmployeeLeavesResponse res = new EmployeeLeavesResponse();
        res.setLeaveHistory(leaves);
        res.setTotalApplications(leaves.size());

        res.setApprovedLeaves(
            leaveRepo.countByEmpidAndStatus(empid, "APPROVED")
        );

        res.setPendingLeaves(
            leaveRepo.countByEmpidAndStatus(empid, "PENDING")
        );

        res.setTotalDaysTaken(
            leaveRepo.getApprovedLeaveDays(empid)
        );

        return res;
    }

    /* =========================
       DASHBOARD SUPPORT
    ========================= */
    public int getApprovedLeaveDays(String empid) {
        return leaveRepo.getApprovedLeaveDays(empid);
    }

    public int getPendingLeaveCount(String empid) {
        return leaveRepo.countByEmpidAndStatus(empid, "PENDING");
    }

    /* =========================
       UTIL
    ========================= */
    private boolean isOverlapping(
            LocalDate from1,
            LocalDate to1,
            LocalDate from2,
            LocalDate to2
    ) {
        return !to1.isBefore(from2) && !from1.isAfter(to2);
    }
}
