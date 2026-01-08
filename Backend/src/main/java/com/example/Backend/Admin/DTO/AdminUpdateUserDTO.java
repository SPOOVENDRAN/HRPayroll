package com.example.Backend.Admin.DTO;

import lombok.Data;

@Data
public class AdminUpdateUserDTO {

    private String name;
    private String email;
    private String department;
    private String designation;
    private Boolean active;
}
