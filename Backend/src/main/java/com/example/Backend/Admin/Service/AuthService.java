package com.example.Backend.Admin.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Backend.Admin.Entity.User;
import com.example.Backend.Admin.Repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {

        System.out.println("➡️ LOGIN ATTEMPT");
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            System.out.println("❌ User not found");
            return null;
        }

        System.out.println("DB Password: " + user.getPassword());

        // ✅ PLAIN TEXT COMPARISON
        if (!password.equals(user.getPassword())) {
            System.out.println("❌ Password mismatch");
            return null;
        }

        System.out.println("✅ Login success");
        return user;
    }
}
