package com.example.Backend.Employees.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empid;
    private String month;

    private int presentDays;
    private int totalDays;

    // ✅ NEW
    private int overtimeHours;
}
