package com.example.Backend.HR.Controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.Backend.HR.DTO.HrAttendanceSummaryDTO;
import com.example.Backend.HR.DTO.HrDailyAttendanceDTO;
import com.example.Backend.HR.Service.HrAttendanceService;

@RestController
@RequestMapping("/hr/attendance")
public class HrAttendanceController {

    private final HrAttendanceService service;

    public HrAttendanceController(HrAttendanceService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    public HrAttendanceSummaryDTO getSummary() {
        return service.getSummary();
    }

    @GetMapping("/daily")
    public List<HrDailyAttendanceDTO> getDailyAttendance(
            @RequestParam(required = false) String date
    ) {
        LocalDate targetDate = date == null
                ? LocalDate.now()
                : LocalDate.parse(date);

        return service.getDailyAttendance(targetDate);
    }
}
