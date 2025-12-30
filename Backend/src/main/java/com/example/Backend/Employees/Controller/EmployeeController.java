package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Service.EmployeeService;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @PostMapping("/post")
    public ResponseEntity<?> setData(@RequestBody Employee emp){
        return new ResponseEntity<>(employeeService.setData(emp),HttpStatus.CREATED);
    }

    @GetMapping("/print")
    public ResponseEntity<?> hello(@RequestParam String empid){
        return new ResponseEntity<>( employeeService.getData(empid), HttpStatus.OK);
    }
}
