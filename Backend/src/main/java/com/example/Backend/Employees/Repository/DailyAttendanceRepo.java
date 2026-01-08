package com.example.Backend.Employees.Repository;

import java.time.LocalDate;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Backend.Employees.Entity.DailyAttendance;

public interface DailyAttendanceRepo extends JpaRepository<DailyAttendance, Long> {

    @Query("""
        SELECT COUNT(d)
        FROM DailyAttendance d
        WHERE d.date = :today
          AND d.status = 'PRESENT'
    """)
    int countPresentToday(LocalDate today);

    @Query("""
  SELECT d FROM DailyAttendance d
  WHERE d.date = (
    SELECT MAX(d2.date)
    FROM DailyAttendance d2
    WHERE d2.empid = d.empid
  )
""")
List<DailyAttendance> findLatestPerEmployee();


    int countByStatus(String status);

    boolean existsByEmpidAndDate(String empid, LocalDate date);

    List<DailyAttendance> findByEmpidAndDateBetween(
            String empid,
            LocalDate from,
            LocalDate to
    );
    
}
