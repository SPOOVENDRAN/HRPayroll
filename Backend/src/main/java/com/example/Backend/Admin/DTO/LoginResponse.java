package com.example.Backend.Admin.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String empId;
    private String email;
    private String role;
}
