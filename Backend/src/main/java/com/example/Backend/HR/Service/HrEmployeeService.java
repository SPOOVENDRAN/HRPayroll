package com.example.Backend.HR.Service;

import java.time.format.DateTimeFormatter;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.HR.DTO.HrEmployeeListDTO;

@Service
public class HrEmployeeService {

    private final EmployeeRepo employeeRepo;

    public HrEmployeeService(EmployeeRepo employeeRepo) {
        this.employeeRepo = employeeRepo;
    }

    public Page<HrEmployeeListDTO> getEmployees(
            int page,
            int size,
            String search,
            String sortBy,
            String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Employee> employeePage =
                employeeRepo.findByNameContainingIgnoreCaseOrDepartmentContainingIgnoreCaseOrDesignationContainingIgnoreCase(
                        search,
                        search,
                        search,
                        pageable
                );

        return employeePage.map(emp ->
                new HrEmployeeListDTO(
                        emp.getId(),
                        emp.getEmpid(),
                        emp.getName(),
                        emp.getDesignation(),
                        emp.getDepartment(),
                        "ACTIVE", // later you can compute leave/remote
                        emp.getEmail(),
                        emp.getJoiningDate()
                                .format(DateTimeFormatter.ofPattern("dd/MM/yyyy"))
                )
        );
    }
}
