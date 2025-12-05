package com.lerneon.backend.utils;

import com.lerneon.backend.models.entity.BusinessSector;
import com.lerneon.backend.models.entity.Permission;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.enums.PermissionEnum;
import com.lerneon.backend.models.enums.RoleEnum;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.BusinessSectorRepository;
import com.lerneon.backend.repositories.PermissionRepository;
import com.lerneon.backend.repositories.RoleRepository;
import com.lerneon.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class AppInitializer implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BusinessSectorRepository businessSectorRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public void run(String... args) {
        initializeRoles();
        initializePermissions();
        assignRolePermissions();
        initializeUsers();
        initializeBusinessSectors();
    }

    void initializePermissions() {
        List<Permission> permissions = Arrays.stream(PermissionEnum.values())
                .map(permission -> Permission.builder().name(permission.name()).build())
                .collect(Collectors.toList());

        permissionRepository.saveAll(permissions);
    }


    void initializeRoles() {
        List<Role> roles = Arrays.stream(RoleEnum.values())
                .map(role -> Role.builder().name(role.name()).build())
                .collect(Collectors.toList());

        roleRepository.saveAll(roles);
    }


    void assignRolePermissions() {
        Map<String, Set<PermissionEnum>> ROLE_PERMISSIONS = Map.of(
                "ROLE_SUPER_ADMIN", Set.of(
                        PermissionEnum.BUSINESS_SECTOR_CREATE,
                        PermissionEnum.BUSINESS_SECTOR_UPDATE,
                        PermissionEnum.BUSINESS_SECTOR_DELETE
                ),

                "ROLE_ADMIN", Set.of(
                        PermissionEnum.DEPARTMENT_VIEW,
                        PermissionEnum.DEPARTMENT_CREATE,
                        PermissionEnum.DEPARTMENT_UPDATE,
                        PermissionEnum.DEPARTMENT_DELETE
                ),

                "ROLE_MANAGER", Set.of(
                        PermissionEnum.DEPARTMENT_VIEW,
                        PermissionEnum.DEPARTMENT_CREATE,
                        PermissionEnum.DEPARTMENT_UPDATE,
                        PermissionEnum.DEPARTMENT_DELETE
                ),

                "ROLE_STAFF", Set.of(
                        PermissionEnum.DEPARTMENT_VIEW
                ),

                "ROLE_USER", Set.of(
                )
        );

        for (String roleName : ROLE_PERMISSIONS.keySet()) {

            Role role = roleRepository.findByName(roleName)
                    .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + roleName));

            List<Permission> permissions = ROLE_PERMISSIONS.get(roleName).stream()
                    .map(permission -> permissionRepository.findByName(permission.name())
                            .orElseThrow(() -> new ResourceNotFoundException("Permission not found: " + permission)))
                    .collect(Collectors.toList());

            role.setPermissions(permissions);
            roleRepository.save(role);
        }
    }

    void initializeUsers() {
        List<Role> roles = new ArrayList<>();
        roles.add(roleRepository.findByName(RoleEnum.ROLE_MANAGER.name()).orElseThrow(
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
