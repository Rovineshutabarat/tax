package com.lerneon.backend.utils;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.BusinessSectorRepository;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class AppInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BusinessSectorRepository businessSectorRepository;

    @Override
    public void run(String... args) {
        initializeRoles();
        initializeUsers();
        initializeBusinessSectors();
    }

    void initializeRoles() {
        roleRepository.save(new Role("ROLE_USER"));
        roleRepository.save(new Role("ROLE_ADMIN"));
    }

    void initializeUsers() {
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName("ROLE_USER").orElseThrow(
                () -> new ResourceNotFoundException("Role was not found.")
        ));
        userRepository.save(User.builder()
                .email("rovineshutabarat23@gmail.com")
                .username("rovines")
                .password(passwordEncoder.encode("rovines"))
                .isVerified(true)
                .roles(roles)
                .provider(AccountProvider.LOCAL)
                .canChangePassword(false)
                .build());
    }

    void initializeBusinessSectors() {
        List<BusinessSector> businessSectors = List.of(
                BusinessSector.builder()
                        .name("Information Technology")
                        .description("Software development, IT services, and digital infrastructure.")
                        .build(),
                BusinessSector.builder()
                        .name("Finance")
                        .description("Banking, insurance, and financial services.")
                        .build(),
                BusinessSector.builder()
                        .name("Manufacturing")
                        .description("Industrial production and assembly operations.")
                        .build(),
                BusinessSector.builder()
                        .name("Retail")
                        .description("Wholesale and retail trade industries.")
                        .build(),
                BusinessSector.builder()
                        .name("Healthcare")
                        .description("Medical services, hospitals, and pharmaceuticals.")
                        .build()
        );

        businessSectorRepository.saveAll(businessSectors);
    }

}
