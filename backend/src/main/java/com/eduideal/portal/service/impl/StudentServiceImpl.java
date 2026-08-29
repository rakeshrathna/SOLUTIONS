package com.eduideal.portal.service.impl;

import com.eduideal.portal.dto.StudentCreateRequestDto;
import com.eduideal.portal.dto.StudentResponseDto;
import com.eduideal.portal.dto.SubjectUpdateRequestDto;
import com.eduideal.portal.exception.DuplicateResourceException;
import com.eduideal.portal.exception.ResourceNotFoundException;
import com.eduideal.portal.model.Role;
import com.eduideal.portal.model.Student;
import com.eduideal.portal.model.User;
import com.eduideal.portal.repository.StudentRepository;
import com.eduideal.portal.repository.UserRepository;
import com.eduideal.portal.service.StudentService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentServiceImpl(StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public StudentResponseDto createStudent(StudentCreateRequestDto dto, String adminUsername) {
        if (studentRepository.existsByRegisterNumber(dto.getRegisterNumber())) {
            throw new DuplicateResourceException("Student with register number '" + dto.getRegisterNumber() + "' already exists");
        }

        String username = dto.getRegisterNumber().trim();
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateResourceException("User with username '" + username + "' already exists");
        }

        User studentUser = new User(
                username,
                passwordEncoder.encode(dto.getPassword()),
                Role.STUDENT
        );

        Student student = new Student(
                studentUser,
                dto.getName(),
                dto.getRegisterNumber(),
                dto.getStudentClass(),
                dto.getAdmissionDate(),
                dto.getSubjects(),
                adminUsername
        );

        Student savedStudent = studentRepository.save(student);
        return mapToDto(savedStudent);
    }

    @Override
    @Transactional(readOnly = true)
    public List<StudentResponseDto> getAllStudents() {
        return studentRepository.findAllByOrderByAdmissionDateDesc()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StudentResponseDto updateStudentSubjects(UUID studentId, SubjectUpdateRequestDto dto) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        student.setSubjects(dto.getSubjects());
        Student updatedStudent = studentRepository.save(student);
        return mapToDto(updatedStudent);
    }

    @Override
    @Transactional
    public void deleteStudent(UUID studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        studentRepository.delete(student);
    }

    private StudentResponseDto mapToDto(Student student) {
        return new StudentResponseDto(
                student.getId(),
                student.getName(),
                student.getRegisterNumber(),
                student.getUser().getUsername(),
                student.getStudentClass(),
                student.getAdmissionDate(),
                student.getSubjects(),
                student.getCreatedBy()
        );
    }
}
