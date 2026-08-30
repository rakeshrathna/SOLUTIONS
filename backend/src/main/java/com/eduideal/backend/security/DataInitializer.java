package com.eduideal.backend.security;

import com.eduideal.backend.model.Role;
import com.eduideal.backend.model.Subject;
import com.eduideal.backend.model.User;
import com.eduideal.backend.repository.SubjectRepository;
import com.eduideal.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        seedAdminAccount();
        seedSubjects();
    }

    private void seedAdminAccount() {
        String adminRegisterNumber = "212224040265";
        if (!userRepository.existsByRegisterNumber(adminRegisterNumber)) {
            User admin = new User();
            admin.setRegisterNumber(adminRegisterNumber);
            admin.setPasswordHash(passwordEncoder.encode("htna2006"));
            admin.setRole(Role.ADMIN);
            admin.setStatus("ACTIVE");
            userRepository.save(admin);
            System.out.println(">>> Initial Administrator account seeded successfully: " + adminRegisterNumber);
        }
    }

    private void seedSubjects() {
        createSubjectIfNotExist("Chemistry", "CHEMISTRY");
        createSubjectIfNotExist("Physics", "PHYSICS");
        createSubjectIfNotExist("Mathematics", "MATHEMATICS");
    }

    private void createSubjectIfNotExist(String name, String code) {
        if (!subjectRepository.existsByCode(code)) {
            Subject subject = new Subject(name, code, "ACTIVE");
            subjectRepository.save(subject);
            System.out.println(">>> Seeded Subject: " + name + " (" + code + ")");
        }
    }
}
