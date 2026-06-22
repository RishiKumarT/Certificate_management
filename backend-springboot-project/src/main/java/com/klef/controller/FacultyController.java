package com.klef.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.model.Faculty;
import com.klef.service.FacultyService;

@RestController
@RequestMapping("facultyapi")
@CrossOrigin("*")
public class FacultyController {
	@Autowired
	private FacultyService facultyService;

	@Autowired
	private com.klef.security.JwtUtils jwtUtils;
	
	@PostMapping("/login")
	public ResponseEntity<?> checkfacultylogin(@RequestBody Faculty f) {
		try {
			Faculty faculty=facultyService.checkFacultyLogin(f);
			if(faculty!=null) {
				String token = jwtUtils.generateToken(faculty.getEmail(), "FACULTY");
				java.util.Map<String, Object> response = new java.util.HashMap<>();
				response.put("id", faculty.getId());
				response.put("name", faculty.getName());
				response.put("gender", faculty.getGender());
				response.put("department", faculty.getDepartment());
				response.put("designation", faculty.getDesignation());
				response.put("email", faculty.getEmail());
				response.put("password", faculty.getPassword());
				response.put("contact", faculty.getContact());
				response.put("salary", faculty.getSalary());
				response.put("token", token);
				response.put("role", "FACULTY");
				return ResponseEntity.status(200).body(response);
			}else {
				return ResponseEntity.status(401).body("Faculty login failed");
			}
			
		}catch(Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PutMapping("/updateprofile")
	public ResponseEntity<?> updateprofile(@RequestBody java.util.Map<String, Object> payload) {
		try {
			int facultyId = Integer.parseInt(payload.get("id").toString());
			String name = payload.get("name").toString();
			String contact = payload.get("contact").toString();
			String password = payload.get("password").toString();
			Faculty updated = facultyService.updateProfile(facultyId, name, contact, password);
			return ResponseEntity.status(200).body(updated);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/assignedstudents/{facultyId}")
	public ResponseEntity<?> getAssignedStudents(@org.springframework.web.bind.annotation.PathVariable("facultyId") int facultyId) {
		try {
			java.util.List<com.klef.model.Student> students = facultyService.viewAssignedStudents(facultyId);
			return ResponseEntity.status(200).body(students);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/studentcertifications/{facultyId}")
	public ResponseEntity<?> getStudentCertifications(@org.springframework.web.bind.annotation.PathVariable("facultyId") int facultyId) {
		try {
			java.util.List<com.klef.model.Certification> certifications = facultyService.viewStudentCertifications(facultyId);
			return ResponseEntity.status(200).body(certifications);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PostMapping("/reviewcertification")
	public ResponseEntity<?> reviewcertification(@RequestBody java.util.Map<String, Object> payload) {
		try {
			int certificationId = Integer.parseInt(payload.get("certificationId").toString());
			com.klef.model.Status status = com.klef.model.Status.valueOf(payload.get("status").toString().toUpperCase());
			String remarks = payload.get("remarks").toString();
			com.klef.model.Certification reviewed = facultyService.reviewCertification(certificationId, status, remarks);
			return ResponseEntity.status(200).body(reviewed);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
}
