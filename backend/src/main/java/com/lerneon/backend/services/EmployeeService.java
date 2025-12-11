package com.lerneon.backend.services;

import com.lerneon.backend.models.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {
    Page<User> findAllEmployees(Pageable pageable);
}
