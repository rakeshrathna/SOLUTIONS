package com.eduideal.backend.dto;

import java.util.List;

public class CreateStudentResponse {

    private String registerNumber;
    private String temporaryPassword;
    private Long studentId;
    private String studentName;
    private String className;
    private String board;
    private List<String> enrolledSubjects;

    public CreateStudentResponse() {
    }

    public CreateStudentResponse(String registerNumber, String temporaryPassword, Long studentId, String studentName, String className, String board, List<String> enrolledSubjects) {
        this.registerNumber = registerNumber;
        this.temporaryPassword = temporaryPassword;
        this.studentId = studentId;
        this.studentName = studentName;
        this.className = className;
        this.board = board;
        this.enrolledSubjects = enrolledSubjects;
    }

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public String getTemporaryPassword() {
        return temporaryPassword;
    }

    public void setTemporaryPassword(String temporaryPassword) {
        this.temporaryPassword = temporaryPassword;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getBoard() {
        return board;
    }

    public void setBoard(String board) {
        this.board = board;
    }

    public List<String> getEnrolledSubjects() {
        return enrolledSubjects;
    }

    public void setEnrolledSubjects(List<String> enrolledSubjects) {
        this.enrolledSubjects = enrolledSubjects;
    }
}
