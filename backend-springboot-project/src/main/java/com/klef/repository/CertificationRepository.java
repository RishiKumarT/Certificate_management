package com.klef.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.model.Certification;
import com.klef.model.Status;
import java.util.List;

@Repository
public interface CertificationRepository extends JpaRepository<Certification, Integer>{
    public List<Certification> findByStudentId(long studentId);
    public List<Certification> findByFacultyId(int facultyId);
    public long countByStatus(Status status);
}
