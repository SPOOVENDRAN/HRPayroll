package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.Employees.DTO.EmployeeDashboardDTO;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepo employeeRepo;

    @GetMapping("/dashboard")
    public EmployeeDashboardDTO getDashboard(@RequestParam String empid) {
        return employeeService.getDashboard(empid);
    }

    @PostMapping("/add")
    public Employee addEmployee(@RequestBody Employee emp) {
        return employeeRepo.save(emp);
    }

}

