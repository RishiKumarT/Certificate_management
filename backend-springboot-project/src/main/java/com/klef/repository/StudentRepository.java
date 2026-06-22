package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.model.Student;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
	public Student findByEmailAndPassword(String email, String password);
	public Optional<Student> findByEmail(String email);
}
