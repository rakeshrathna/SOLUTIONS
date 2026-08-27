package com.eduideal.backend.controller;

import com.eduideal.backend.dto.CreateStudentRequest;
import com.eduideal.backend.dto.CreateStudentResponse;
import com.eduideal.backend.model.User;
import com.eduideal.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/students")
    public ResponseEntity<CreateStudentResponse> createStudent(
            @Valid @RequestBody CreateStudentRequest request,
            @AuthenticationPrincipal User adminUser) {
        CreateStudentResponse response = studentService.createStudent(request, adminUser);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/students")
    public ResponseEntity<List<CreateStudentResponse>> getAllStudents() {
        List<CreateStudentResponse> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
