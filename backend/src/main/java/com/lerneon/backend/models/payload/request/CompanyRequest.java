package com.lerneon.backend.models.payload.request;

import com.lerneon.backend.models.annotations.ValidEnum;
import com.lerneon.backend.models.entity.Address;
import com.lerneon.backend.models.enums.CompanyType;
import com.lerneon.backend.models.enums.GrossNetOption;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 100, message = "Company name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Tax ID is required")
    @Pattern(regexp = "^[0-9]{15}$", message = "Tax ID must be exactly 15 digits")
    private String taxId;

    @NotBlank(message = "Business Registration Number is required")
    @Size(max = 50, message = "Business Registration Number cannot exceed 50 characters")
    private String businessRegistrationNumber;

    @NotBlank(message = "Trade License Number is required")
    @Size(max = 50, message = "Trade License Number cannot exceed 50 characters")
    private String tradeLicenseNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{8,20}$", message = "Phone number must contain 8–20 digits and may start with +")
    private String phoneNumber;

    @Valid
    @NotNull(message = "Address is required")
    private Address address;

    @Valid
    @NotNull(message = "Tax Office Address is required")
    private Address taxOfficeAddress;

    @NotBlank(message = "Company Type is required")
    @ValidEnum(enumClass = CompanyType.class, message = "Company Type must be one of: PT, CV, FIRMA")
    private String companyType;

    @NotNull(message = "Business sector ID is required")
    @Positive(message = "Business sector ID must be a positive number")
    private Integer businessSectorId;

    @NotNull(message = "Established date is required")
    @PastOrPresent(message = "Established date cannot be in the future")
    private LocalDate establishedAt;

    private Boolean isVatRegistered;

    @NotBlank(message = "Company Type is required")
    @ValidEnum(enumClass = GrossNetOption.class, message = "Company Type must be one of: GROSS, GROSS_UP, NET")
    private String grossNetOption;
}
