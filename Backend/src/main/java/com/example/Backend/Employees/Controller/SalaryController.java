package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Service.SalaryService;
import com.example.Backend.security.JwtUtil;

@RestController
@RequestMapping("/employee/salary")
@CrossOrigin(origins = "*")
public class SalaryController {

    @Autowired
    private SalaryService salaryService;

    @Autowired
    private JwtUtil jwtUtil;

    // 🔹 GET SALARY BY MONTH
    @GetMapping
    public ResponseEntity<?> getEmployeeSalary(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String month) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        return ResponseEntity.ok(
            salaryService.getSalary(empId, month)
        );
    }

    // 🔹 DOWNLOAD PAYSLIP
    @GetMapping("/payslip")
    public ResponseEntity<byte[]> downloadPayslip(
            @RequestHeader("Authorization") String authHeader,
            @RequestParam String month) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        byte[] pdfBytes = salaryService.generatePayslipPdf(empId, month);

        return ResponseEntity.ok()
            .header(
                "Content-Disposition",
                "attachment; filename=payslip-" + empId + "-" + month + ".pdf"
            )
            .header("Content-Type", "application/pdf")
            .body(pdfBytes);
    }

    // 🔹 GET LATEST SALARY (NEW)
    @GetMapping("/latest")
    public ResponseEntity<?> getLatestSalary(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String empId = jwtUtil.extractEmpId(token);

        Salary salary = salaryService.getLatestSalary(empId);

        if (salary == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(salary);
    }
}
