package com.example.Backend.Admin.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Backend.Admin.Entity.User;
import com.example.Backend.security.UserRole;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Used for login
    Optional<User> findByEmail(String email);

    // Used to link with Employee table
    Optional<User> findByEmpId(String empId);

    // Used while creating user from Admin page
    boolean existsByEmail(String email);

    long countByRole(UserRole role);

    long countByRoleAndActiveTrue(String role);

    long countByActiveTrue();
    List<User> findByRole(UserRole role);
    

}
