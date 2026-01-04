package com.example.Backend.Employees.DTO;

import lombok.Data;

@Data
public class SalaryBreakdownDTO {

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

    private int totalEarnings;
    private int totalDeductions;
}
