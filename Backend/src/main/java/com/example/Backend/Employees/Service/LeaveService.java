package com.example.Backend.Employees.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Employees.DTO.ApplyLeaveDTO;
import com.example.Backend.Employees.DTO.EmployeeLeavesResponse;
import com.example.Backend.Employees.DTO.LeaveBalanceDTO;
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

        // ✅ FIXED METHOD NAME
        if (dto.getEmpId() == null || dto.getEmpId().isBlank()) {
            throw new RuntimeException("Employee ID is required");
        }

        if (dto.getFromDate().isAfter(dto.getToDate())) {
            throw new RuntimeException("From date cannot be after To date");
        }

        // 🔹 Overlap validation
        List<Leave> existingLeaves =
            leaveRepo.findByEmpidAndStatusIn(
                dto.getEmpId(),
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
        leave.setEmpid(dto.getEmpId()); // ✅ FIXED
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
public EmployeeLeavesResponse getEmployeeLeaves(String empId) {

    List<Leave> leaves =
        leaveRepo.findByEmpidOrderByAppliedDateDesc(empId);

    EmployeeLeavesResponse res = new EmployeeLeavesResponse();
    res.setLeaveHistory(leaves);
    res.setTotalApplications(leaves.size());

    res.setApprovedLeaves(
        leaveRepo.countByEmpidAndStatus(empId, "APPROVED")
    );

    res.setPendingLeaves(
        leaveRepo.countByEmpidAndStatus(empId, "PENDING")
    );

    res.setTotalDaysTaken(
        leaveRepo.getApprovedLeaveDays(empId)
    );

    // ✅ ADD THIS LINE
    res.setLeaveBalances(buildLeaveBalances(empId));

    return res;
}


    /* =========================
       DASHBOARD SUPPORT
    ========================= */
    public int getApprovedLeaveDays(String empId) {
        return leaveRepo.getApprovedLeaveDays(empId);
    }

    public int getPendingLeaveCount(String empId) {
        return leaveRepo.countByEmpidAndStatus(empId, "PENDING");
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
    private List<LeaveBalanceDTO> buildLeaveBalances(String empId) {

    // 🔒 STATIC POLICY (can be DB later)
    int SICK_TOTAL = 10;
    int CASUAL_TOTAL = 8;
    int EARNED_TOTAL = 12;
    int MATERNITY_TOTAL = 90;
    int PATERNITY_TOTAL = 15;

    return List.of(
        new LeaveBalanceDTO(
            "sick",
            SICK_TOTAL,
            leaveRepo.getUsedLeaveDays(empId, "SICK")
        ),
        new LeaveBalanceDTO(
            "casual",
            CASUAL_TOTAL,
            leaveRepo.getUsedLeaveDays(empId, "CASUAL")
        ),
        new LeaveBalanceDTO(
            "earned",
            EARNED_TOTAL,
            leaveRepo.getUsedLeaveDays(empId, "EARNED")
        ),
        new LeaveBalanceDTO(
            "maternity",
            MATERNITY_TOTAL,
            leaveRepo.getUsedLeaveDays(empId, "MATERNITY")
        ),
        new LeaveBalanceDTO(
            "paternity",
            PATERNITY_TOTAL,
            leaveRepo.getUsedLeaveDays(empId, "PATERNITY")
        )
    );
}

}
