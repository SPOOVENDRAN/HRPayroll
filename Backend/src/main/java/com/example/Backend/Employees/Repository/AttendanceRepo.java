package com.example.Backend.Employees.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Backend.Employees.Entity.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    Attendance findTopByEmpidOrderByMonthDesc(String empid);
}

