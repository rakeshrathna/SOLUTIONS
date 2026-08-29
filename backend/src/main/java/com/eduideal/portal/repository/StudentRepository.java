package com.eduideal.portal.repository;

import com.eduideal.portal.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface StudentRepository extends JpaRepository<Student, UUID> {
    Optional<Student> findByRegisterNumber(String registerNumber);
    boolean existsByRegisterNumber(String registerNumber);
    List<Student> findAllByOrderByAdmissionDateDesc();
    Optional<Student> findByUserId(UUID userId);
}
