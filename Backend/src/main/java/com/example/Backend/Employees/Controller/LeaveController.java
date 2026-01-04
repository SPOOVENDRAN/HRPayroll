package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.Backend.Employees.Entity.Leave;
import com.example.Backend.Employees.Repository.LeaveRepo;

@RestController
@RequestMapping("/leave")
@CrossOrigin("*")
public class LeaveController {

    @Autowired
    private LeaveRepo leaveRepo;

    @PostMapping("/add")
    public Leave addLeave(@RequestBody Leave leave) {
        return leaveRepo.save(leave);
    }
}

