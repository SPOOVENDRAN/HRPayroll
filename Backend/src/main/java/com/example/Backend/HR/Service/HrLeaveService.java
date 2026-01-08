package com.example.Backend.HR.Service;

import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*; 
import com.example.Backend.Employees.Entity.DailyAttendance;
import com.example.Backend.Employees.Entity.Leave;
import com.example.Backend.Employees.Repository.DailyAttendanceRepo;
import com.example.Backend.Employees.Repository.LeaveRepo;

@Service
public class HrLeaveService {

    private final LeaveRepo leaveRepo;
    private final DailyAttendanceRepo dailyAttendanceRepo;

    public HrLeaveService(
            LeaveRepo leaveRepo,
            DailyAttendanceRepo dailyAttendanceRepo
    ) {
        this.leaveRepo = leaveRepo;
        this.dailyAttendanceRepo = dailyAttendanceRepo;
    }

    @Transactional
    public void approveLeave(Long leaveId) {

        Leave leave = leaveRepo.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave not found"));

        // 1️⃣ Update leave status
        leave.setStatus("APPROVED");
        leaveRepo.save(leave);

        // 2️⃣ Mark daily attendance as LEAVE
        LocalDate date = leave.getFromDate();

        while (!date.isAfter(leave.getToDate())) {

            if (!dailyAttendanceRepo.existsByEmpidAndDate(
                    leave.getEmpid(), date)) {

                DailyAttendance attendance = new DailyAttendance();
                attendance.setEmpid(leave.getEmpid());
                attendance.setDate(date);
                attendance.setStatus("LEAVE");
                attendance.setHoursWorked(0);

                dailyAttendanceRepo.save(attendance);
            }

            date = date.plusDays(1);
        }
    }

    public List<Leave> getPendingLeaves() {
    return leaveRepo.findAll()
            .stream()
            .filter(l -> "PENDING".equals(l.getStatus()))
            .toList();
}



@Transactional
public void rejectLeave(Long id) {
    Leave leave = leaveRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Leave not found"));

    leave.setStatus("REJECTED");
    leaveRepo.save(leave);   // ✅ REQUIRED
}


}
