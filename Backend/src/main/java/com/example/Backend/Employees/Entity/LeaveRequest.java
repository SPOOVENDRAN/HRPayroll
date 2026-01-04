package com.example.Backend.Employees.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "leave_request")
@Data
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String empid;


    private String leaveType;   // SICK, CASUAL, EARNED etc

    private LocalDate fromDate;
    private LocalDate toDate;

    private int days;

    private String reason;
    private String emergencyContact;

    private String status;      // PENDING, APPROVED, REJECTED

    private LocalDate appliedDate;

    // getters and setters
}
