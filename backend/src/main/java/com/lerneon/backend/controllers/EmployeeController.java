package com.lerneon.backend.controllers;

import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;


public interface EmployeeController {
    ResponseEntity<PageResponse<User>> findAllEmployees(Pageable pageable);
}
