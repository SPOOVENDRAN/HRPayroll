package com.example.Backend.HR.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.Entity.Leave;
import com.example.Backend.HR.Service.HrLeaveService;

@RestController
@RequestMapping("/hr/leaves")
public class HrLeaveController {

    private final HrLeaveService service;

    public HrLeaveController(HrLeaveService service) {
        this.service = service;
    }

    // ✅ REQUIRED FOR FRONTEND
    @GetMapping("/pending")
    public List<Leave> getPendingLeaves() {
        return service.getPendingLeaves();
    }

    @PutMapping("/{id}/approve")
    public void approveLeave(@PathVariable Long id) {
        service.approveLeave(id);
    }

    @PutMapping("/{id}/reject")
    public void rejectLeave(@PathVariable Long id) {
        service.rejectLeave(id);
    }
}
