package com.example.Backend.Employees.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Backend.Employees.Entity.Employee;

public interface EmployeeRepo extends JpaRepository<Employee , Long>{
    public Employee findByempid(String empid);
}
