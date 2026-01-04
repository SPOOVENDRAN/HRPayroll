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
    @GeneratedValue()
    @Id
    Long id;
    @Column(unique = true)
    String empid;
    String name;
    String email;
    String phone;
    String department;
    String designation;
    String manager;
    String location;
    LocalDate joiningDate;
    String employmentType;
    Integer experience;
    Integer curr_projects;
    Integer total_projects;
}
