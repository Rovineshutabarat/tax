package com.lerneon.backend.models.entity;

import com.lerneon.backend.models.enums.CompanyType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "companies")
public class Company extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "company_payroll_setting", referencedColumnName = "id", nullable = false)
    private CompanyPayrollSetting companyPayrollSetting;

    @Column(nullable = false, unique = true, length = 15)
    private String taxId;

    @Column(nullable = false, length = 50)
    private String businessRegistrationNumber;

    @Column(nullable = false, length = 50)
    private String tradeLicenseNumber;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
    private Address address;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "tax_office_address_id", referencedColumnName = "id", nullable = false)
    private Address taxOfficeAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CompanyType companyType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "business_sector_id", nullable = false)
    private BusinessSector businessSector;

    private LocalDate establishedAt;

//    Logo or image (need a new image entity)
//    is verified
}
