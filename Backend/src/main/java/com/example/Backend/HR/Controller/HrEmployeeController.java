package com.example.Backend.HR.Controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.HR.DTO.HrEmployeeListDTO;
import com.example.Backend.HR.Service.HrEmployeeService;

@RestController
@RequestMapping("/hr/employees")
public class HrEmployeeController {

    private final HrEmployeeService service;

    public HrEmployeeController(HrEmployeeService service) {
        this.service = service;
    }

    @GetMapping
    public Page<HrEmployeeListDTO> getEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir
    ) {
        return service.getEmployees(page, size, search, sortBy, sortDir);
    }
    
}
