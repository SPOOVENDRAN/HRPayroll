package com.example.Backend.Employees.Entity;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
    private String employmentType;

    private Integer experience;
    private Integer curr_projects;
    private Integer total_projects;

    // ✅ NEW (PERSISTENT KPIs)
    private int productivityRate;     // example: 85 (%)
    private int goalAchievement;      // example: 90 (%)
}
