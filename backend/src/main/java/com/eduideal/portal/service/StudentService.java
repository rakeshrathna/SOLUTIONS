package com.eduideal.portal.service;

import com.eduideal.portal.dto.StudentCreateRequestDto;
import com.eduideal.portal.dto.StudentResponseDto;
import com.eduideal.portal.dto.SubjectUpdateRequestDto;

import java.util.List;
import java.util.UUID;

public interface StudentService {
    StudentResponseDto createStudent(StudentCreateRequestDto dto, String adminUsername);
    List<StudentResponseDto> getAllStudents();
    StudentResponseDto updateStudentSubjects(UUID studentId, SubjectUpdateRequestDto dto);
    void deleteStudent(UUID studentId);
}
