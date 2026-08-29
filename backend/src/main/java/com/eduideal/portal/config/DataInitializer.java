package com.eduideal.portal.config;

import com.eduideal.portal.model.Role;
import com.eduideal.portal.model.User;
import com.eduideal.portal.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);
    private static final String DEFAULT_ADMIN_USERNAME = "admin@eduideal.i3.in";
    private static final String DEFAULT_ADMIN_PASSWORD = "ideal@i3-edu";

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUsername(DEFAULT_ADMIN_USERNAME)) {
            User admin = new User(
                    DEFAULT_ADMIN_USERNAME,
                    passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD),
                    Role.ADMIN
            );
            userRepository.save(admin);
            logger.info("Default admin account ready ({})", DEFAULT_ADMIN_USERNAME);
        } else {
            logger.info("Default admin account already exists ({})", DEFAULT_ADMIN_USERNAME);
        }
    }
}
