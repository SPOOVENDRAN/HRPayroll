package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.DTO.ApplyLeaveDTO;
import com.example.Backend.Employees.DTO.EmployeeLeavesResponse;
import com.example.Backend.Employees.Service.LeaveService;
import com.example.Backend.security.JwtUtil;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @Autowired
    private JwtUtil jwtUtil;

    // ✅ FETCH LEAVES (JWT BASED)
    @GetMapping("/leaves")
    public EmployeeLeavesResponse getEmployeeLeaves(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        return leaveService.getEmployeeLeaves(empId);
    }

    // ✅ APPLY LEAVE (THIS WAS MISSING)
    @PostMapping("/apply")
    public ResponseEntity<String> applyLeave(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ApplyLeaveDTO dto) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        dto.setEmpId(empId); // 🔐 enforce logged-in employee

        leaveService.applyLeave(dto);
        return ResponseEntity.ok("Leave applied successfully");
    }

    // ✅ CANCEL LEAVE
    @PutMapping("/cancel/{id}")
    public ResponseEntity<String> cancelLeave(@PathVariable Long id) {
        leaveService.cancelLeave(id);
        return ResponseEntity.ok("Leave cancelled successfully");
    }
}
