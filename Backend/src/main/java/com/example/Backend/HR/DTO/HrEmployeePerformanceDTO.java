package com.example.Backend.HR.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrEmployeePerformanceDTO {
    private String name;
    private String performance;
}
