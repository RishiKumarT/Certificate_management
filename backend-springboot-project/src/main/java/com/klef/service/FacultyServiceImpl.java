package com.klef.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.model.Certification;
import com.klef.model.Assignment;
import com.klef.model.Status;
import com.klef.repository.FacultyRepository;
import com.klef.repository.AssignmentRepository;
import com.klef.repository.CertificationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyServiceImpl implements FacultyService {
	
	@Autowired
	private FacultyRepository facultyRepository;

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private CertificationRepository certificationRepository;

	@Override
	public Faculty checkFacultyLogin(Faculty f) {
		return facultyRepository.findByEmailAndPassword(f.getEmail(), f.getPassword());
	}

	@Override
	public Faculty updateProfile(int facultyId, String name, String contact, String password) {
		Faculty faculty = facultyRepository.findById(facultyId)
			.orElseThrow(() -> new RuntimeException("Faculty not found with ID: " + facultyId));
		faculty.setName(name);
		faculty.setContact(contact);
		faculty.setPassword(password);
		return facultyRepository.save(faculty);
	}

	@Override
	public List<Student> viewAssignedStudents(int facultyId) {
		List<Assignment> assignments = assignmentRepository.findByFacultyId(facultyId);
		return assignments.stream()
			.map(Assignment::getStudent)
			.collect(Collectors.toList());
	}

	@Override
	public List<Certification> viewStudentCertifications(int facultyId) {
		return certificationRepository.findByFacultyId(facultyId);
	}

	@Override
	public Certification reviewCertification(int certificationId, Status status, String remarks) {
		Certification certification = certificationRepository.findById(certificationId)
			.orElseThrow(() -> new RuntimeException("Certification not found with ID: " + certificationId));
		certification.setStatus(status);
		certification.setRemarks(remarks);
		certification.setReviewedat(LocalDateTime.now());
		return certificationRepository.save(certification);
	}

	@Override
	public Faculty findByEmail(String email) {
		return facultyRepository.findByEmail(email).orElse(null);
	}

	@Override
	public void resetPassword(String email, String password) {
		Faculty faculty = facultyRepository.findByEmail(email)
			.orElseThrow(() -> new RuntimeException("Faculty not found with email: " + email));
		faculty.setPassword(password);
		facultyRepository.save(faculty);
	}
}
