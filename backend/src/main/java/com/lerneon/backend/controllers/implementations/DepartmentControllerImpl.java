package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.DepartmentController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.payload.request.DepartmentRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import com.lerneon.backend.services.DepartmentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
@AllArgsConstructor
public class DepartmentControllerImpl implements DepartmentController {
    private final DepartmentService departmentService;

    @GetMapping
    @Override
    public ResponseEntity<SuccessResponse<List<Department>>> findAllDepartments() {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved all departments",
                departmentService.findAllDepartments()
        );
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Department>> findDepartmentById(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Successfully retrieved department",
                departmentService.findDepartmentById(id)
        );
    }

    @PostMapping
    @Override
    public ResponseEntity<SuccessResponse<Department>> createDepartment(
            @RequestBody @Valid DepartmentRequest departmentRequest
    ) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.CREATED,
                "Department has been created successfully",
                departmentService.createDepartment(departmentRequest)
        );
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Department>> updateDepartment(
            @PathVariable Integer id,
            @RequestBody @Valid DepartmentRequest departmentRequest
    ) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Department has been updated successfully",
                departmentService.updateDepartment(id, departmentRequest)
        );
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<SuccessResponse<Department>> deleteDepartment(@PathVariable Integer id) {
        return ResponseHandler.buildSuccessResponse(
                HttpStatus.OK,
                "Department has been deleted successfully",
                departmentService.deleteDepartment(id)
        );
    }
}

