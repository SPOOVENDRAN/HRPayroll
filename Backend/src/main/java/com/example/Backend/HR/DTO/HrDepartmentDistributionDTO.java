package com.example.Backend.HR.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrDepartmentDistributionDTO {
    private String department;
    private int totalEmployees;
    private String designationSplit;
}
