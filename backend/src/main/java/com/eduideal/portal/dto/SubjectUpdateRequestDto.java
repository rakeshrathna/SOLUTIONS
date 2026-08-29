package com.eduideal.portal.dto;

import com.eduideal.portal.model.Subject;

import java.util.Set;

public class SubjectUpdateRequestDto {

    private Set<Subject> subjects;

    public SubjectUpdateRequestDto() {
    }

    public SubjectUpdateRequestDto(Set<Subject> subjects) {
        this.subjects = subjects;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }
}
