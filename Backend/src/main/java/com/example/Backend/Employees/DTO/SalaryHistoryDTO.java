package com.example.Backend.Employees.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class SalaryHistoryDTO {

    private String salaryMonth;
    private int netPay;
    private String status;
    private LocalDate paymentDate;
}
