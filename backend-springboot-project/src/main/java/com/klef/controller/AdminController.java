package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.model.Admin;
import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.service.AdminService;

@RestController
@RequestMapping("adminapi")
@CrossOrigin("*")
public class AdminController {
	
	@Autowired
	private AdminService adminService;	

	@Autowired
	private com.klef.security.JwtUtils jwtUtils;

	@PostMapping("/login")
	public ResponseEntity<?> checkadminlogin(@RequestBody Admin a) {
		try {
			Admin admin=adminService.checkAdminLogin(a); 
			if(admin!=null) {
				String token = jwtUtils.generateToken(admin.getUsername(), "ADMIN");
				java.util.Map<String, Object> response = new java.util.HashMap<>();
				response.put("username", admin.getUsername());
				response.put("token", token);
				response.put("role", "ADMIN");
				return ResponseEntity.status(200).body(response);
			}else {
				return ResponseEntity.status(401).body("Admin login failed");
			}
			
		}catch(Exception e) {
			return ResponseEntity.status(401).body("Admin login failed");
		}
	}
	
	@PostMapping("/addstudent")
	public ResponseEntity<String> addStudent(@RequestBody Student s) {
		try {
			String msg=adminService.addStudent(s);
			return ResponseEntity.status(201).body(msg);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
	
	@GetMapping("/viewallstudents")
	public ResponseEntity<?> viewallstudents() {
		List<Student> students=adminService.viewAllStudents();
		return ResponseEntity.status(200).body(students);
	}
	@GetMapping("/viewallfaculty")
	public ResponseEntity<?> viewallfaculty() {
		List<Faculty> faculty=adminService.viewAllFaculty();
		return ResponseEntity.status(200).body(faculty);
	}
	@PostMapping("/addfaculty")
	public ResponseEntity<String> addFaculty(@RequestBody Faculty f) {
		try {
			String msg=adminService.addFaculty(f);
			return ResponseEntity.status(201).body(msg);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PostMapping("/assignstudent")
	public ResponseEntity<String> assignStudent(@RequestBody java.util.Map<String, Object> payload) {
		try {
			long studentId = Long.parseLong(payload.get("studentId").toString());
			int facultyId = Integer.parseInt(payload.get("facultyId").toString());
			String msg = adminService.assignStudent(studentId, facultyId);
			return ResponseEntity.status(200).body(msg);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/viewallcertifications")
	public ResponseEntity<?> viewallcertifications() {
		try {
			List<com.klef.model.Certification> certifications = adminService.viewAllCertifications();
			return ResponseEntity.status(200).body(certifications);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/certification-stats")
	public ResponseEntity<?> getCertificationStats() {
		try {
			java.util.Map<String, Long> stats = adminService.getCertificationStatistics();
			return ResponseEntity.status(200).body(stats);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
}
