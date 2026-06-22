package com.klef.service;

import java.util.List;
import java.util.Map;

import com.klef.model.Admin;
import com.klef.model.Faculty;
import com.klef.model.Student;
import com.klef.model.Certification;

public interface AdminService {
	public Admin checkAdminLogin(Admin a);
	public String addStudent(Student s);
	public List<Student> viewAllStudents();
	
	public String addFaculty(Faculty s);
	public List<Faculty> viewAllFaculty();
	
	public String assignStudent(long studentId, int facultyId);
	public List<Certification> viewAllCertifications();
	public Map<String, Long> getCertificationStatistics();
}
