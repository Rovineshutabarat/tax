package com.lerneon.backend.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
@Table(name = "addresses")
public class Address extends BaseEntity {

    @NotBlank(message = "Postal code is required")
    @Pattern(regexp = "^[0-9]{4,10}$", message = "Postal code must be 4–10 digits")
    @Column(nullable = false, length = 10)
    private String postalCode;

    @NotBlank(message = "Street address is required")
    @Size(max = 255, message = "Street address cannot exceed 255 characters")
    @Column(nullable = false)
    private String street;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank(message = "Province is required")
    @Size(max = 100, message = "Province name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String province;

    @NotBlank(message = "Country is required")
    @Size(max = 100, message = "Country name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String country = "INDONESIA";
}
