package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.model.Assignment;
import java.util.Optional;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Optional<Assignment> findByStudentId(long studentId);
    List<Assignment> findByFacultyId(int facultyId);
}
