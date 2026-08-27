package com.eduideal.backend.controller;

import com.eduideal.backend.model.User;
import com.eduideal.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{subjectCode}/lessons")
    public ResponseEntity<?> getSubjectLessons(
            @PathVariable String subjectCode,
            @AuthenticationPrincipal User user) {

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "UNAUTHORIZED", "message", "Authentication required"));
        }

        boolean hasAccess = studentService.checkSubjectAccess(user, subjectCode);

        if (!hasAccess) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of(
                            "error", "FORBIDDEN",
                            "message", "Access denied: You do not have an active enrollment for " + subjectCode.toUpperCase()
                    ));
        }

        // Return subject access status and content confirmation
        return ResponseEntity.ok(Map.of(
                "subjectCode", subjectCode.toUpperCase(),
                "status", "ACTIVE",
                "accessGranted", true,
                "message", "Access granted to " + subjectCode.toUpperCase() + " curriculum lessons"
        ));
    }
}
