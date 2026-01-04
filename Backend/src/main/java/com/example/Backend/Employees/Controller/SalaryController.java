package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Repository.SalaryRepo;

@RestController
@RequestMapping("/salary")
@CrossOrigin("*")
public class SalaryController {

    @Autowired
    private SalaryRepo salaryRepo;

    @PostMapping("/add")
    public Salary addSalary(@RequestBody Salary salary) {
        return salaryRepo.save(salary);
    }
}

