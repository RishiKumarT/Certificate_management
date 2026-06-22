package com.klef.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.model.Admin;
import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.model.Assignment;
import com.klef.model.Certification;
import com.klef.model.Status;
import com.klef.repository.AdminRepository;
import com.klef.repository.FacultyRepository;
import com.klef.repository.StudentRepository;
import com.klef.repository.AssignmentRepository;
import com.klef.repository.CertificationRepository;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private FacultyRepository facultyRepository;

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private CertificationRepository certificationRepository;

	@Override
	public Admin checkAdminLogin(Admin a) {
		return adminRepository.findByUsernameAndPassword(a.getUsername(), a.getPassword());
	}
	
	@Override
	public String addStudent(Student s) {
		studentRepository.save(s);
		return "Student added successfully";
	}

	@Override
	public List<Student> viewAllStudents() {
		
		return studentRepository.findAll();
	}

	@Override
	public String addFaculty(Faculty s) {
		facultyRepository.save(s);
		return "Faculty Added Successfully";
	}

	@Override
	public List<Faculty> viewAllFaculty() {
		return facultyRepository.findAll();
	}
	
	@Override
	public String assignStudent(long studentId, int facultyId) {
		Student student = studentRepository.findById(studentId)
			.orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
		Faculty faculty = facultyRepository.findById(facultyId)
			.orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyId));

		Optional<Assignment> existingOpt = assignmentRepository.findByStudentId(studentId);
		Assignment assignment;
		if (existingOpt.isPresent()) {
			assignment = existingOpt.get();
			assignment.setFaculty(faculty);
			assignment.setAssignedAt(LocalDateTime.now());
		} else {
			assignment = new Assignment();
			assignment.setStudent(student);
			assignment.setFaculty(faculty);
			assignment.setAssignedAt(LocalDateTime.now());
		}
		assignmentRepository.save(assignment);
		return "Student assigned to Faculty successfully";
	}

	@Override
	public List<Certification> viewAllCertifications() {
		return certificationRepository.findAll();
	}

	@Override
	public Map<String, Long> getCertificationStatistics() {
		Map<String, Long> stats = new HashMap<>();
		stats.put("submitted", certificationRepository.countByStatus(Status.SUBMITTED));
		stats.put("approved", certificationRepository.countByStatus(Status.APPROVED));
		stats.put("rejected", certificationRepository.countByStatus(Status.REJECTED));
		stats.put("total", certificationRepository.count());
		return stats;
	}
}
