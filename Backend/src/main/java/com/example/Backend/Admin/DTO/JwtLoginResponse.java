package com.example.Backend.Admin.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtLoginResponse {
    private String token;
    private String role;
    private String empId;
}
