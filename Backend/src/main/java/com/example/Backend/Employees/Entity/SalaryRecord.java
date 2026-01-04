package com.example.Backend.Employees.Entity;

import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "salary_record")
@Data
public class SalaryRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empid;
    private String salaryMonth;

    // Earnings
    private int basicPay;
    private int hra;
    private int conveyance;
    private int medical;
    private int specialAllowance;
    private int overtimePay;
    private int bonus;

    // Deductions
    private int pf;
    private int professionalTax;
    private int tds;
    private int otherDeductions;

    // Attendance
    private int workingDays;
    private int daysPresent;

    // Totals
    private int totalEarnings;
    private int totalDeductions;
    private int netPay;

    private LocalDate paymentDate;
    private String status; // PAID / PENDING
}
