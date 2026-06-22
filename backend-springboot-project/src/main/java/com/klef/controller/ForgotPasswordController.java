package com.klef.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.klef.service.OtpService;
import com.klef.service.StudentService;
import com.klef.service.FacultyService;
import com.klef.model.Student;
import com.klef.model.Faculty;
import java.util.Map;

@RestController
@RequestMapping("api/forgot-password")
@CrossOrigin("*")
public class ForgotPasswordController {
    
    @Autowired
    private OtpService otpService;
    
    @Autowired
    private StudentService studentService;
    
    @Autowired
    private FacultyService facultyService;
    
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email is required");
        }
        
        Student student = studentService.findByEmail(email);
        Faculty faculty = facultyService.findByEmail(email);
        
        if (student == null && faculty == null) {
            return ResponseEntity.status(404).body("Email not found");
        }
        
        otpService.generateOtp(email);
        return ResponseEntity.ok().body(Map.of("message", "OTP sent successfully to " + email));
    }
    
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        if (email == null || otp == null) {
            return ResponseEntity.badRequest().body("Email and OTP are required");
        }
        boolean isValid = otpService.verifyOtp(email, otp);
        if (isValid) {
            return ResponseEntity.ok().body(Map.of("message", "OTP verified successfully"));
        } else {
            return ResponseEntity.status(400).body("Invalid or expired OTP");
        }
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");
        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest().body("Email and new password are required");
        }
        
        Student student = studentService.findByEmail(email);
        Faculty faculty = facultyService.findByEmail(email);
        
        if (student != null) {
            studentService.resetPassword(email, newPassword);
            return ResponseEntity.ok().body(Map.of("message", "Password reset successfully"));
        } else if (faculty != null) {
            facultyService.resetPassword(email, newPassword);
            return ResponseEntity.ok().body(Map.of("message", "Password reset successfully"));
        } else {
            return ResponseEntity.status(404).body("Email not found");
        }
    }
}
