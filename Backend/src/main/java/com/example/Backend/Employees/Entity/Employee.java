package com.example.Backend.Employees.Entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue
    private Long id;

    @Column(unique = true)
    private String empid;

    private String name;
    private String email;
    private String phone;
    private String department;
    private String designation;
    private String manager;
    private String location;
    private LocalDate joiningDate;
    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    private String status;
    private Integer experience;
     @Column(name = "curr_projects")
    private Integer currProjects;

    @Column(name = "total_projects")
    private Integer totalProjects;

    // ✅ NEW (PERSISTENT KPIs)
    private int productivityRate;     // example: 85 (%)
    private int goalAchievement;   
    @Column(nullable = false)      // example: 90 (%)
    private Boolean deleted = false;;
}
