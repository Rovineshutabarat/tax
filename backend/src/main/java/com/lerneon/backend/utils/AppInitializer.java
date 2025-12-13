package com.lerneon.backend.utils;

import com.lerneon.backend.models.entity.*;
import com.lerneon.backend.models.enums.AccountProvider;
import com.lerneon.backend.models.enums.CompanyType;
import com.lerneon.backend.models.enums.PermissionEnum;
import com.lerneon.backend.models.enums.RoleEnum;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
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
    private final CompanyRepository companyRepository;
    private final DepartmentRepository departmentRepository;

    @Override
    public void run(String... args) {
        initializeRoles();
        initializePermissions();
        assignRolePermissions();
        initializeBusinessSectors();
        initializeCompany();
        initializeDepartments();
        initializeUsers();
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
                        PermissionEnum.DEPARTMENT_DELETE,

                        PermissionEnum.EMPLOYEE_VIEW,
                        PermissionEnum.EMPLOYEE_CREATE
                ),

                "ROLE_MANAGER", Set.of(
                        PermissionEnum.DEPARTMENT_VIEW,
                        PermissionEnum.DEPARTMENT_CREATE,
                        PermissionEnum.DEPARTMENT_UPDATE,
                        PermissionEnum.DEPARTMENT_DELETE,

                        PermissionEnum.EMPLOYEE_VIEW,
                        PermissionEnum.EMPLOYEE_CREATE
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

        Company company = companyRepository.findById(1).orElseThrow(
                () -> new ResourceNotFoundException("Company was not found.")
        );

        userRepository.save(User.builder()
                .email("rovineshutabarat23@gmail.com")
                .username("rovines")
                .password(passwordEncoder.encode("rovines"))
                .isVerified(true)
                .roles(roles)
                .provider(AccountProvider.LOCAL)
                .canChangePassword(false)
                .company(company)
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

    void initializeCompany() {
        BusinessSector businessSector = businessSectorRepository.findById(1).orElseThrow(
                () -> new ResourceNotFoundException("Business sector was not found.")
        );

        Company company = Company.builder()
                .name("aksdbjsad")
                .email("comany@gmail.com")
                .phoneNumber("085158838022")
                .establishedAt(LocalDate.now())
                .businessSector(businessSector)
                .companyType(CompanyType.PT)
                .address(Address.builder()
                        .street("asdasd")
                        .city("asdsadsa")
                        .province("saasdads")
                        .country("adfsadsda")
                        .postalCode("21322")
                        .build())
                .companyPayrollSetting(CompanyPayrollSetting.builder()
                        .taxId("123456789012345")
                        .isVatRegistered(true)
                        .businessActivityCode("12345")
                        .build())
                .build();

        companyRepository.save(company);
    }

    void initializeDepartments() {
        Company company = companyRepository.findById(1).orElseThrow(
                () -> new ResourceNotFoundException("Company was not found.")
        );

        List<Department> departments = List.of(
                Department.builder()
                        .name("Human Resources")
                        .description("Handles recruitment, employee relations, and HR policies.")
                        .company(company)
                        .build(),
                Department.builder()
                        .name("Finance")
                        .description("Manages financial planning, payroll, and accounting.")
                        .company(company)
                        .build(),
                Department.builder()
                        .name("Engineering")
                        .description("Responsible for product development and system architecture.")
                        .company(company)
                        .build(),
                Department.builder()
                        .name("Operations")
                        .description("Oversees daily operations and process optimization.")
                        .company(company)
                        .build(),
                Department.builder()
                        .name("Marketing")
                        .description("Handles branding, campaigns, and market analysis.")
                        .company(company)
                        .build()
        );

        departmentRepository.saveAll(departments);
    }
}
