package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.payload.request.DepartmentRequest;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DepartmentController {
    ResponseEntity<SuccessResponse<List<Department>>> findAllDepartments();

    ResponseEntity<SuccessResponse<Department>> findDepartmentById(Integer id);

    ResponseEntity<SuccessResponse<Department>> createDepartment(DepartmentRequest departmentRequest);

    ResponseEntity<SuccessResponse<Department>> updateDepartment(Integer id, DepartmentRequest departmentRequest);

    ResponseEntity<SuccessResponse<Department>> deleteDepartment(Integer id);
}
