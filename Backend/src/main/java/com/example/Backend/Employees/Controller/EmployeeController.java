package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.DTO.EmployeeDashboardDTO;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService dashboardService;

    @Autowired
    private EmployeeRepo employeeRepo;

    // ✅ DASHBOARD (READ-ONLY AGGREGATION)
    @GetMapping("/dashboard")
    public EmployeeDashboardDTO getDashboard(@RequestParam String empid) {
        return dashboardService.getDashboard(empid);
    }

    // ✅ EMPLOYEE CREATE (CRUD)
    @PostMapping("/add")
    public Employee addEmployee(@RequestBody Employee emp) {
        return employeeRepo.save(emp);
    }
}
