package com.klef.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.model.Student;
import com.klef.model.Certification;
import com.klef.model.Assignment;
import com.klef.model.Status;
import com.klef.repository.StudentRepository;
import com.klef.repository.AssignmentRepository;
import com.klef.repository.CertificationRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private CertificationRepository certificationRepository;

	@Override
	public Student checkStudentLogin(String email, String pwd) {
		return studentRepository.findByEmailAndPassword(email, pwd);
	}

	@Override
	public Student updateProfile(long studentId, String name, String contact, String password) {
		Student student = studentRepository.findById(studentId)
			.orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
		student.setName(name);
		student.setContact(contact);
		student.setPassword(password);
		return studentRepository.save(student);
	}

	@Override
	public Certification uploadCertification(Certification certification, long studentId) {
		Student student = studentRepository.findById(studentId)
			.orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
		
		// Find student's assigned faculty mentor
		Optional<Assignment> assignmentOpt = assignmentRepository.findByStudentId(studentId);
		if (assignmentOpt.isEmpty()) {
			throw new IllegalArgumentException("No mentor has been assigned to you yet. You cannot upload certifications until a faculty mentor is assigned.");
		}

		certification.setStudent(student);
		certification.setStatus(Status.SUBMITTED);
		certification.setSubmittedat(LocalDateTime.now());
		certification.setFaculty(assignmentOpt.get().getFaculty());

		return certificationRepository.save(certification);
	}

	@Override
	public List<Certification> viewUploadedCertifications(long studentId) {
		return certificationRepository.findByStudentId(studentId);
	}

	@Override
	public Student findByEmail(String email) {
		return studentRepository.findByEmail(email).orElse(null);
	}

	@Override
	public void resetPassword(String email, String password) {
		Student student = studentRepository.findByEmail(email)
			.orElseThrow(() -> new RuntimeException("Student not found with email: " + email));
		student.setPassword(password);
		studentRepository.save(student);
	}

	@Override
	public com.klef.model.Faculty getAssignedMentor(long studentId) {
		return assignmentRepository.findByStudentId(studentId)
			.map(Assignment::getFaculty)
			.orElse(null);
	}

	@Override
	public Certification updateCertification(int certificationId, Certification updated, long studentId) {
		Certification existing = certificationRepository.findById(certificationId)
			.orElseThrow(() -> new RuntimeException("Certification not found with ID: " + certificationId));
		if (existing.getStudent().getId() != studentId) {
			throw new IllegalArgumentException("Unauthorized: This certification does not belong to you.");
		}
		if (existing.getStatus() != Status.SUBMITTED) {
			throw new IllegalArgumentException("Only certifications in SUBMITTED status can be updated.");
		}
		
		existing.setCategory(updated.getCategory());
		existing.setCompany(updated.getCompany());
		existing.setTitle(updated.getTitle());
		existing.setFoundation(updated.getFoundation());
		existing.setExamtype(updated.getExamtype());
		existing.setCertificateid(updated.getCertificateid());
		existing.setIssueddate(updated.getIssueddate());
		existing.setExpirydate(updated.getExpirydate());
		existing.setCertificateurl(updated.getCertificateurl());
		existing.setSubmittedat(LocalDateTime.now());
		
		return certificationRepository.save(existing);
	}

	@Override
	public void deleteCertification(int certificationId, long studentId) {
		Certification existing = certificationRepository.findById(certificationId)
			.orElseThrow(() -> new RuntimeException("Certification not found with ID: " + certificationId));
		if (existing.getStudent().getId() != studentId) {
			throw new IllegalArgumentException("Unauthorized: This certification does not belong to you.");
		}
		if (existing.getStatus() != Status.SUBMITTED) {
			throw new IllegalArgumentException("Only certifications in SUBMITTED status can be deleted.");
		}
		certificationRepository.delete(existing);
	}
}
