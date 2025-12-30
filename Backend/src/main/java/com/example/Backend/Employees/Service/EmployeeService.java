package com.example.Backend.Employees.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Repository.EmployeeRepo;

@Service
public class EmployeeService {
    @Autowired
    EmployeeRepo employeeRepo;

    public Employee setData(Employee emp){
        return employeeRepo.save(emp);
    }

    public Employee getData(String empid){
        return employeeRepo.findByempid(empid);
    }
}
