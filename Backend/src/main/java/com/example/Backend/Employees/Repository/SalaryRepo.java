package com.example.Backend.Employees.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Backend.Employees.Entity.Salary;

public interface SalaryRepo extends JpaRepository<Salary, Long> {
    Salary findTopByEmpidOrderByIdDesc(String empid);
}
