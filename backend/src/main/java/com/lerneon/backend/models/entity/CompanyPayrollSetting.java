package com.lerneon.backend.models.entity;

import com.lerneon.backend.models.enums.GrossNetOption;
import jakarta.persistence.*;
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

    @Column(nullable = false)
    private Boolean isVatRegistered;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GrossNetOption grossNetOption;
}
