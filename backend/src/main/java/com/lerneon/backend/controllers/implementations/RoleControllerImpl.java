package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.RoleController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Role;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.RoleService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/role")
@AllArgsConstructor
public class RoleControllerImpl implements RoleController {
    private final RoleService roleService;

    @GetMapping
    @Override
    public ResponseEntity<SuccessResponse<List<Role>>> findAllRoles() {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "",
                roleService.findAllRoles()
        );
    }
}
