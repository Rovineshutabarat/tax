package com.lerneon.backend.utils;

import com.lerneon.backend.models.entity.*;
import com.lerneon.backend.models.enums.*;
import com.lerneon.backend.models.exceptions.ResourceNotFoundException;
import com.lerneon.backend.repositories.*;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
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
    private final TaxRateRepository taxRateRepository;
    private final TaxCategoryRepository taxCategoryRepository;

    @Override
    public void run(String... args) {
        initializeRoles();
        initializePermissions();
        assignRolePermissions();
        initializeBusinessSectors();
        initializeCompany();
        initializeDepartments();
        initializeUsers();
        initializeTaxRateAndCategory();
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

    private List<TaxCategory> taxCategoryA() {
        return List.of(
                TaxCategory.builder()
                        .code("A")
                        .marriageStatus(MarriageStatus.SINGLE)
                        .numberOfDependents(0)
                        .build(),
                TaxCategory.builder()
                        .code("A")
                        .marriageStatus(MarriageStatus.SINGLE)
                        .numberOfDependents(1)
                        .build(),
                TaxCategory.builder()
                        .code("A")
                        .marriageStatus(MarriageStatus.MARRIED)
                        .numberOfDependents(0)
                        .build()
        );
    }

    private List<TaxCategory> taxCategoryB() {
        return List.of(
                TaxCategory.builder()
                        .code("B")
                        .marriageStatus(MarriageStatus.SINGLE)
                        .numberOfDependents(2)
                        .build(),
                TaxCategory.builder()
                        .code("B")
                        .marriageStatus(MarriageStatus.SINGLE)
                        .numberOfDependents(3)
                        .build(),
                TaxCategory.builder()
                        .code("B")
                        .marriageStatus(MarriageStatus.MARRIED)
                        .numberOfDependents(1)
                        .build(),
                TaxCategory.builder()
                        .code("B")
                        .marriageStatus(MarriageStatus.MARRIED)
                        .numberOfDependents(2)
                        .build()
        );
    }

    private List<TaxCategory> taxCategoryC() {
        return List.of(
                TaxCategory.builder()
                        .code("C")
                        .marriageStatus(MarriageStatus.MARRIED)
                        .numberOfDependents(3)
                        .build()
        );
    }

    private List<TaxRate> taxRateA() {
        return List.of(
                TaxRate.builder().minAmount(BigDecimal.valueOf(0)).maxAmount(BigDecimal.valueOf(5400000)).taxRate(BigDecimal.valueOf(0)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(5400000)).maxAmount(BigDecimal.valueOf(5650000)).taxRate(BigDecimal.valueOf(0.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(5650000)).maxAmount(BigDecimal.valueOf(5950000)).taxRate(BigDecimal.valueOf(0.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(5950000)).maxAmount(BigDecimal.valueOf(6300000)).taxRate(BigDecimal.valueOf(0.75)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6300000)).maxAmount(BigDecimal.valueOf(6750000)).taxRate(BigDecimal.valueOf(1)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6750000)).maxAmount(BigDecimal.valueOf(7050000)).taxRate(BigDecimal.valueOf(1.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(7050000)).maxAmount(BigDecimal.valueOf(7550000)).taxRate(BigDecimal.valueOf(1.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(7550000)).maxAmount(BigDecimal.valueOf(8650000)).taxRate(BigDecimal.valueOf(1.75)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(8650000)).maxAmount(BigDecimal.valueOf(9050000)).taxRate(BigDecimal.valueOf(2)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(9050000)).maxAmount(BigDecimal.valueOf(10050000)).taxRate(BigDecimal.valueOf(2.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(10050000)).maxAmount(BigDecimal.valueOf(10350000)).taxRate(BigDecimal.valueOf(2.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(10350000)).maxAmount(BigDecimal.valueOf(11050000)).taxRate(BigDecimal.valueOf(3)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(11050000)).maxAmount(BigDecimal.valueOf(11600000)).taxRate(BigDecimal.valueOf(3.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(11600000)).maxAmount(BigDecimal.valueOf(12500000)).taxRate(BigDecimal.valueOf(4)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(12500000)).maxAmount(BigDecimal.valueOf(13750000)).taxRate(BigDecimal.valueOf(5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(13750000)).maxAmount(BigDecimal.valueOf(15100000)).taxRate(BigDecimal.valueOf(6)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(15100000)).maxAmount(BigDecimal.valueOf(16950000)).taxRate(BigDecimal.valueOf(7)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(16950000)).maxAmount(BigDecimal.valueOf(19750000)).taxRate(BigDecimal.valueOf(8)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(19750000)).maxAmount(BigDecimal.valueOf(24150000)).taxRate(BigDecimal.valueOf(9)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(24150000)).maxAmount(BigDecimal.valueOf(26450000)).taxRate(BigDecimal.valueOf(10)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(26450000)).maxAmount(BigDecimal.valueOf(28000000)).taxRate(BigDecimal.valueOf(11)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(28000000)).maxAmount(BigDecimal.valueOf(30050000)).taxRate(BigDecimal.valueOf(12)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(30050000)).maxAmount(BigDecimal.valueOf(32400000)).taxRate(BigDecimal.valueOf(13)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(32400000)).maxAmount(BigDecimal.valueOf(35400000)).taxRate(BigDecimal.valueOf(14)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(35400000)).maxAmount(BigDecimal.valueOf(39100000)).taxRate(BigDecimal.valueOf(15)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(39100000)).maxAmount(BigDecimal.valueOf(43850000)).taxRate(BigDecimal.valueOf(16)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(43850000)).maxAmount(BigDecimal.valueOf(47800000)).taxRate(BigDecimal.valueOf(17)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(47800000)).maxAmount(BigDecimal.valueOf(51400000)).taxRate(BigDecimal.valueOf(18)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(51400000)).maxAmount(BigDecimal.valueOf(56300000)).taxRate(BigDecimal.valueOf(19)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(56300000)).maxAmount(BigDecimal.valueOf(62200000)).taxRate(BigDecimal.valueOf(20)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(62200000)).maxAmount(BigDecimal.valueOf(68600000)).taxRate(BigDecimal.valueOf(21)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(68600000)).maxAmount(BigDecimal.valueOf(77500000)).taxRate(BigDecimal.valueOf(22)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(77500000)).maxAmount(BigDecimal.valueOf(89000000)).taxRate(BigDecimal.valueOf(23)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(89000000)).maxAmount(BigDecimal.valueOf(103000000)).taxRate(BigDecimal.valueOf(24)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(103000000)).maxAmount(BigDecimal.valueOf(125000000)).taxRate(BigDecimal.valueOf(25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(125000000)).maxAmount(BigDecimal.valueOf(157000000)).taxRate(BigDecimal.valueOf(26)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(157000000)).maxAmount(BigDecimal.valueOf(206000000)).taxRate(BigDecimal.valueOf(27)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(206000000)).maxAmount(BigDecimal.valueOf(337000000)).taxRate(BigDecimal.valueOf(28)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(337000000)).maxAmount(BigDecimal.valueOf(454000000)).taxRate(BigDecimal.valueOf(29)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(454000000)).maxAmount(BigDecimal.valueOf(550000000)).taxRate(BigDecimal.valueOf(30)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(550000000)).maxAmount(BigDecimal.valueOf(695000000)).taxRate(BigDecimal.valueOf(31)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(695000000)).maxAmount(BigDecimal.valueOf(910000000)).taxRate(BigDecimal.valueOf(32)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(910000000)).maxAmount(BigDecimal.valueOf(1400000000)).taxRate(BigDecimal.valueOf(33)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(1400000000)).maxAmount(null).taxRate(BigDecimal.valueOf(34)).build()
        );
    }

    private List<TaxRate> taxRateB() {
        return List.of(
                TaxRate.builder().minAmount(BigDecimal.valueOf(0)).maxAmount(BigDecimal.valueOf(6200000)).taxRate(BigDecimal.valueOf(0)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6200000)).maxAmount(BigDecimal.valueOf(6500000)).taxRate(BigDecimal.valueOf(0.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6500000)).maxAmount(BigDecimal.valueOf(6850000)).taxRate(BigDecimal.valueOf(0.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6850000)).maxAmount(BigDecimal.valueOf(7300000)).taxRate(BigDecimal.valueOf(0.75)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(7300000)).maxAmount(BigDecimal.valueOf(9200000)).taxRate(BigDecimal.valueOf(1)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(9200000)).maxAmount(BigDecimal.valueOf(9700000)).taxRate(BigDecimal.valueOf(1.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(9700000)).maxAmount(BigDecimal.valueOf(10750000)).taxRate(BigDecimal.valueOf(2)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(10750000)).maxAmount(BigDecimal.valueOf(11250000)).taxRate(BigDecimal.valueOf(2.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(11250000)).maxAmount(BigDecimal.valueOf(11600000)).taxRate(BigDecimal.valueOf(3)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(11600000)).maxAmount(BigDecimal.valueOf(12200000)).taxRate(BigDecimal.valueOf(3.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(12200000)).maxAmount(BigDecimal.valueOf(13600000)).taxRate(BigDecimal.valueOf(4)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(13600000)).maxAmount(BigDecimal.valueOf(14950000)).taxRate(BigDecimal.valueOf(5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(14950000)).maxAmount(BigDecimal.valueOf(16400000)).taxRate(BigDecimal.valueOf(6)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(16400000)).maxAmount(BigDecimal.valueOf(18400000)).taxRate(BigDecimal.valueOf(7)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(18400000)).maxAmount(BigDecimal.valueOf(21850000)).taxRate(BigDecimal.valueOf(8)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(21850000)).maxAmount(BigDecimal.valueOf(26200000)).taxRate(BigDecimal.valueOf(9)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(26200000)).maxAmount(BigDecimal.valueOf(27950000)).taxRate(BigDecimal.valueOf(10)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(27950000)).maxAmount(BigDecimal.valueOf(29350000)).taxRate(BigDecimal.valueOf(11)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(29350000)).maxAmount(BigDecimal.valueOf(31450000)).taxRate(BigDecimal.valueOf(12)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(31450000)).maxAmount(BigDecimal.valueOf(33950000)).taxRate(BigDecimal.valueOf(13)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(33950000)).maxAmount(BigDecimal.valueOf(37100000)).taxRate(BigDecimal.valueOf(14)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(37100000)).maxAmount(BigDecimal.valueOf(41100000)).taxRate(BigDecimal.valueOf(15)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(41100000)).maxAmount(BigDecimal.valueOf(45800000)).taxRate(BigDecimal.valueOf(16)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(45800000)).maxAmount(BigDecimal.valueOf(49500000)).taxRate(BigDecimal.valueOf(17)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(49500000)).maxAmount(BigDecimal.valueOf(53800000)).taxRate(BigDecimal.valueOf(18)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(53800000)).maxAmount(BigDecimal.valueOf(58500000)).taxRate(BigDecimal.valueOf(19)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(58500000)).maxAmount(BigDecimal.valueOf(64000000)).taxRate(BigDecimal.valueOf(20)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(64000000)).maxAmount(BigDecimal.valueOf(71000000)).taxRate(BigDecimal.valueOf(21)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(71000000)).maxAmount(BigDecimal.valueOf(80000000)).taxRate(BigDecimal.valueOf(22)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(80000000)).maxAmount(BigDecimal.valueOf(93000000)).taxRate(BigDecimal.valueOf(23)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(93000000)).maxAmount(BigDecimal.valueOf(109000000)).taxRate(BigDecimal.valueOf(24)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(109000000)).maxAmount(BigDecimal.valueOf(129000000)).taxRate(BigDecimal.valueOf(25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(129000000)).maxAmount(BigDecimal.valueOf(163000000)).taxRate(BigDecimal.valueOf(26)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(163000000)).maxAmount(BigDecimal.valueOf(374000000)).taxRate(BigDecimal.valueOf(27)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(374000000)).maxAmount(BigDecimal.valueOf(495000000)).taxRate(BigDecimal.valueOf(28)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(495000000)).maxAmount(BigDecimal.valueOf(555000000)).taxRate(BigDecimal.valueOf(29)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(555000000)).maxAmount(BigDecimal.valueOf(704000000)).taxRate(BigDecimal.valueOf(30)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(704000000)).maxAmount(BigDecimal.valueOf(957000000)).taxRate(BigDecimal.valueOf(31)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(957000000)).maxAmount(BigDecimal.valueOf(1405000000)).taxRate(BigDecimal.valueOf(32)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(1405000000)).maxAmount(null).taxRate(BigDecimal.valueOf(34)).build()
        );
    }

    private List<TaxRate> taxRateC() {
        return List.of(
                TaxRate.builder().minAmount(BigDecimal.valueOf(0)).maxAmount(BigDecimal.valueOf(6600000)).taxRate(BigDecimal.valueOf(0)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6600000)).maxAmount(BigDecimal.valueOf(6950000)).taxRate(BigDecimal.valueOf(0.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(6950000)).maxAmount(BigDecimal.valueOf(7350000)).taxRate(BigDecimal.valueOf(0.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(7350000)).maxAmount(BigDecimal.valueOf(7800000)).taxRate(BigDecimal.valueOf(0.75)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(7800000)).maxAmount(BigDecimal.valueOf(8200000)).taxRate(BigDecimal.valueOf(1)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(8200000)).maxAmount(BigDecimal.valueOf(8850000)).taxRate(BigDecimal.valueOf(1.25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(8850000)).maxAmount(BigDecimal.valueOf(9200000)).taxRate(BigDecimal.valueOf(1.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(9200000)).maxAmount(BigDecimal.valueOf(12000000)).taxRate(BigDecimal.valueOf(1.75)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(12000000)).maxAmount(BigDecimal.valueOf(15000000)).taxRate(BigDecimal.valueOf(2)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(15000000)).maxAmount(BigDecimal.valueOf(16500000)).taxRate(BigDecimal.valueOf(2.5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(16500000)).maxAmount(BigDecimal.valueOf(18900000)).taxRate(BigDecimal.valueOf(3)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(18900000)).maxAmount(BigDecimal.valueOf(20600000)).taxRate(BigDecimal.valueOf(4)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(20600000)).maxAmount(BigDecimal.valueOf(22350000)).taxRate(BigDecimal.valueOf(5)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(22350000)).maxAmount(BigDecimal.valueOf(24500000)).taxRate(BigDecimal.valueOf(6)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(24500000)).maxAmount(BigDecimal.valueOf(25850000)).taxRate(BigDecimal.valueOf(7)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(25850000)).maxAmount(BigDecimal.valueOf(27000000)).taxRate(BigDecimal.valueOf(8)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(27000000)).maxAmount(BigDecimal.valueOf(28200000)).taxRate(BigDecimal.valueOf(9)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(28200000)).maxAmount(BigDecimal.valueOf(30250000)).taxRate(BigDecimal.valueOf(10)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(30250000)).maxAmount(BigDecimal.valueOf(31800000)).taxRate(BigDecimal.valueOf(11)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(31800000)).maxAmount(BigDecimal.valueOf(32600000)).taxRate(BigDecimal.valueOf(12)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(32600000)).maxAmount(BigDecimal.valueOf(34500000)).taxRate(BigDecimal.valueOf(13)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(34500000)).maxAmount(BigDecimal.valueOf(38900000)).taxRate(BigDecimal.valueOf(14)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(38900000)).maxAmount(BigDecimal.valueOf(43000000)).taxRate(BigDecimal.valueOf(15)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(43000000)).maxAmount(BigDecimal.valueOf(47400000)).taxRate(BigDecimal.valueOf(16)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(47400000)).maxAmount(BigDecimal.valueOf(49200000)).taxRate(BigDecimal.valueOf(17)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(49200000)).maxAmount(BigDecimal.valueOf(55200000)).taxRate(BigDecimal.valueOf(18)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(55200000)).maxAmount(BigDecimal.valueOf(58500000)).taxRate(BigDecimal.valueOf(19)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(58500000)).maxAmount(BigDecimal.valueOf(64000000)).taxRate(BigDecimal.valueOf(20)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(64000000)).maxAmount(BigDecimal.valueOf(71000000)).taxRate(BigDecimal.valueOf(21)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(71000000)).maxAmount(BigDecimal.valueOf(76500000)).taxRate(BigDecimal.valueOf(22)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(76500000)).maxAmount(BigDecimal.valueOf(83000000)).taxRate(BigDecimal.valueOf(23)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(83000000)).maxAmount(BigDecimal.valueOf(93000000)).taxRate(BigDecimal.valueOf(24)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(93000000)).maxAmount(BigDecimal.valueOf(109000000)).taxRate(BigDecimal.valueOf(25)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(109000000)).maxAmount(BigDecimal.valueOf(129000000)).taxRate(BigDecimal.valueOf(26)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(129000000)).maxAmount(BigDecimal.valueOf(163000000)).taxRate(BigDecimal.valueOf(27)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(163000000)).maxAmount(BigDecimal.valueOf(221000000)).taxRate(BigDecimal.valueOf(28)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(221000000)).maxAmount(BigDecimal.valueOf(374000000)).taxRate(BigDecimal.valueOf(29)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(374000000)).maxAmount(BigDecimal.valueOf(459000000)).taxRate(BigDecimal.valueOf(30)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(459000000)).maxAmount(BigDecimal.valueOf(555000000)).taxRate(BigDecimal.valueOf(31)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(555000000)).maxAmount(BigDecimal.valueOf(704000000)).taxRate(BigDecimal.valueOf(32)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(704000000)).maxAmount(BigDecimal.valueOf(965000000)).taxRate(BigDecimal.valueOf(33)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(965000000)).maxAmount(BigDecimal.valueOf(1419000000)).taxRate(BigDecimal.valueOf(33)).build(),
                TaxRate.builder().minAmount(BigDecimal.valueOf(1419000000)).maxAmount(null).taxRate(BigDecimal.valueOf(34)).build()
        );
    }

    void initializeTaxRateAndCategory() {

        List<TaxCategory> taxCategoryA = taxCategoryA();
        List<TaxCategory> taxCategoryB = taxCategoryB();
        List<TaxCategory> taxCategoryC = taxCategoryC();

        List<TaxRate> taxRateA = taxRateA();
        List<TaxRate> taxRateB = taxRateB();
        List<TaxRate> taxRateC = taxRateC();

        taxCategoryA.forEach(c -> c.setTaxRates(taxRateA));
        taxCategoryB.forEach(c -> c.setTaxRates(taxRateB));
        taxCategoryC.forEach(c -> c.setTaxRates(taxRateC));

        taxCategoryRepository.saveAll(taxCategoryA);
        taxCategoryRepository.saveAll(taxCategoryB);
        taxCategoryRepository.saveAll(taxCategoryC);
    }

}
