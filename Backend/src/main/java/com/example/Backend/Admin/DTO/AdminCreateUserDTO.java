package com.example.Backend.Admin.DTO;

import lombok.Data;
@Data
public class AdminCreateUserDTO {

    private String type;
    private String empid;
    private String name;
    private String email;
    private String password;

    private String department;
    private String designation;

    private String employmentType; // FULL_TIME
    private Integer experience;
    private Integer currProjects;
    private Integer totalProjects;
    private Integer productivityRate;
    private Integer goalAchievement;

    private String joiningDate; // yyyy-MM-dd
    private String location;
    private String manager;
    private String phone;
}


