package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Employees.Service.SalaryService;

@RestController
@RequestMapping("/employee/salary")
@CrossOrigin("*")
public class SalaryPageController {

    @Autowired
    private SalaryService salaryService;

    @GetMapping
    public ResponseEntity<?> getEmployeeSalary(
            @RequestParam String empid,
            @RequestParam String month
    ) {
        System.out.println("SALARY API HIT => empid=" + empid + ", month=" + month);
        return ResponseEntity.ok(
            salaryService.getSalary(empid, month)
        );
    }
      @GetMapping("/payslip")
    public ResponseEntity<byte[]> downloadPayslip(
            @RequestParam String empid,
            @RequestParam String month
    ) {
        byte[] pdfBytes = salaryService.generatePayslipPdf(empid, month);

        return ResponseEntity.ok()
                .header("Content-Disposition",
                        "attachment; filename=payslip-" + empid + "-" + month + ".pdf")
                .header("Content-Type", "application/pdf")
                .body(pdfBytes);
    }
}
