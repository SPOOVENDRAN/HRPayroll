package com.example.Backend.Employees.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.Backend.Employees.Entity.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long> {

    // Last attendance record per employee (already correct)
    Attendance findTopByEmpidOrderByMonthDesc(String empid);
   Attendance findByEmpidAndMonth(String empid, String month);

}
