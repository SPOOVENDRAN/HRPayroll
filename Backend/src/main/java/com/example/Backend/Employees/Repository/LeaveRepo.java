package com.example.Backend.Employees.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.Backend.Employees.Entity.Leave;

public interface LeaveRepo extends JpaRepository<Leave, Long> {

    // For dashboard
    int countByEmpidAndStatus(String empid, String status);

    @Query("""
        SELECT COALESCE(SUM(l.days), 0)
        FROM Leave l
        WHERE l.empid = :empid AND l.status = 'APPROVED'
    """)
    int getApprovedLeaveDays(String empid);

    // For leave page
    List<Leave> findByEmpidOrderByAppliedDateDesc(String empid);

    List<Leave> findByEmpidAndStatusIn(String empid, List<String> statuses);
    
    @Query("""
   SELECT COALESCE(SUM(l.days),0)
   FROM Leave l
   WHERE l.empid = :empid
     AND l.leaveType = :type
     AND l.status = 'APPROVED'
    """)

    int getUsedLeaveDays(
    @Param("empid") String empid,
    @Param("type") String type
);
}
