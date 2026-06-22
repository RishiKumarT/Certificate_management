package com.klef.service;

import com.klef.model.Student;
import com.klef.model.Certification;
import java.util.List;

public interface StudentService {
	public Student checkStudentLogin(String email,String pwd);
	public Student updateProfile(long studentId, String name, String contact, String password);
	public Certification uploadCertification(Certification certification, long studentId);
	public List<Certification> viewUploadedCertifications(long studentId);
	public Student findByEmail(String email);
	public void resetPassword(String email, String password);
	public com.klef.model.Faculty getAssignedMentor(long studentId);
	public Certification updateCertification(int certificationId, Certification updated, long studentId);
	public void deleteCertification(int certificationId, long studentId);
}
