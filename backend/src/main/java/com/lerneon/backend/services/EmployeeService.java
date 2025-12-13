package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.Employee;
import com.lerneon.backend.models.payload.request.EmployeeRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {
    Page<Employee> findAllEmployees(Pageable pageable);

    Employee addEmployee(EmployeeRequest employeeRequest);
}
