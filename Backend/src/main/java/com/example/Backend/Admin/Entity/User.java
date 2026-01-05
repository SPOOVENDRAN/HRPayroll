package com.example.Backend.Admin.Entity;

import com.example.Backend.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue
  private Long id;
  
    @Column(name = "emp_id")
  private String empId;   // links to Employee.empid
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;      // ADMIN, HR, EMPLOYEE

  private boolean active = true;
}

