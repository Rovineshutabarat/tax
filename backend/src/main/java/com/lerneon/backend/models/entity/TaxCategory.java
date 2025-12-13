package com.lerneon.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lerneon.backend.models.enums.MarriageStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "tax_categories")
public class TaxCategory extends BaseEntity {
    @Column(nullable = false, length = 5)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MarriageStatus marriageStatus;

    @Column(nullable = false)
    private Integer numberOfDependents;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "tax_category_rates",
            joinColumns = @JoinColumn(name = "tax_category_id",
                    referencedColumnName = "id",
                    nullable = false),
            inverseJoinColumns = @JoinColumn(name = "tax_rate_id",
                    referencedColumnName = "id",
                    nullable = false))
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private List<TaxRate> taxRates;
}
