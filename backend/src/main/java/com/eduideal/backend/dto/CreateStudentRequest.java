package com.eduideal.backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public class CreateStudentRequest {

    @NotBlank(message = "Student name is required")
    private String studentName;

    private String className = "Class 12";

    private String board = "CBSE";

    private List<String> subjects;

    public CreateStudentRequest() {
    }

    public CreateStudentRequest(String studentName, String className, String board, List<String> subjects) {
        this.studentName = studentName;
        this.className = className;
        this.board = board;
        this.subjects = subjects;
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

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }
}
