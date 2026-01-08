package com.example.Backend.Admin.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDashboardOverviewDTO {
    private long totalUsers;
    private long activeUsers;
    private long totalEmployees;
}
