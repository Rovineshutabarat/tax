package com.lerneon.backend.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "company_payroll_settings")
public class CompanyPayrollSetting extends BaseEntity {
    @Column(nullable = false, unique = true, length = 20)
    private String taxId;

    @Column(nullable = false)
    private Boolean isVatRegistered;

    @Column(nullable = false, length = 10)
    private String businessActivityCode;
}
