package com.example.Backend.Employees.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.EmploymentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.*;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

    Employee findByEmpid(String empid);
    List<Employee> findAll();
    int countByEmploymentType(EmploymentType employmentType);
    int countByDepartment(String department);

     Page<Employee> findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrDesignationContainingIgnoreCase(
            String name,
            String department,
            String designation,
            Pageable pageable
    );
    @Modifying
        @Query("UPDATE Employee e SET e.status = :status WHERE e.id = :id")
        void updateStatus(@Param("id") Long id, @Param("status") String status);
    List<Employee> findByDeletedFalse();


}
