package com.example.Backend.Employees.DTO;

import lombok.Data;
import java.util.List;

@Data
public class EmployeeSalaryResponse {

    private SalarySummaryDTO summary;
    private SalaryBreakdownDTO breakdown;
    private List<SalaryHistoryDTO> history;
}
