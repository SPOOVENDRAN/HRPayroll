package com.example.Backend.HR.DTO;

import java.time.LocalDate;

import com.example.Backend.Employees.Entity.Leave;

import lombok.Data;

@Data
public class HrLeaveRequestDTO {

    private Long id;
    private String empid;
    private String leaveType;
    private LocalDate fromDate;
    private LocalDate toDate;
    private int days;
    private String status;

    public static HrLeaveRequestDTO fromEntity(Leave l) {
        HrLeaveRequestDTO dto = new HrLeaveRequestDTO();
        dto.setId(l.getId());
        dto.setEmpid(l.getEmpid());
        dto.setLeaveType(l.getLeaveType());
        dto.setFromDate(l.getFromDate());
        dto.setToDate(l.getToDate());
        dto.setDays(l.getDays());
        dto.setStatus(l.getStatus());
        return dto;
    }
}