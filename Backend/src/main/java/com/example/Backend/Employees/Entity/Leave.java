package com.example.Backend.Employees.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "leaves")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String empid;
    private int totalLeaves;
    private int usedLeaves;
}
