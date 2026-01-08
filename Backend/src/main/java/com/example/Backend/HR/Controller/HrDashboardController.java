package com.example.Backend.HR.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.HR.DTO.HrDashboardDTO;
import com.example.Backend.HR.Service.HrDashboardService;

@RestController
@RequestMapping("/hr")
public class HrDashboardController {

    private final HrDashboardService service;

    public HrDashboardController(HrDashboardService service) {
        this.service = service;
    }

    @GetMapping("/dashboard")
    public HrDashboardDTO getDashboard() {
        return service.getDashboard();
    }
}
