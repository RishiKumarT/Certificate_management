package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.model.Faculty;
import java.util.Optional;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer>{
	public Faculty findByEmailAndPassword(String email, String password);
	public Optional<Faculty> findByEmail(String email);
}
