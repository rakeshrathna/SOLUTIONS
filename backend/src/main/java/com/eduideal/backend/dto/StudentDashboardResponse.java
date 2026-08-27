package com.eduideal.backend.dto;

import java.util.List;

public class StudentDashboardResponse {

    private String studentName;
    private String className;
    private String board;
    private String registerNumber;
    private List<SubjectStatusDto> subjects;

    public StudentDashboardResponse() {
    }

    public StudentDashboardResponse(String studentName, String className, String board, String registerNumber, List<SubjectStatusDto> subjects) {
        this.studentName = studentName;
        this.className = className;
        this.board = board;
        this.registerNumber = registerNumber;
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

    public String getRegisterNumber() {
        return registerNumber;
    }

    public void setRegisterNumber(String registerNumber) {
        this.registerNumber = registerNumber;
    }

    public List<SubjectStatusDto> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectStatusDto> subjects) {
        this.subjects = subjects;
    }

    public static class SubjectStatusDto {
        private String code;
        private String name;
        private String status; // "ACTIVE" if enrolled, "LOCKED" if not

        public SubjectStatusDto() {
        }

        public SubjectStatusDto(String code, String name, String status) {
            this.code = code;
            this.name = name;
            this.status = status;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}
