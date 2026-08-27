package com.eduideal.backend.service;

import com.eduideal.backend.dto.LoginRequest;
import com.eduideal.backend.dto.LoginResponse;
import com.eduideal.backend.model.Role;
import com.eduideal.backend.model.Student;
import com.eduideal.backend.model.User;
import com.eduideal.backend.repository.StudentRepository;
import com.eduideal.backend.repository.UserRepository;
import com.eduideal.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public LoginResponse login(LoginRequest request) {
        // 1. Find user by registerNumber
        User user = userRepository.findByRegisterNumber(request.getRegisterNumber().trim())
                .orElseThrow(() -> new BadCredentialsException("Invalid register number or password"));

        // 2. Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Invalid register number or password");
        }

        // 3. Check status
        if (!"ACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new BadCredentialsException("User account is inactive");
        }

        // 4. Generate JWT Token
        String token = tokenProvider.generateToken(user.getRegisterNumber(), user.getRole().name(), user.getId());

        // 5. Build UserDto (role determined from DB entity, NEVER from request)
        String studentName = null;
        Long studentId = null;
        if (user.getRole() == Role.STUDENT) {
            Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());
            if (studentOpt.isPresent()) {
                studentName = studentOpt.get().getStudentName();
                studentId = studentOpt.get().getId();
            }
        } else if (user.getRole() == Role.ADMIN) {
            studentName = "Administrator";
        }

        LoginResponse.UserDto userDto = new LoginResponse.UserDto(
                user.getId(),
                user.getRegisterNumber(),
                user.getRole().name(),
                studentName,
                studentId
        );

        return new LoginResponse(token, userDto);
    }
}
