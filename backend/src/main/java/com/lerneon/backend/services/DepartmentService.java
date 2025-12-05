package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Department;
import com.lerneon.backend.models.payload.request.DepartmentRequest;

import java.util.List;

public interface DepartmentService {
    List<Department> findAllDepartments();

    Department findDepartmentById(Integer id);

    Department createDepartment(DepartmentRequest departmentRequest);

    Department updateDepartment(Integer id, DepartmentRequest departmentRequest);

    Department deleteDepartment(Integer id);
}
