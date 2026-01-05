package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.DTO.EmployeeDashboardDTO;
import com.example.Backend.Employees.Service.EmployeeService;
import com.example.Backend.security.JwtUtil;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService dashboardService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/dashboard")
    public EmployeeDashboardDTO getDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        return dashboardService.getDashboard(empId);
    }
}

