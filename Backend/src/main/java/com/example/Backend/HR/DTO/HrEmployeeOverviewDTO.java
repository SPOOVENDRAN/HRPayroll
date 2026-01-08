package com.example.Backend.HR.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrEmployeeOverviewDTO {
    private String name;
    private String role;
    private String status;
}
    