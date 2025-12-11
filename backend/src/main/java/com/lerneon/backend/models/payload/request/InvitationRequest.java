package com.lerneon.backend.models.payload.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InvitationRequest {
    @NotBlank(message = "Username cannot be blank")
    @Size(min = 5, message = "Username is too short. Please enter at least 5 characters")
    @Size(max = 50, message = "Username is too long. Please enter no more than 50 characters")
    private String username;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Please provide a valid email address")
    @Size(min = 5, message = "Email is too short. Please enter at least 5 characters")
    @Size(max = 100, message = "Email is too long. Please enter no more than 100 characters")
    private String email;

    @NotNull(message = "Roles cannot be null")
    @NotEmpty(message = "At least one role must be provided")
    private List<@Pattern(
            regexp = "^ROLE_[A-Z_]+$",
            message = "Each role must start with 'ROLE_' and contain only uppercase letters"
    ) String> roles;
}
