package com.eduideal.backend.repository;

import com.eduideal.backend.model.Enrollment;
import com.eduideal.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(Student student);
    List<Enrollment> findByStudentId(Long studentId);
    boolean existsByStudentAndSubjectCode(Student student, String subjectCode);
    boolean existsByStudentIdAndSubjectCodeAndStatus(Long studentId, String subjectCode, String status);
}
