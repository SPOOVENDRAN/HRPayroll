package com.example.Backend.Employees.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Backend.Employees.Entity.LeaveRequest;
import java.util.*;

public interface LeaveRequestRepo  extends JpaRepository<LeaveRequest, Long> {

    List<LeaveRequest> findByEmpidOrderByAppliedDateDesc(String empid);
    List<LeaveRequest> findByEmpidAndStatusIn( String empid, List<String> statuses );
    List<LeaveRequest> findByEmpid(String empid);
}

