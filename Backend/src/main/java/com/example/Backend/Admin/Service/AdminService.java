package com.example.Backend.Admin.Service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Backend.Admin.DTO.*;
import com.example.Backend.Admin.Entity.User;
import com.example.Backend.Admin.Repository.UserRepository;
import com.example.Backend.Employees.Entity.Employee;
import com.example.Backend.Employees.Entity.EmploymentType;
import com.example.Backend.Employees.Repository.EmployeeRepo;
import com.example.Backend.security.UserRole;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepo;
    private final EmployeeRepo employeeRepo;

    /* ---------------- OVERVIEW ---------------- */

    public AdminDashboardOverviewDTO getOverview() {
        return new AdminDashboardOverviewDTO(
                userRepo.count(),
                userRepo.countByActiveTrue(),
                employeeRepo.count()
        );
    }

    /* ---------------- FETCH ---------------- */

    public List<User> getHRs() {
        return userRepo.findByRole(UserRole.HR);
    }

    public List<User> getAdmins() {
        return userRepo.findByRole(UserRole.ADMIN);
    }

    public List<Employee> getEmployees() {
        return employeeRepo.findAll()
                .stream()
                .filter(e -> e.getDeleted() == null || !e.getDeleted())
                .toList();
    }

    /* ---------------- CREATE ---------------- */

    public void createUser(AdminCreateUserDTO dto) {

    User user = new User();
    user.setEmpId(dto.getEmpid());
    user.setEmail(dto.getEmail());
    user.setPassword(dto.getPassword());
    user.setActive(true);

    UserRole role =
            dto.getType().equalsIgnoreCase("admin") ? UserRole.ADMIN :
            dto.getType().equalsIgnoreCase("hr")    ? UserRole.HR :
                                                     UserRole.EMPLOYEE;

    user.setRole(role);
    userRepo.save(user);

    if (!role.equals(UserRole.ADMIN)) {

        Employee emp = new Employee();

        emp.setEmpid(dto.getEmpid());
        emp.setName(dto.getName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setDesignation(dto.getDesignation());

        emp.setEmploymentType(
                dto.getEmploymentType() != null
                        ? EmploymentType.valueOf(dto.getEmploymentType())
                        : EmploymentType.FULL_TIME
        );

        emp.setExperience(dto.getExperience() != null ? dto.getExperience() : 0);
        emp.setCurrProjects(dto.getCurrProjects() != null ? dto.getCurrProjects() : 0);
        emp.setTotalProjects(dto.getTotalProjects() != null ? dto.getTotalProjects() : 0);
        emp.setProductivityRate(dto.getProductivityRate() != null ? dto.getProductivityRate() : 0);
        emp.setGoalAchievement(dto.getGoalAchievement() != null ? dto.getGoalAchievement() : 0);

        emp.setLocation(dto.getLocation());
        emp.setManager(dto.getManager());
        emp.setPhone(dto.getPhone());

        if (dto.getJoiningDate() != null && !dto.getJoiningDate().isBlank()) {
            emp.setJoiningDate(LocalDate.parse(dto.getJoiningDate()));
        }

        emp.setStatus("ACTIVE");
        emp.setDeleted(false);

        employeeRepo.save(emp);
    }
}


    /* ---------------- UPDATE ---------------- */

    public void updateEmployee(Long id, AdminUpdateUserDTO dto) {
        Employee emp = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        emp.setName(dto.getName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setDesignation(dto.getDesignation());

        employeeRepo.save(emp);
    }

    /* ---------------- STATUS TOGGLE ---------------- */

    public void toggleEmployeeStatus(Long id, String status) {
        Employee emp = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        emp.setStatus(status);
        employeeRepo.save(emp);
    }

    /* ---------------- SOFT DELETE ---------------- */

    public void softDeleteEmployee(Long id) {
        Employee emp = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        emp.setDeleted(true);
        emp.setStatus("INACTIVE");
        employeeRepo.save(emp);
    }
    public void toggleUserStatus(Long id, boolean active) {
    User user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setActive(active);
    userRepo.save(user);
}
public void updateUser(Long id, AdminUpdateUserDTO dto) {

    User user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (dto.getEmail() != null) {
        user.setEmail(dto.getEmail());
    }

    if (dto.getActive() != null) {
        user.setActive(dto.getActive());
    }

    userRepo.save(user);
}

}
