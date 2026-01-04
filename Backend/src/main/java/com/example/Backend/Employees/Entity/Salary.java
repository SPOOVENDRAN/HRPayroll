package com.example.Backend.Employees.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Salary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String empid;
    private double amount;
    private String month;

    // getters & setters
}


