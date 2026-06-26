package com.klef.security;

import com.klef.model.Admin;
import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.repository.AdminRepository;
import com.klef.repository.FacultyRepository;
import com.klef.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Admin> adminOpt = adminRepository.findById(username);
        if (adminOpt.isPresent()) {
            Admin admin = adminOpt.get();
            return new CustomUserDetails(admin.getUsername(), admin.getPassword(), "ADMIN");
        }

        Optional<Student> studentOpt = studentRepository.findByEmail(username);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            return new CustomUserDetails(student.getEmail(), student.getPassword(), "STUDENT");
        }

        Optional<Faculty> facultyOpt = facultyRepository.findByEmail(username);
        if (facultyOpt.isPresent()) {
            Faculty faculty = facultyOpt.get();
            return new CustomUserDetails(faculty.getEmail(), faculty.getPassword(), "FACULTY");
        }

        throw new UsernameNotFoundException("User not found with username/email: " + username);
    }
}
