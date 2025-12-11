package com.lerneon.backend.models.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SetPasswordRequest {
    @NotBlank(message = "Password cannot be blank")
    @Size(min = 6, message = "Password is too short. Please enter at least 6 characters")
    @Size(max = 100, message = "Password is too long. Please enter no more than 100 characters")
    private String password;
}
