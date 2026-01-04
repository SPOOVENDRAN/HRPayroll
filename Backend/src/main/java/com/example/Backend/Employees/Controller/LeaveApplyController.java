package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Employees.DTO.ApplyLeaveDTO;
import com.example.Backend.Employees.DTO.EmployeeLeavesResponse;
import com.example.Backend.Employees.Service.LeaveService;
@RestController
@RequestMapping("/employee")
@CrossOrigin("*")
public class LeaveApplyController {

    @Autowired
    private LeaveService leaveService;

    // Apply Leave
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(
            @RequestBody ApplyLeaveDTO dto
    ) {

    leaveService.applyLeave(dto);
    return ResponseEntity.ok("Leave applied successfully");
    }

    // Cancel Leave
   @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelLeave(@PathVariable Long id) {
        leaveService.cancelLeave(id);
        return ResponseEntity.ok("Leave cancelled successfully");
    }
   @GetMapping("/leaves")
    public EmployeeLeavesResponse getEmployeeLeaves(@RequestParam String empid) {
        return leaveService.getEmployeeLeaves(empid);
    }

}
