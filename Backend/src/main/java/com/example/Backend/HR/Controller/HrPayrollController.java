package com.example.Backend.HR.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Employees.Service.SalaryService;
import com.example.Backend.HR.Service.HrPayrollService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/hr/payroll")
@RequiredArgsConstructor
public class HrPayrollController {

    private final HrPayrollService payrollService;
    private final SalaryService salaryService;

    @GetMapping
    public Map<String, Object> getPayroll(
            @RequestParam String month
    ) {
        return payrollService.getPayroll(month);
    }

    @PostMapping("/run")
    public void runPayroll(
            @RequestParam String month
    ) {
        payrollService.runPayroll(month);
    }
    @GetMapping("/months")
        public List<String> getAvailableMonths() {
            return payrollService.getAvailableMonths();
        }
    @GetMapping("/lock")
    public boolean isPayrollLocked(@RequestParam String month) {
        return payrollService.isPayrollLocked(month);
    }
    @GetMapping("/payslip")
    public ResponseEntity<byte[]> downloadPayslip(
            @RequestParam String empid,
            @RequestParam String month) {

        byte[] pdf = salaryService.generatePayslipPdf(empid, month);

        return ResponseEntity.ok()
                .header("Content-Disposition",
                        "attachment; filename=payslip-" + empid + "-" + month + ".pdf")
                .contentType(org.springframework.http.MediaType.APPLICATION_PDF)
                .body(pdf);
    }

}
