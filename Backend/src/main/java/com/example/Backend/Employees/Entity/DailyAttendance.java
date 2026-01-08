package com.example.Backend.Employees.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "daily_attendance")
public class DailyAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String empid;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String status; 
    // PRESENT, ABSENT, LEAVE

    private double hoursWorked;
}
