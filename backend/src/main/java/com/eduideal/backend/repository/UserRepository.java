package com.eduideal.backend.repository;

import com.eduideal.backend.model.Role;
import com.eduideal.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByRegisterNumber(String registerNumber);
    boolean existsByRegisterNumber(String registerNumber);
    long countByRole(Role role);
}
