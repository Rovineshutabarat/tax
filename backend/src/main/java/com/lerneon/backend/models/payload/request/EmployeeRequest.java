package com.lerneon.backend.models.payload.request;

import com.lerneon.backend.models.annotations.ValidEnum;
import com.lerneon.backend.models.enums.EmployeeStatus;
import com.lerneon.backend.models.enums.Gender;
import com.lerneon.backend.models.enums.MarriageStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {

    @NotBlank(message = "Name is required.")
    @Size(max = 50, message = "Name must not exceed 50 characters.")
    private String name;

    @NotBlank(message = "Email is required.")
    @Email(message = "Email format is invalid.")
    @Size(max = 100, message = "Email must not exceed 100 characters.")
    private String email;

    @NotBlank(message = "Phone number is required.")
    @Size(max = 20, message = "Phone number must not exceed 20 characters.")
    private String phoneNumber;

    @NotBlank(message = "Tax ID is required.")
    @Size(max = 20, message = "Tax ID must not exceed 20 characters.")
    private String taxId;

    @NotBlank(message = "Employee Status is required")
    @ValidEnum(enumClass = EmployeeStatus.class, message = "Employee Status must be one of: ACTIVE, RESIGNED")
    private String employeeStatus;

    @NotNull(message = "Base salary is required.")
    @Digits(integer = 17, fraction = 2, message = "Base salary format is invalid.")
    @DecimalMin(value = "0.0", inclusive = false, message = "Base salary must be greater than 0.")
    private BigDecimal baseSalary;

    @NotBlank(message = "Marriage Status is required")
    @ValidEnum(enumClass = MarriageStatus.class, message = "Marriage Status must be one of: MARRIED, SINGLE, DIVORCED")
    private String marriageStatus;

    @Min(value = 0, message = "Number of dependents must be 0 or greater.")
    private Integer numberOfDependents;

    @NotNull(message = "Established date is required")
    @PastOrPresent(message = "Established date cannot be in the future")
    private LocalDate birthDate;

    @NotBlank(message = "Gender is required")
    @ValidEnum(enumClass = Gender.class, message = "Gender must be one of: MAN, WOMAN, UNKNOWN")
    private String gender;

    @NotEmpty(message = "Role IDs must not be empty.")
    private List<Integer> roleIds;

    @NotNull(message = "Department ID is required.")
    private Integer departmentId;
}
