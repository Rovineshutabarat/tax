package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.payload.request.DepartmentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DepartmentService {
    Page<Department> findAllDepartments(Pageable pageable);

    Department findDepartmentById(Integer id);

    Department createDepartment(DepartmentRequest departmentRequest);

    Department updateDepartment(Integer id, DepartmentRequest departmentRequest);

    Department deleteDepartment(Integer id);
}
