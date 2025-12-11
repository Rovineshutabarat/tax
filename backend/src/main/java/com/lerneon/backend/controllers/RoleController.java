package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleController {
    ResponseEntity<SuccessResponse<List<Role>>> findAllRoles();
}
