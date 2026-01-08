package com.example.Backend.Employees.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.Backend.Employees.Entity.Salary;

public interface SalaryRepo extends JpaRepository<Salary, Long> {

    // ✅ For dashboard
    Salary findTopByEmpidOrderByPaymentDateDesc(String empid);

    // ✅ For salary page
    Optional<Salary> findByEmpidAndSalaryMonth(String empid, String salaryMonth);

    List<Salary> findByEmpidOrderByPaymentDateDesc(String empid);

     List<Salary> findBySalaryMonth(String salaryMonth);
     @Query("select distinct s.salaryMonth from Salary s order by s.salaryMonth desc")
        List<String> findDistinctSalaryMonthOrderBySalaryMonthDesc();
    boolean existsBySalaryMonth(String salaryMonth);


}
