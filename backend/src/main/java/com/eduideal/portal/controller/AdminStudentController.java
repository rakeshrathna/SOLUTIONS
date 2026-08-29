package com.eduideal.portal.controller;

import com.eduideal.portal.dto.StudentCreateRequestDto;
import com.eduideal.portal.dto.StudentResponseDto;
import com.eduideal.portal.dto.SubjectUpdateRequestDto;
import com.eduideal.portal.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/students")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStudentController {

    private final StudentService studentService;

    public AdminStudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentResponseDto> createStudent(@Valid @RequestBody StudentCreateRequestDto dto, Authentication authentication) {
        String adminUsername = authentication != null ? authentication.getName() : "ADMIN";
        StudentResponseDto createdStudent = studentService.createStudent(dto, adminUsername);
        return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StudentResponseDto>> getAllStudents() {
        List<StudentResponseDto> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }

    @PatchMapping("/{id}/subjects")
    public ResponseEntity<StudentResponseDto> updateStudentSubjects(
            @PathVariable UUID id,
            @RequestBody SubjectUpdateRequestDto dto) {
        StudentResponseDto updatedStudent = studentService.updateStudentSubjects(id, dto);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
