package com.example.Backend.Employees.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Backend.Employees.Entity.Attendance;
import com.example.Backend.Employees.Repository.AttendanceRepo;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceRepo attendanceRepo;

    @PostMapping("/add")
    public Attendance addAttendance(@RequestBody Attendance attendance) {
        return attendanceRepo.save(attendance);
    }
}
