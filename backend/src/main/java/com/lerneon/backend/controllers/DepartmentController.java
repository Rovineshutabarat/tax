package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.payload.request.DepartmentRequest;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface DepartmentController {
    ResponseEntity<PageResponse<Department>> findAllDepartments(Pageable pageable);

    ResponseEntity<SuccessResponse<Department>> findDepartmentById(Integer id);

    ResponseEntity<SuccessResponse<Department>> createDepartment(DepartmentRequest departmentRequest);

    ResponseEntity<SuccessResponse<Department>> updateDepartment(Integer id, DepartmentRequest departmentRequest);

    ResponseEntity<SuccessResponse<Department>> deleteDepartment(Integer id);
}
