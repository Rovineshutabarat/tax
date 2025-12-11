package com.lerneon.backend.controllers.implementations;

import com.lerneon.backend.controllers.EmployeeController;
import com.lerneon.backend.handlers.ResponseHandler;
import com.lerneon.backend.models.entity.User;
import com.lerneon.backend.models.payload.response.common.PageResponse;
import com.lerneon.backend.services.EmployeeService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/employee")
@AllArgsConstructor
public class EmployeeControllerImpl implements EmployeeController {
    private final EmployeeService employeeService;

    @GetMapping
    @Override
    public ResponseEntity<PageResponse<User>> findAllEmployees(@PageableDefault Pageable pageable) {
        return ResponseHandler.buildPaginationResponse(
                HttpStatus.OK,
                "",
                employeeService.findAllEmployees(pageable)
        );
    }
}

