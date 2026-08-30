package com.eduideal.backend.dto;

public class LoginResponse {

    private String token;
    private UserDto user;

    public LoginResponse() {
    }

    public LoginResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public static class UserDto {
        private Long id;
        private String registerNumber;
        private String role;
        private String studentName;
        private Long studentId;

        public UserDto() {
        }

        public UserDto(Long id, String registerNumber, String role, String studentName, Long studentId) {
            this.id = id;
            this.registerNumber = registerNumber;
            this.role = role;
            this.studentName = studentName;
            this.studentId = studentId;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getRegisterNumber() {
            return registerNumber;
        }

        public void setRegisterNumber(String registerNumber) {
            this.registerNumber = registerNumber;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getStudentName() {
            return studentName;
        }

        public void setStudentName(String studentName) {
            this.studentName = studentName;
        }

        public Long getStudentId() {
            return studentId;
        }

        public void setStudentId(Long studentId) {
            this.studentId = studentId;
        }
    }
}
