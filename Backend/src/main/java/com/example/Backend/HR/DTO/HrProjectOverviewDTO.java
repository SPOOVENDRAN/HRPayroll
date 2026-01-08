package com.example.Backend.HR.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrProjectOverviewDTO {
    private String name;
    private String role;
    private String department;
    private int currentProjects;
    private int progress;
}
