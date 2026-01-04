package com.example.Backend.Employees.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SalarySummaryDTO {

    private String salaryMonth;
    private int netPay;
    private int workingDays;
    private int daysPresent;
    private int attendancePercentage;
    private LocalDate paymentDate;
    private String status;
}