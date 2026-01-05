package com.example.Backend.Admin.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/test/secure")
    public String secureEndpoint() {
        return "SECURE API ACCESS GRANTED";
    }
}
