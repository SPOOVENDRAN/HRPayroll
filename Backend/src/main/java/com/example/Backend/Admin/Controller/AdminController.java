package com.example.Backend.Admin.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.Backend.Admin.DTO.*;
import com.example.Backend.Admin.Entity.User;
import com.example.Backend.Admin.Service.AdminService;
import com.example.Backend.Employees.Entity.Employee;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final AdminService adminService;

    /* ---------- DASHBOARD ---------- */

    @GetMapping("/dashboard/overview")
    public AdminDashboardOverviewDTO overview() {
        return adminService.getOverview();
    }

    /* ---------- USERS ---------- */

    @GetMapping("/users/hr")
    public List<User> getHRs() {
        return adminService.getHRs();
    }

    @GetMapping("/users/admin")
    public List<User> getAdmins() {
        return adminService.getAdmins();
    }

    /* ---------- EMPLOYEES ---------- */

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return adminService.getEmployees();
    }

    @PostMapping("/users")
    public void createUser(@RequestBody AdminCreateUserDTO dto) {
        adminService.createUser(dto);
    }

    @PutMapping("/employees/{id}")
    public void updateEmployee(
            @PathVariable Long id,
            @RequestBody AdminUpdateUserDTO dto
    ) {
        adminService.updateEmployee(id, dto);
    }

    @PutMapping("/employees/{id}/status")
    public void toggleStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        adminService.toggleEmployeeStatus(id, status);
    }
    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable Long id) {
            adminService.softDeleteEmployee(id);
    }
        @PutMapping("/users/{id}/status")
        public void toggleUserStatus(
                @PathVariable Long id,
                @RequestParam boolean active
        ) {
            adminService.toggleUserStatus(id, active);
        }
        @PutMapping("/users/{id}")
public void updateUser(
        @PathVariable Long id,
        @RequestBody AdminUpdateUserDTO dto
) {
    adminService.updateUser(id, dto);
}



}
