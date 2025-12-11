package com.lerneon.backend.models.payload.request;

import com.lerneon.backend.models.annotations.ValidEnum;
import com.lerneon.backend.models.entity.Address;
import com.lerneon.backend.models.enums.CompanyType;
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

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{8,20}$", message = "Phone number must contain 8–20 digits and may start with +")
    private String phoneNumber;

    @NotNull(message = "Established date is required")
    @PastOrPresent(message = "Established date cannot be in the future")
    private LocalDate establishedAt;

    @NotNull(message = "Business sector ID is required")
    @Positive(message = "Business sector ID must be a positive number")
    private Integer businessSectorId;

    @NotBlank(message = "Company Type is required")
    @ValidEnum(enumClass = CompanyType.class, message = "Company Type must be one of: PT, CV, FIRMA")
    private String companyType;

    @Valid
    @NotNull(message = "Address is required")
    private Address address;

    @NotBlank(message = "Tax ID is required")
    @Pattern(regexp = "^[0-9]{15}$", message = "Tax ID must be exactly 15 digits")
    private String taxId;

    @NotNull(message = "VAT registration status is required")
    private Boolean isVatRegistered;

    @NotBlank(message = "KLU code is required")
    @Pattern(
            regexp = "^[0-9]{5,10}$",
            message = "Business activity (KLU) code must be 5–10 digits"
    )
    private String businessActivityCode;
}
