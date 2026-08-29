package com.eduideal.portal.dto;

import com.eduideal.portal.model.Subject;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public class StudentResponseDto {

    private UUID id;
    private String name;
    private String registerNumber;
    private String username;
    private String studentClass;
    private LocalDate admissionDate;
    private Set<Subject> subjects;
    private String createdBy;

    public StudentResponseDto() {
    }

    public StudentResponseDto(UUID id, String name, String registerNumber, String username, String studentClass, LocalDate admissionDate, Set<Subject> subjects, String createdBy) {
        this.id = id;
        this.name = name;
        this.registerNumber = registerNumber;
        this.username = username;
        this.studentClass = studentClass;
        this.admissionDate = admissionDate;
        this.subjects = subjects;
        this.createdBy = createdBy;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(String studentClass) {
        this.studentClass = studentClass;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }
}
