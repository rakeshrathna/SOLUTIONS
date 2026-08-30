package com.eduideal.backend.service;

import com.eduideal.backend.dto.CreateStudentRequest;
import com.eduideal.backend.dto.CreateStudentResponse;
import com.eduideal.backend.dto.StudentDashboardResponse;
import com.eduideal.backend.model.*;
import com.eduideal.backend.repository.EnrollmentRepository;
import com.eduideal.backend.repository.StudentRepository;
import com.eduideal.backend.repository.SubjectRepository;
import com.eduideal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String ALPHA_NUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private final SecureRandom random = new SecureRandom();

    @Transactional
    public CreateStudentResponse createStudent(CreateStudentRequest request, User adminUser) {
        // Step 1: Generate sequential register number
        long studentCount = userRepository.countByRole(Role.STUDENT);
        long nextSeq = studentCount + 1;
        String registerNumber = String.format("%08d", nextSeq);

        while (userRepository.existsByRegisterNumber(registerNumber)) {
            nextSeq++;
            registerNumber = String.format("%08d", nextSeq);
        }

        // Step 2: Generate random temporary password
        String tempPassword = generateRandomPassword(8);

        // Step 3: Hash password & Create User
        User user = new User();
        user.setRegisterNumber(registerNumber);
        user.setPasswordHash(passwordEncoder.encode(tempPassword));
        user.setRole(Role.STUDENT);
        user.setStatus("ACTIVE");
        User savedUser = userRepository.save(user);

        // Step 4: Create Student record
        Student student = new Student();
        student.setUser(savedUser);
        student.setStudentName(request.getStudentName());
        student.setClassName(request.getClassName() != null ? request.getClassName() : "Class 12");
        student.setBoard(request.getBoard() != null ? request.getBoard() : "CBSE");
        student.setStatus("ACTIVE");
        Student savedStudent = studentRepository.save(student);

        // Step 5: Process Enrollments
        List<String> enrolledSubjects = new ArrayList<>();
        if (request.getSubjects() != null && !request.getSubjects().isEmpty()) {
            for (String subCode : request.getSubjects()) {
                Optional<Subject> subjectOpt = subjectRepository.findByCode(subCode.toUpperCase());
                if (subjectOpt.isPresent()) {
                    Subject subject = subjectOpt.get();
                    Enrollment enrollment = new Enrollment();
                    enrollment.setStudent(savedStudent);
                    enrollment.setSubject(subject);
                    enrollment.setCreatedByAdmin(adminUser);
                    enrollment.setPaymentStatus("COMPLETED");
                    enrollment.setStatus("ACTIVE");
                    enrollmentRepository.save(enrollment);

                    enrolledSubjects.add(subject.getCode());
                }
            }
        }

        return new CreateStudentResponse(
                registerNumber,
                tempPassword,
                savedStudent.getId(),
                savedStudent.getStudentName(),
                savedStudent.getClassName(),
                savedStudent.getBoard(),
                enrolledSubjects
        );
    }

    @Transactional(readOnly = true)
    public StudentDashboardResponse getStudentDashboard(User user) {
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Student record not found for user: " + user.getRegisterNumber()));

        List<Subject> allSubjects = subjectRepository.findAll();
        List<StudentDashboardResponse.SubjectStatusDto> subjectStatuses = new ArrayList<>();

        for (Subject subject : allSubjects) {
            boolean isEnrolled = enrollmentRepository.existsByStudentIdAndSubjectCodeAndStatus(
                    student.getId(), subject.getCode(), "ACTIVE"
            );
            String status = isEnrolled ? "ACTIVE" : "LOCKED";
            subjectStatuses.add(new StudentDashboardResponse.SubjectStatusDto(
                    subject.getCode(),
                    subject.getName(),
                    status
            ));
        }

        return new StudentDashboardResponse(
                student.getStudentName(),
                student.getClassName(),
                student.getBoard(),
                user.getRegisterNumber(),
                subjectStatuses
        );
    }

    @Transactional(readOnly = true)
    public boolean checkSubjectAccess(User user, String subjectCode) {
        if (user.getRole() == Role.ADMIN) {
            return true;
        }
        Optional<Student> studentOpt = studentRepository.findByUserId(user.getId());
        if (studentOpt.isEmpty()) {
            return false;
        }
        return enrollmentRepository.existsByStudentIdAndSubjectCodeAndStatus(
                studentOpt.get().getId(), subjectCode.toUpperCase(), "ACTIVE"
        );
    }

    @Transactional(readOnly = true)
    public List<CreateStudentResponse> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map(s -> {
            List<Enrollment> enrollments = enrollmentRepository.findByStudent(s);
            List<String> subjectCodes = enrollments.stream()
                    .map(e -> e.getSubject().getCode())
                    .collect(Collectors.toList());

            return new CreateStudentResponse(
                    s.getUser().getRegisterNumber(),
                    "********",
                    s.getId(),
                    s.getStudentName(),
                    s.getClassName(),
                    s.getBoard(),
                    subjectCodes
            );
        }).collect(Collectors.toList());
    }

    private String generateRandomPassword(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHA_NUMERIC.charAt(random.nextInt(ALPHA_NUMERIC.length())));
        }
        return sb.toString();
    }
}
