package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.Employee;
import com.lerneon.backend.models.payload.request.EmployeeRequest;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import com.lerneon.backend.models.payload.response.common.SuccessResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface EmployeeController {
    ResponseEntity<PageResponse<Employee>> findAllEmployees(Pageable pageable);

    ResponseEntity<SuccessResponse<Employee>> addEmployee(EmployeeRequest employeeRequest);

}
