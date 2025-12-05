package com.lerneon.backend.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "business_sectors")
public class BusinessSector extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Lob
    private String description;
}
