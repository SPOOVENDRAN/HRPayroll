package com.example.Backend.Admin.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Backend.Admin.DTO.JwtLoginResponse;
import com.example.Backend.Admin.DTO.LoginRequest;
import com.example.Backend.Admin.Entity.User;
import com.example.Backend.Admin.Service.AuthService;
import com.example.Backend.security.JwtUtil;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
                user.getEmail(),
                user.getRole().name(),
                user.getEmpId()
        );

        return ResponseEntity.ok(
                new JwtLoginResponse(
                        token,
                        user.getRole().name(),
                        user.getEmpId()
                )
        );
    }
}

