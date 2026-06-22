package com.klef.service;

import java.util.concurrent.ConcurrentHashMap;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class OtpService {
    
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:your_email@gmail.com}")
    private String fromEmail;

    private static class OtpData {
        String otp;
        LocalDateTime expiryTime;
        
        OtpData(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }
    
    private final ConcurrentHashMap<String, OtpData> otpStorage = new ConcurrentHashMap<>();
    
    public String generateOtp(String email) {
        Random rand = new Random();
        String otp = String.format("%06d", rand.nextInt(1000000));
        otpStorage.put(email, new OtpData(otp, LocalDateTime.now().plusMinutes(5)));
        
        System.out.println("==========================================");
        System.out.println("OTP generated for " + email + ": " + otp);
        System.out.println("==========================================");
        
        sendOtpEmail(email, otp);
        
        return otp;
    }
    
    private void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(toEmail);
            message.setSubject("OTP for Password Reset - Student Certification Portal");
            message.setText("Dear User,\n\nYour OTP for password reset is: " + otp + "\n\nThis OTP will expire in 5 minutes.\n\nBest Regards,\nStudent Certification Verification Portal Team");
            mailSender.send(message);
            System.out.println("OTP email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("SMTP email delivery failed (will fallback to console log): " + e.getMessage());
        }
    }
    
    public boolean verifyOtp(String email, String otp) {
        OtpData data = otpStorage.get(email);
        if (data == null) {
            return false;
        }
        if (LocalDateTime.now().isAfter(data.expiryTime)) {
            otpStorage.remove(email);
            return false;
        }
        boolean valid = data.otp.equals(otp);
        if (valid) {
            otpStorage.remove(email);
        }
        return valid;
    }
}
