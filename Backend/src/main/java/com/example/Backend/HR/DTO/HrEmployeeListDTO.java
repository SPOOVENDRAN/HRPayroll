package com.example.Backend.HR.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HrEmployeeListDTO {

    private Long id;
    private String empid;
    private String name;
    private String role;
    private String department;
    private String status;
    private String email;
    private String joinDate; // formatted
}
