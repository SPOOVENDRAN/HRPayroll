package com.example.Backend.Employees.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Backend.Employees.Entity.Leave;

public interface LeaveRepo extends JpaRepository<Leave, Long> {
    Optional<Leave> findByEmpid(String empid);
}
