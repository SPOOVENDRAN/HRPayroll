package com.example.Backend.Employees.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Backend.Employees.Entity.SalaryRecord;

public interface SalaryRecordRepo
        extends JpaRepository<SalaryRecord, Long> {

    Optional<SalaryRecord> findByEmpidAndSalaryMonth(
        String empid,
        String salaryMonth
    );

    List<SalaryRecord> findByEmpidOrderByPaymentDateDesc(String empid);
}
