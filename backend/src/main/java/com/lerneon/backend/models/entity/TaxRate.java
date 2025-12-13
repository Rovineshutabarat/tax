package com.lerneon.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tax_rates")
public class TaxRate extends BaseEntity {
    @Column(precision = 19, scale = 2)
    private BigDecimal minAmount;

    @Column(precision = 19, scale = 2)
    private BigDecimal maxAmount;

    @Column(nullable = false)
    private BigDecimal taxRate;

    @ManyToMany(mappedBy = "taxRates")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<TaxCategory> taxCategories;
}
