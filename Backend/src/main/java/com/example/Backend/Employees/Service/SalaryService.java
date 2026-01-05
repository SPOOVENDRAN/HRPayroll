package com.example.Backend.Employees.Service;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.Backend.Employees.Entity.Salary;
import com.example.Backend.Employees.Repository.SalaryRepo;
import com.itextpdf.text.Document;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@Service
public class SalaryService {

    @Autowired
    private SalaryRepo salaryRepository;

    /* =========================
       SALARY PAGE DATA
    ========================= */
   public Map<String, Object> getSalary(String empid, String month) {

    Optional<Salary> salaryOpt =
        salaryRepository.findByEmpidAndSalaryMonth(empid, month);

    if (salaryOpt.isEmpty()) {
        throw new ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "Salary not available for selected month"
        );
    }

    Salary salary = salaryOpt.get();

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
       PAYSLIP PDF
    ========================= */
    public byte[] generatePayslipPdf(String empid, String month) {

        Salary salary =
            salaryRepository
                .findByEmpidAndSalaryMonth(empid, month)
                .orElseThrow(() ->
                    new RuntimeException("Salary not found")
                );

        try {
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD);
            Font normalFont = new Font(Font.FontFamily.HELVETICA, 12);

            document.add(new Paragraph("Payslip", titleFont));
            document.add(new Paragraph("Employee ID: " + empid, normalFont));
            document.add(new Paragraph("Salary Month: " + month, normalFont));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(2);
            table.setWidthPercentage(100);

            addRow(table, "Basic Pay", salary.getBasicPay());
            addRow(table, "HRA", salary.getHra());
            addRow(table, "Conveyance", salary.getConveyance());
            addRow(table, "Medical", salary.getMedical());
            addRow(table, "Special Allowance", salary.getSpecialAllowance());
            addRow(table, "Overtime Pay", salary.getOvertimePay());
            addRow(table, "Bonus", salary.getBonus());

            addRow(table, "PF", salary.getPf());
            addRow(table, "Professional Tax", salary.getProfessionalTax());
            addRow(table, "TDS", salary.getTds());
            addRow(table, "Other Deductions", salary.getOtherDeductions());

            addRow(table, "Net Pay", salary.getNetPay());

            document.add(table);
            document.close();

            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Error generating payslip PDF", e);
        }
    }

    /* =========================
       UTIL
    ========================= */
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
