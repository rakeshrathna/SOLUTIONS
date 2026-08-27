package com.eduideal.backend.repository;

import com.eduideal.backend.model.Payment;
import com.eduideal.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudent(Student student);
    List<Payment> findByStudentId(Long studentId);
}
