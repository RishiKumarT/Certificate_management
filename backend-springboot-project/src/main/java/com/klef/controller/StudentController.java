package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.service.StudentService;

@RestController
@RequestMapping("studentapi")
@CrossOrigin("*")
public class StudentController {

	@Autowired
	private StudentService service;

	@Autowired
	private com.klef.security.JwtUtils jwtUtils;
	
	@GetMapping("/")
	public String studenthome() {
		return "Student controller home page";
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> checkstudentlogin(@RequestBody Student s) {
		try {
			Student student=service.checkStudentLogin(s.getEmail(), s.getPassword());
			if(student!=null) {
				String token = jwtUtils.generateToken(student.getEmail(), "STUDENT");
				java.util.Map<String, Object> response = new java.util.HashMap<>();
				response.put("id", student.getId());
				response.put("name", student.getName());
				response.put("gender", student.getGender());
				response.put("department", student.getDepartment());
				response.put("email", student.getEmail());
				response.put("contact", student.getContact());
				response.put("password", student.getPassword());
				response.put("token", token);
				response.put("role", "STUDENT");
				return ResponseEntity.status(200).body(response);
			}else {
				return ResponseEntity.status(401).body("Student login failed");
			}
			
		}catch(Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PutMapping("/updateprofile")
	public ResponseEntity<?> updateprofile(@RequestBody java.util.Map<String, Object> payload) {
		try {
			long studentId = Long.parseLong(payload.get("id").toString());
			String name = payload.get("name").toString();
			String contact = payload.get("contact").toString();
			String password = payload.get("password").toString();
			Student updated = service.updateProfile(studentId, name, contact, password);
			return ResponseEntity.status(200).body(updated);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PostMapping("/uploadcertification")
	public ResponseEntity<?> uploadcertification(@RequestBody java.util.Map<String, Object> payload) {
		try {
			long studentId = Long.parseLong(payload.get("studentId").toString());
			com.klef.model.Certification c = new com.klef.model.Certification();
			c.setCategory(payload.get("category").toString());
			c.setCompany(payload.get("company").toString());
			c.setTitle(payload.get("title").toString());
			c.setFoundation(payload.get("foundation").toString());
			c.setExamtype(payload.get("examtype").toString());
			c.setCertificateid(payload.get("certificateid").toString());
			c.setIssueddate(payload.get("issueddate").toString());
			c.setExpirydate(payload.get("expirydate").toString());
			c.setCertificateurl(payload.get("certificateurl").toString());
			
			com.klef.model.Certification saved = service.uploadCertification(c, studentId);
			return ResponseEntity.status(201).body(saved);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/certifications/{studentId}")
	public ResponseEntity<?> getCertifications(@org.springframework.web.bind.annotation.PathVariable("studentId") long studentId) {
		try {
			java.util.List<com.klef.model.Certification> list = service.viewUploadedCertifications(studentId);
			return ResponseEntity.status(200).body(list);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@GetMapping("/mentor/{studentId}")
	public ResponseEntity<?> getAssignedMentor(@org.springframework.web.bind.annotation.PathVariable("studentId") long studentId) {
		try {
			com.klef.model.Faculty mentor = service.getAssignedMentor(studentId);
			return ResponseEntity.status(200).body(mentor);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@PutMapping("/updatecertification/{certificationId}")
	public ResponseEntity<?> updatecertification(
			@org.springframework.web.bind.annotation.PathVariable("certificationId") int certificationId, 
			@RequestBody java.util.Map<String, Object> payload) {
		try {
			long studentId = Long.parseLong(payload.get("studentId").toString());
			com.klef.model.Certification c = new com.klef.model.Certification();
			c.setCategory(payload.get("category").toString());
			c.setCompany(payload.get("company").toString());
			c.setTitle(payload.get("title").toString());
			c.setFoundation(payload.get("foundation").toString());
			c.setExamtype(payload.get("examtype").toString());
			c.setCertificateid(payload.get("certificateid").toString());
			c.setIssueddate(payload.get("issueddate").toString());
			c.setExpirydate(payload.get("expirydate").toString());
			c.setCertificateurl(payload.get("certificateurl").toString());
			
			com.klef.model.Certification updated = service.updateCertification(certificationId, c, studentId);
			return ResponseEntity.status(200).body(updated);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}

	@org.springframework.web.bind.annotation.DeleteMapping("/deletecertification/{certificationId}")
	public ResponseEntity<?> deletecertification(
			@org.springframework.web.bind.annotation.PathVariable("certificationId") int certificationId, 
			@org.springframework.web.bind.annotation.RequestParam("studentId") long studentId) {
		try {
			service.deleteCertification(certificationId, studentId);
			java.util.Map<String, String> response = new java.util.HashMap<>();
			response.put("message", "Certification request deleted successfully");
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
}