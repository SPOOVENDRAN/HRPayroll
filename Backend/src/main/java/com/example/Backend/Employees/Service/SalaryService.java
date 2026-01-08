package com.example.Backend.Employees.Service;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.Employees.Repository.SalaryRepo;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalaryService {

    private final SalaryRepo salaryRepository;
    private final EmployeeRepo employeeRepo;

    /* =========================
       SALARY PAGE DATA
    ========================= */
    public Map<String, Object> getSalary(String empid, String month) {

        Salary salary = salaryRepository
                .findByEmpidAndSalaryMonth(empid, month)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Salary not available for selected month"
                        )
                );

        List<Salary> history =
                salaryRepository.findByEmpidOrderByPaymentDateDesc(empid);

        Map<String, Object> res = new HashMap<>();
        res.put("salary", salary);
        res.put("history", history);
        return res;
    }

    /* =========================
       DASHBOARD SUPPORT
    ========================= */
    public int getLastMonthNetPay(String empid) {

        Salary salary =
                salaryRepository.findTopByEmpidOrderByPaymentDateDesc(empid);

        return salary != null ? salary.getNetPay() : 0;
    }

    /* =========================
       PAYSLIP PDF (EMP + HR)
    ========================= */
    public byte[] generatePayslipPdf(String empid, String month) {

        Salary salary = salaryRepository
                .findByEmpidAndSalaryMonth(empid, month)
                .orElseThrow(() ->
                        new RuntimeException("Salary not found")
                );

        Employee emp = employeeRepo.findByEmpid(empid);
        if (emp == null) {
            throw new RuntimeException("Employee not found");
        }

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document doc = new Document();
            PdfWriter.getInstance(doc, out);

            doc.open();

            Font title = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font normal = new Font(Font.FontFamily.HELVETICA, 12);

            doc.add(new Paragraph("PAYSLIP", title));
            doc.add(new Paragraph(" "));
            doc.add(new Paragraph("Employee Name: " + emp.getName(), normal));
            doc.add(new Paragraph("Employee ID: " + emp.getEmpid(), normal));
            doc.add(new Paragraph("Department: " + emp.getDepartment(), normal));
            doc.add(new Paragraph("Salary Month: " + month, normal));
            doc.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            addRow(table, "Basic Pay", salary.getBasicPay());
            addRow(table, "Overtime Pay", salary.getOvertimePay());
            addRow(table, "Total Deductions", salary.getTotalDeductions());
            addRow(table, "Net Pay", salary.getNetPay());

            doc.add(table);
            doc.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Payslip generation failed", e);
        }
    }

    private void addRow(PdfPTable table, String label, int value) {
        table.addCell(new PdfPCell(new Phrase(label)));
        table.addCell(new PdfPCell(new Phrase("₹ " + value)));
    }

    /* =========================
       LATEST SALARY
    ========================= */
    public Salary getLatestSalary(String empid) {
        return salaryRepository.findTopByEmpidOrderByPaymentDateDesc(empid);
    }
}
    