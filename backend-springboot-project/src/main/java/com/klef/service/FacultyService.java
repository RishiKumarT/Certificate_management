package com.klef.service;

import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.model.Certification;
import com.klef.model.Status;
import java.util.List;

public interface FacultyService {
	public Faculty checkFacultyLogin(Faculty f);
	public Faculty updateProfile(int facultyId, String name, String contact, String password);
	public List<Student> viewAssignedStudents(int facultyId);
	public List<Certification> viewStudentCertifications(int facultyId);
	public Certification reviewCertification(int certificationId, Status status, String remarks);
	public Faculty findByEmail(String email);
	public void resetPassword(String email, String password);
}
